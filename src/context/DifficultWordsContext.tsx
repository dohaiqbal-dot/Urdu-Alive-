import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

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
  const [difficultWords, setDifficultWords] = useState<DifficultWord[]>(loadDifficult);

  useEffect(() => {
    saveDifficult(difficultWords);
  }, [difficultWords]);

  const addDifficult = useCallback((item: Omit<DifficultWord, "savedAt" | "wrongCount">) => {
    setDifficultWords((prev) => {
      if (prev.some((f) => f.id === item.id)) return prev;
      return [{ ...item, savedAt: Date.now(), wrongCount: 0 }, ...prev];
    });
  }, []);

  const removeDifficult = useCallback((id: string) => {
    setDifficultWords((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const incrementWrongCount = useCallback((id: string) => {
    setDifficultWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, wrongCount: w.wrongCount + 1 } : w)),
    );
  }, []);

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
