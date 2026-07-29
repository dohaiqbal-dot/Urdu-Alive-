import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { getProfile, getProgress, upsertProgress } from "@/lib/supabase-service";
import { hasLegacyData, migrateLocalStorageToSupabase } from "@/lib/migrate-local-storage";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type Track = "revive" | "learn40" | null;

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  uuid: string;
  xp: number;
  addXP: (amount: number) => void;
  streak: number;
  incrementStreak: () => void;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  activeTrack: Track;
  setActiveTrack: (track: Track) => void;
  completedDays: number[];
  markDayComplete: (day: number) => void;
  isTrackLocked: boolean;
  totalWordsLearned: number;
  addWordsLearned: (count: number) => void;
  user: User | null;
  sessionLoading: boolean;
  emailConfirmationRequired: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const STORAGE_KEY = "urdu-alive-state";
const AUTH_KEY = "urdu-alive-auth";

function generateUUID(): string {
  const existing = typeof window !== "undefined" ? localStorage.getItem("urdu-alive-uuid") : null;
  if (existing) return existing;
  const uuid = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  if (typeof window !== "undefined") localStorage.setItem("urdu-alive-uuid", uuid);
  return uuid;
}

function loadState(): Partial<AppState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveState(state: {
  xp: number;
  streak: number;
  currentDay: number;
  activeTrack: Track;
  completedDays: number[];
  totalWordsLearned: number;
}) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function supabaseUserToUser(su: SupabaseUser, name: string): User {
  return { id: su.id, name, email: su.email ?? "" };
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [saved] = useState(() => loadState());
  const [uuid] = useState(() => generateUUID());
  const [xp, setXP] = useState(() => saved.xp ?? 0);
  const [streak, setStreak] = useState(() => saved.streak ?? 0);
  const [currentDay, setCurrentDay] = useState(() => saved.currentDay ?? 1);
  const [activeTrack, setActiveTrack] = useState<Track>(() => saved.activeTrack ?? null);
  const [completedDays, setCompletedDays] = useState<number[]>(() => saved.completedDays ?? []);
  const [totalWordsLearned, setTotalWordsLearned] = useState(() => saved.totalWordsLearned ?? 0);
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);
  const initRef = useRef(false);
  const migratedRef = useRef(false);

  const isTrackLocked = activeTrack !== null;

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await getProfile(session.user.id);
        if (profile) {
          setUser(supabaseUserToUser(session.user, profile.name));
          const progress = await getProgress(session.user.id);
          if (progress) {
            setXP(progress.xp);
            setStreak(progress.streak);
            setCurrentDay(progress.current_day);
            setActiveTrack(progress.active_track as Track);
            setCompletedDays(progress.completed_days ?? []);
            setTotalWordsLearned(progress.total_words_learned);
          }
          if (!migratedRef.current && hasLegacyData()) {
            migratedRef.current = true;
            await migrateLocalStorageToSupabase(session.user.id);
          }
        }
      }
      initRef.current = true;
      setSessionLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const profile = await getProfile(session.user.id);
          if (profile) {
            setUser(supabaseUserToUser(session.user, profile.name));
            const progress = await getProgress(session.user.id);
            if (progress) {
              setXP(progress.xp);
              setStreak(progress.streak);
              setCurrentDay(progress.current_day);
              setActiveTrack(progress.active_track as Track);
              setCompletedDays(progress.completed_days ?? []);
              setTotalWordsLearned(progress.total_words_learned);
            }
            if (!migratedRef.current && hasLegacyData()) {
              migratedRef.current = true;
              await migrateLocalStorageToSupabase(session.user.id);
            }
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          const cached = loadState();
          setXP(cached.xp ?? 0);
          setStreak(cached.streak ?? 0);
          setCurrentDay(cached.currentDay ?? 1);
          setActiveTrack(cached.activeTrack ?? null);
          setCompletedDays(cached.completedDays ?? []);
          setTotalWordsLearned(cached.totalWordsLearned ?? 0);
        }
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!initRef.current || !user) return;
    const p = {
      xp,
      streak,
      current_day: currentDay,
      active_track: activeTrack,
      completed_days: completedDays,
      total_words_learned: totalWordsLearned,
    };
    upsertProgress(user.id, p).catch(console.error);
    saveState({ xp, streak, currentDay, activeTrack, completedDays, totalWordsLearned });
  }, [xp, streak, currentDay, activeTrack, completedDays, totalWordsLearned, user]);

  const addXP = useCallback((amount: number) => {
    setXP((prev) => prev + amount);
  }, []);

  const incrementStreak = useCallback(() => {
    setStreak((prev) => prev + 1);
  }, []);

  const markDayComplete = useCallback((day: number) => {
    setCompletedDays((prev) => {
      if (prev.includes(day)) return prev;
      return [...prev, day];
    });
  }, []);

  const addWordsLearned = useCallback((count: number) => {
    setTotalWordsLearned((prev) => prev + count);
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    setEmailConfirmationRequired(false);
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: { data: { full_name: name.trim() } },
    });
    if (error) {
      if (error.message.includes("already registered")) {
        return { success: false, error: "An account with this email already exists." };
      }
      return { success: false, error: error.message };
    }
    if (data?.user?.identities?.length === 0) {
      return { success: false, error: "An account with this email already exists." };
    }
    if (!data?.user?.email_confirmed_at) {
      setEmailConfirmationRequired(true);
    }
    return { success: true };
  }, []);

  const logIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });
    if (error) {
      if (error.message.includes("Email not confirmed")) {
        return { success: false, error: "Please verify your email before logging in." };
      }
      if (error.message.includes("Invalid login credentials")) {
        return { success: false, error: "Invalid email or password." };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  }, []);

  const logOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    const cached = loadState();
    setXP(cached.xp ?? 0);
    setStreak(cached.streak ?? 0);
    setCurrentDay(cached.currentDay ?? 1);
    setActiveTrack(cached.activeTrack ?? null);
    setCompletedDays(cached.completedDays ?? []);
    setTotalWordsLearned(cached.totalWordsLearned ?? 0);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : undefined,
      },
    });
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.toLowerCase().trim(),
      {
        redirectTo: typeof window !== "undefined"
          ? `${window.location.origin}/auth/reset-password`
          : undefined,
      },
    );
    if (error) return { success: false, error: error.message };
    return { success: true };
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        uuid, xp, addXP, streak, incrementStreak,
        currentDay, setCurrentDay, activeTrack, setActiveTrack,
        completedDays, markDayComplete, isTrackLocked,
        totalWordsLearned, addWordsLearned,
        user, sessionLoading, emailConfirmationRequired,
        signUp, logIn, logOut, signInWithGoogle, resetPassword,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
