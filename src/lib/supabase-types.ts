export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id">>;
      };
      user_progress: {
        Row: UserProgress;
        Insert: Omit<UserProgress, "id">;
        Update: Partial<Omit<UserProgress, "id" | "user_id">>;
      };
      favorite_words: {
        Row: FavoriteWordRow;
        Insert: Omit<FavoriteWordRow, "id" | "saved_at">;
        Update: Partial<Omit<FavoriteWordRow, "id" | "user_id">>;
      };
      difficult_words: {
        Row: DifficultWordRow;
        Insert: Omit<DifficultWordRow, "id" | "saved_at">;
        Update: Partial<Omit<DifficultWordRow, "id" | "user_id">>;
      };
      daily_log: {
        Row: DailyLogRow;
        Insert: Omit<DailyLogRow, "id">;
        Update: Partial<Omit<DailyLogRow, "id" | "user_id">>;
      };
      daily_missions: {
        Row: DailyMissionRow;
        Insert: Omit<DailyMissionRow, "id" | "updated_at">;
        Update: Partial<Omit<DailyMissionRow, "id" | "user_id">>;
      };
    };
  };
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  auth_provider: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  xp: number;
  streak: number;
  longest_streak: number;
  current_day: number;
  active_track: "revive" | "learn40" | null;
  completed_days: number[];
  total_words_learned: number;
  theme_preference: string;
  updated_at: string;
}

export interface FavoriteWordRow {
  id: string;
  user_id: string;
  word_data: Record<string, unknown>;
  source: string;
  saved_at: string;
}

export interface DifficultWordRow {
  id: string;
  user_id: string;
  word_data: Record<string, unknown>;
  source: string;
  wrong_count: number;
  saved_at: string;
}

export interface DailyLogRow {
  id: string;
  user_id: string;
  date: string;
  xp: number;
  missions_completed: number;
  words_learned: number;
}

export interface DailyMissionRow {
  id: string;
  user_id: string;
  date: string;
  state: Record<string, unknown>;
  updated_at: string;
}
