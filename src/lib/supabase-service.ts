import { supabase } from "./supabase";
import type { Profile, UserProgress, FavoriteWordRow, DifficultWordRow, DailyLogRow, DailyMissionRow } from "./supabase-types";
import type { FavoriteItem } from "@/context/FavoritesContext";
import type { DifficultWord } from "@/context/DifficultWordsContext";

// ─── Profiles ───

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data as Profile | null;
}

// ─── User Progress ───

export async function getProgress(userId: string): Promise<UserProgress | null> {
  const { data } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data as UserProgress | null;
}

export async function upsertProgress(
  userId: string,
  progress: Partial<UserProgress>,
): Promise<void> {
  await supabase.from("user_progress").upsert(
    { user_id: userId, ...progress, updated_at: new Date().toISOString() } as never,
    { onConflict: "user_id" },
  );
}

// ─── Favorites ───

export async function getFavorites(userId: string): Promise<FavoriteWordRow[]> {
  const { data } = await supabase
    .from("favorite_words")
    .select("*")
    .eq("user_id", userId)
    .order("saved_at", { ascending: false });
  return (data ?? []) as FavoriteWordRow[];
}

export async function addFavorite(
  userId: string,
  item: Omit<FavoriteItem, "savedAt">,
): Promise<void> {
  await supabase.from("favorite_words").insert({
    user_id: userId,
    word_data: item as unknown as never,
    source: item.source,
  } as never);
}

export async function removeFavorite(userId: string, wordId: string): Promise<void> {
  await supabase
    .from("favorite_words")
    .delete()
    .eq("user_id", userId)
    .filter("word_data->>id", "eq", wordId);
}

export async function clearFavorites(userId: string): Promise<void> {
  await supabase.from("favorite_words").delete().eq("user_id", userId);
}

// ─── Difficult Words ───

export async function getDifficultWords(userId: string): Promise<DifficultWordRow[]> {
  const { data } = await supabase
    .from("difficult_words")
    .select("*")
    .eq("user_id", userId)
    .order("saved_at", { ascending: false });
  return (data ?? []) as DifficultWordRow[];
}

export async function addDifficultWord(
  userId: string,
  item: Omit<DifficultWord, "savedAt" | "wrongCount">,
): Promise<void> {
  await supabase.from("difficult_words").insert({
    user_id: userId,
    word_data: item as unknown as never,
    source: item.source,
    wrong_count: 0,
  } as never);
}

export async function removeDifficultWord(userId: string, wordId: string): Promise<void> {
  await supabase
    .from("difficult_words")
    .delete()
    .eq("user_id", userId)
    .filter("word_data->>id", "eq", wordId);
}

export async function incrementDifficultWordCount(userId: string, wordId: string): Promise<void> {
  const { data } = await supabase
    .from("difficult_words")
    .select("wrong_count")
    .eq("user_id", userId)
    .filter("word_data->>id", "eq", wordId)
    .single();

  if (data) {
    const row = data as { wrong_count: number };
    await supabase
      .from("difficult_words")
      .update({ wrong_count: (row.wrong_count ?? 0) + 1 } as never)
      .eq("user_id", userId)
      .filter("word_data->>id", "eq", wordId);
  }
}

export async function clearDifficultWords(userId: string): Promise<void> {
  await supabase.from("difficult_words").delete().eq("user_id", userId);
}

// ─── Daily Log ───

export async function getDailyLog(userId: string): Promise<DailyLogRow[]> {
  const { data } = await supabase
    .from("daily_log")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });
  return (data ?? []) as DailyLogRow[];
}

export async function upsertDailyLog(
  userId: string,
  date: string,
  entry: { xp?: number; missions_completed?: number; words_learned?: number },
): Promise<void> {
  await supabase.from("daily_log").upsert(
    { user_id: userId, date, ...entry } as never,
    { onConflict: "user_id,date" },
  );
}

// ─── Daily Missions ───

export async function getDailyMissions(userId: string): Promise<DailyMissionRow | null> {
  const { data } = await supabase
    .from("daily_missions")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data as DailyMissionRow | null;
}

export async function upsertDailyMissions(
  userId: string,
  date: string,
  state: Record<string, unknown>,
): Promise<void> {
  await supabase.from("daily_missions").upsert(
    { user_id: userId, date, state, updated_at: new Date().toISOString() } as never,
    { onConflict: "user_id" },
  );
}

// ─── Batch Save (for migration) ───

export async function batchImportProgress(
  userId: string,
  data: {
    progress?: Partial<UserProgress>;
    favorites?: FavoriteItem[];
    difficultWords?: DifficultWord[];
  },
): Promise<void> {
  if (data.progress) {
    await upsertProgress(userId, data.progress);
  }

  if (data.favorites && data.favorites.length > 0) {
    const inserts = data.favorites.map((f) => ({
      user_id: userId,
      word_data: f as unknown as never,
      source: f.source,
    }));
    await supabase.from("favorite_words").insert(inserts as never);
  }

  if (data.difficultWords && data.difficultWords.length > 0) {
    const inserts = data.difficultWords.map((d) => ({
      user_id: userId,
      word_data: d as unknown as never,
      source: d.source,
      wrong_count: d.wrongCount,
    }));
    await supabase.from("difficult_words").insert(inserts as never);
  }
}
