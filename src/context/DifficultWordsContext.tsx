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
import {
  getDifficultWords,
  addDifficultWord as addDifficultToSupabase,
  removeDifficultWord as removeDifficultFromSupabase,
  incrementDifficultWordCount as incrementDifficultCount,
} from "@/lib/supabase-service";

const DIFFICULT_KEY = "urdu-alive-difficult-words";

export interface DifficultWord {
  id: string;
  urduScript: string;
  romanUrdu: string;
  meaning: string;
  source: "learn40" | "revive" | "treasury" | "idioms";
  category?: string;
  dayNumber?: number;
  exampleSentence?: string;
  savedAt: number;
  wrongCount: number;
}

function loadDifficult(): DifficultWord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DIFFICULT_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveDifficult(items: DifficultWord[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DIFFICULT_KEY, JSON.stringify(items));
}

interface DifficultWordsContextType {
  difficultWords: DifficultWord[];
  addDifficult: (item: Omit<DifficultWord, "savedAt" | "wrongCount">) => void;
  removeDifficult: (id: string) => void;
  isDifficult: (id: string) => boolean;
  incrementWrongCount: (id: string) => void;
}

const DifficultWordsContext = createContext<DifficultWordsContextType | null>(null);

export function DifficultWordsProvider({ children }: { children: ReactNode }) {
  const { user } = useAppState();
  const [difficultWords, setDifficultWords] = useState<DifficultWord[]>(loadDifficult);
  const loadedFromSupabase = useRef(false);

  useEffect(() => {
    saveDifficult(difficultWords);
  }, [difficultWords]);

  useEffect(() => {
    if (!user) {
      loadedFromSupabase.current = false;
      return;
    }
    if (loadedFromSupabase.current) return;
    loadedFromSupabase.current = true;

    getDifficultWords(user.id).then((rows) => {
      if (rows.length > 0) {
        const items: DifficultWord[] = rows.map((r) => r.word_data as unknown as DifficultWord);
        setDifficultWords(items);
        saveDifficult(items);
      }
    }).catch(console.error);
  }, [user]);

  const addDifficult = useCallback(
    (item: Omit<DifficultWord, "savedAt" | "wrongCount">) => {
      setDifficultWords((prev) => {
        if (prev.some((f) => f.id === item.id)) return prev;
        const newItem = { ...item, savedAt: Date.now(), wrongCount: 0 };
        if (user) {
          addDifficultToSupabase(user.id, item).catch(console.error);
        }
        return [newItem, ...prev];
      });
    },
    [user],
  );

  const removeDifficult = useCallback(
    (id: string) => {
      setDifficultWords((prev) => {
        const filtered = prev.filter((f) => f.id !== id);
        if (user) {
          removeDifficultFromSupabase(user.id, id).catch(console.error);
        }
        return filtered;
      });
    },
    [user],
  );

  const incrementWrongCount = useCallback(
    (id: string) => {
      setDifficultWords((prev) => {
        const word = prev.find((w) => w.id === id);
        if (word && user) {
          incrementDifficultCount(user.id, id).catch(console.error);
        }
        return prev.map((w) => (w.id === id ? { ...w, wrongCount: w.wrongCount + 1 } : w));
      });
    },
    [user],
  );

  const value = useMemo(
    () => ({
      difficultWords,
      addDifficult,
      removeDifficult,
      isDifficult: (id: string) => difficultWords.some((f) => f.id === id),
      incrementWrongCount,
    }),
    [difficultWords, addDifficult, removeDifficult, incrementWrongCount],
  );

  return <DifficultWordsContext.Provider value={value}>{children}</DifficultWordsContext.Provider>;
}

export function useDifficultWords() {
  const ctx = useContext(DifficultWordsContext);
  if (!ctx) throw new Error("useDifficultWords must be used within DifficultWordsProvider");
  return ctx;
}
