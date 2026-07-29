import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useAppState } from "./AppState";
import { getFavorites, addFavorite as addFavoriteToSupabase, removeFavorite as removeFavoriteFromSupabase } from "@/lib/supabase-service";

const FAVORITES_KEY = "urdu-alive-favorites";

export interface FavoriteItem {
  id: string;
  urduScript: string;
  romanUrdu: string;
  meaning: string;
  source: "learn40" | "revive" | "treasury" | "idioms";
  category?: string;
  dayNumber?: number;
  exampleSentence?: string;
  savedAt: number;
}

function loadFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveFavorites(items: FavoriteItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, "savedAt">) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAppState();
  const [favorites, setFavorites] = useState<FavoriteItem[]>(loadFavorites);
  const loadedFromSupabase = useRef(false);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    if (!user) {
      loadedFromSupabase.current = false;
      return;
    }
    if (loadedFromSupabase.current) return;
    loadedFromSupabase.current = true;

    getFavorites(user.id).then((rows) => {
      if (rows.length > 0) {
        const items: FavoriteItem[] = rows.map((r) => r.word_data as unknown as FavoriteItem);
        setFavorites(items);
        saveFavorites(items);
      }
    }).catch(console.error);
  }, [user]);

  const addFavorite: (item: Omit<FavoriteItem, "savedAt">) => void = useCallback(
    (item) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.id === item.id)) return prev;
        const newItem = { ...item, savedAt: Date.now() };
        if (user) {
          addFavoriteToSupabase(user.id, item).catch(console.error);
        }
        return [newItem, ...prev];
      });
    },
    [user],
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const filtered = prev.filter((f) => f.id !== id);
        if (user) {
          removeFavoriteFromSupabase(user.id, id).catch(console.error);
        }
        return filtered;
      });
    },
    [user],
  );

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite: (id: string) => favorites.some((f) => f.id === id),
    }),
    [favorites, addFavorite, removeFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
