-- ============================================================
-- Urdu Alive — Supabase Initial Schema
-- ============================================================

-- 1. PROFILES (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  auth_provider TEXT NOT NULL DEFAULT 'email',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. USER PROGRESS
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  current_day INTEGER NOT NULL DEFAULT 1,
  active_track TEXT,
  completed_days INTEGER[] NOT NULL DEFAULT '{}',
  total_words_learned INTEGER NOT NULL DEFAULT 0,
  theme_preference TEXT NOT NULL DEFAULT 'system',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. FAVORITE WORDS
CREATE TABLE IF NOT EXISTS favorite_words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  word_data JSONB NOT NULL,
  source TEXT NOT NULL,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_favorite_words_user_id ON favorite_words(user_id);

-- 4. DIFFICULT WORDS
CREATE TABLE IF NOT EXISTS difficult_words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  word_data JSONB NOT NULL,
  source TEXT NOT NULL,
  wrong_count INTEGER NOT NULL DEFAULT 0,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_difficult_words_user_id ON difficult_words(user_id);

-- 5. DAILY LOG
CREATE TABLE IF NOT EXISTS daily_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  missions_completed INTEGER NOT NULL DEFAULT 0,
  words_learned INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_daily_log_user_date ON daily_log(user_id, date);

-- 6. DAILY MISSIONS
CREATE TABLE IF NOT EXISTS daily_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  date DATE NOT NULL,
  state JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE difficult_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_missions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies safely (idempotent)
DO $$ BEGIN
  DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
  DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
  DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
  DROP POLICY IF EXISTS "user_progress_select_own" ON user_progress;
  DROP POLICY IF EXISTS "user_progress_insert_own" ON user_progress;
  DROP POLICY IF EXISTS "user_progress_update_own" ON user_progress;
  DROP POLICY IF EXISTS "favorite_words_select_own" ON favorite_words;
  DROP POLICY IF EXISTS "favorite_words_insert_own" ON favorite_words;
  DROP POLICY IF EXISTS "favorite_words_delete_own" ON favorite_words;
  DROP POLICY IF EXISTS "difficult_words_select_own" ON difficult_words;
  DROP POLICY IF EXISTS "difficult_words_insert_own" ON difficult_words;
  DROP POLICY IF EXISTS "difficult_words_update_own" ON difficult_words;
  DROP POLICY IF EXISTS "difficult_words_delete_own" ON difficult_words;
  DROP POLICY IF EXISTS "daily_log_select_own" ON daily_log;
  DROP POLICY IF EXISTS "daily_log_insert_own" ON daily_log;
  DROP POLICY IF EXISTS "daily_log_update_own" ON daily_log;
  DROP POLICY IF EXISTS "daily_missions_select_own" ON daily_missions;
  DROP POLICY IF EXISTS "daily_missions_insert_own" ON daily_missions;
  DROP POLICY IF EXISTS "daily_missions_update_own" ON daily_missions;
END $$;

-- Profiles: users can read/update their own profile
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- User progress: users can CRUD their own progress
CREATE POLICY "user_progress_select_own" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_progress_insert_own" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_progress_update_own" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Favorite words: users can CRUD their own favorites
CREATE POLICY "favorite_words_select_own" ON favorite_words
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "favorite_words_insert_own" ON favorite_words
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "favorite_words_delete_own" ON favorite_words
  FOR DELETE USING (auth.uid() = user_id);

-- Difficult words: users can CRUD their own
CREATE POLICY "difficult_words_select_own" ON difficult_words
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "difficult_words_insert_own" ON difficult_words
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "difficult_words_update_own" ON difficult_words
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "difficult_words_delete_own" ON difficult_words
  FOR DELETE USING (auth.uid() = user_id);

-- Daily log: users can CRUD their own
CREATE POLICY "daily_log_select_own" ON daily_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "daily_log_insert_own" ON daily_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "daily_log_update_own" ON daily_log
  FOR UPDATE USING (auth.uid() = user_id);

-- Daily missions: users can CRUD their own
CREATE POLICY "daily_missions_select_own" ON daily_missions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "daily_missions_insert_own" ON daily_missions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "daily_missions_update_own" ON daily_missions
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: Auto-create profile + progress on user signup
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO profiles (id, name, email, avatar_url, auth_provider)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', 'User'),
    COALESCE(NEW.email, ''),
    NEW.raw_user_meta_data ->> 'avatar_url',
    COALESCE(NEW.raw_user_meta_data ->> 'provider', 'email')
  );

  INSERT INTO user_progress (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
