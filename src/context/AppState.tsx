import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type Track = "revive" | "learn40" | null;
type Theme = "light" | "dark";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
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
  signUp: (name: string, email: string, password: string) => boolean;
  logIn: (email: string, password: string) => boolean;
  logOut: () => void;
}

const STORAGE_KEY = "urdu-alive-state";
const USERS_KEY = "urdu-alive-users";
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
  theme: Theme;
}) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadUsers(): Record<string, { name: string; email: string; password: string }> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, { name: string; email: string; password: string }>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadAuthUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveAuthUser(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [saved] = useState(() => loadState());
  const [uuid] = useState(() => generateUUID());
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("urdu-alive-theme") as Theme | null;
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });
  const [xp, setXP] = useState(() => saved.xp ?? 0);
  const [streak, setStreak] = useState(() => saved.streak ?? 0);
  const [currentDay, setCurrentDay] = useState(() => saved.currentDay ?? 1);
  const [activeTrack, setActiveTrack] = useState<Track>(() => saved.activeTrack ?? null);
  const [completedDays, setCompletedDays] = useState<number[]>(() => saved.completedDays ?? []);
  const [totalWordsLearned, setTotalWordsLearned] = useState(() => saved.totalWordsLearned ?? 0);
  const [user, setUser] = useState<User | null>(() => loadAuthUser());

  const isTrackLocked = activeTrack !== null;

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("urdu-alive-theme", next);
      return next;
    });
  }, []);

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

  const signUp = useCallback((name: string, email: string, password: string) => {
    const users = loadUsers();
    const emailKey = email.toLowerCase().trim();
    if (users[emailKey]) return false;
    users[emailKey] = { name, email: emailKey, password };
    saveUsers(users);
    const newUser: User = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      name,
      email: emailKey,
    };
    setUser(newUser);
    saveAuthUser(newUser);
    return true;
  }, []);

  const logIn = useCallback((email: string, password: string) => {
    const users = loadUsers();
    const emailKey = email.toLowerCase().trim();
    const found = users[emailKey];
    if (!found || found.password !== password) return false;
    const loggedIn: User = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      name: found.name,
      email: emailKey,
    };
    setUser(loggedIn);
    saveAuthUser(loggedIn);
    return true;
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    saveAuthUser(null);
  }, []);

  // Persist state
  useEffect(() => {
    saveState({
      xp,
      streak,
      currentDay,
      activeTrack,
      completedDays,
      totalWordsLearned,
      theme,
    });
  }, [xp, streak, currentDay, activeTrack, completedDays, totalWordsLearned, theme]);

  // Apply theme class to html
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AppStateContext.Provider
      value={{
        theme,
        toggleTheme,
        uuid,
        xp,
        addXP,
        streak,
        incrementStreak,
        currentDay,
        setCurrentDay,
        activeTrack,
        setActiveTrack,
        completedDays,
        markDayComplete,
        isTrackLocked,
        totalWordsLearned,
        addWordsLearned,
        user,
        signUp,
        logIn,
        logOut,
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
