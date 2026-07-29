import { batchImportProgress } from "./supabase-service";
import type { UserProgress } from "./supabase-types";
import type { FavoriteItem } from "@/context/FavoritesContext";
import type { DifficultWord } from "@/context/DifficultWordsContext";

const PROGRESS_KEY = "urdu-alive-state";
const USERS_KEY = "urdu-alive-users";
const AUTH_KEY = "urdu-alive-auth";
const FAVORITES_KEY = "urdu-alive-favorites";
const DIFFICULT_KEY = "urdu-alive-difficult-words";

interface LegacyProgress {
  xp?: number;
  streak?: number;
  currentDay?: number;
  activeTrack?: "revive" | "learn40" | null;
  completedDays?: number[];
  totalWordsLearned?: number;
}

function get<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function hasLegacyData(): boolean {
  return (
    !!localStorage.getItem(PROGRESS_KEY) ||
    !!localStorage.getItem(FAVORITES_KEY) ||
    !!localStorage.getItem(DIFFICULT_KEY) ||
    !!localStorage.getItem(USERS_KEY)
  );
}

export function getLegacyEmail(): string | null {
  const auth = get<{ email: string }>(AUTH_KEY);
  return auth?.email ?? null;
}

export async function migrateLocalStorageToSupabase(userId: string): Promise<boolean> {
  try {
    const legacyProgress = get<LegacyProgress>(PROGRESS_KEY);
    const legacyFavorites = get<FavoriteItem[]>(FAVORITES_KEY);
    const legacyDifficult = get<DifficultWord[]>(DIFFICULT_KEY);

    const progress: Partial<UserProgress> = {};

    if (legacyProgress) {
      if (legacyProgress.xp !== undefined) progress.xp = legacyProgress.xp;
      if (legacyProgress.streak !== undefined) progress.streak = legacyProgress.streak;
      if (legacyProgress.currentDay !== undefined) progress.current_day = legacyProgress.currentDay;
      if (legacyProgress.activeTrack !== undefined) progress.active_track = legacyProgress.activeTrack;
      if (legacyProgress.completedDays !== undefined) progress.completed_days = legacyProgress.completedDays;
      if (legacyProgress.totalWordsLearned !== undefined) progress.total_words_learned = legacyProgress.totalWordsLearned;
    }

    await batchImportProgress(userId, {
      progress: Object.keys(progress).length > 0 ? progress : undefined,
      favorites: legacyFavorites ?? undefined,
      difficultWords: legacyDifficult ?? undefined,
    });

    clearLegacyAuthData();
    return true;
  } catch (error) {
    console.error("Migration failed:", error);
    return false;
  }
}

export function clearLegacyAuthData(): void {
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(AUTH_KEY);
  localStorage.setItem("urdu-alive-migrated", "true");
}
