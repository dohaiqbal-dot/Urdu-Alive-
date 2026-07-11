import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import {
  Flame,
  Trophy,
  Target,
  BookOpen,
  Volume2,
  Loader2,
  Check,
  X,
  Flag,
  Sparkles,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAppState } from "@/context/AppState";
import { useDifficultWords } from "@/context/DifficultWordsContext";
import { useUrduSpeech } from "@/hooks/useUrduSpeech";
import { learn40Data } from "@/content/learn40-data";
import { reviveData } from "@/content/revive-urdu-data";
import { allTreasuryWords } from "@/content/treasury-data";

const MISSION_KEY = "urdu-alive-daily-missions";
const LAST_DATE_KEY = "urdu-alive-last-mission-date";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  wordId: string;
}

interface MissionState {
  date: string;
  difficultWordsDone: boolean;
  learnNewDone: boolean;
  quizDone: boolean;
  quizScore: number;
  quizTotal: number;
  quizQuestions: QuizQuestion[];
  quizAnswers: Record<string, number>;
  quizWrongCount: Record<string, number>;
  sentence: string;
  sentenceDone: boolean;
  bonusClaimed: boolean;
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadMissions(): MissionState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(MISSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveMissions(state: MissionState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MISSION_KEY, JSON.stringify(state));
}

function getLastMissionDate(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LAST_DATE_KEY);
}

function setLastMissionDate(date: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_DATE_KEY, date);
}

type ShuffleFn = <T>(arr: T[]) => T[];

const shuffle: ShuffleFn = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function generateQuizQuestions(count: number): QuizQuestion[] {
  const allWords: { id: string; romanUrdu: string; english: string }[] = [];

  for (const phase of learn40Data) {
    for (const day of phase.days) {
      for (const w of day.words) {
        allWords.push({ id: `learn40-${w.id}`, romanUrdu: w.romanUrdu, english: w.english });
      }
    }
  }

  for (const week of reviveData) {
    for (const day of week.days) {
      for (const w of day.words) {
        allWords.push({
          id: `revive-${w.id}`,
          romanUrdu: w.romanUrdu,
          english: w.meaning,
        });
      }
    }
  }

  for (const w of allTreasuryWords) {
    allWords.push({
      id: `treasury-${w.id}`,
      romanUrdu: w.romanUrdu,
      english: w.englishExplanation,
    });
  }

  const selected = shuffle(allWords).slice(0, count);

  return selected.map((w) => {
    const others = allWords
      .filter((x) => x.romanUrdu !== w.romanUrdu && x.english !== w.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = shuffle([w.english, ...others.map((o) => o.english)]);
    return {
      id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      question: `What does "${w.romanUrdu}" mean?`,
      options,
      correct: options.indexOf(w.english),
      wordId: w.id,
    };
  });
}

function getTrackWords() {
  const words: { id: string; romanUrdu: string; urduScript: string; meaning: string }[] = [];
  for (const phase of learn40Data) {
    for (const day of phase.days) {
      for (const w of day.words) {
        words.push({
          id: `learn40-${w.id}`,
          romanUrdu: w.romanUrdu,
          urduScript: w.urduScript,
          meaning: w.english,
        });
      }
    }
  }
  for (const week of reviveData) {
    for (const day of week.days) {
      for (const w of day.words) {
        words.push({
          id: `revive-${w.id}`,
          romanUrdu: w.romanUrdu,
          urduScript: w.urduScript,
          meaning: w.meaning,
        });
      }
    }
  }
  return words;
}

export const Route = createFileRoute("/todays-mission")({
  head: () => ({
    meta: [
      { title: "Today's Mission — Urdu Alive" },
      { name: "description", content: "Complete your daily Urdu learning missions." },
    ],
  }),
  component: TodaysMissionPage,
});

function TodaysMissionPage() {
  const { xp, addXP, streak, incrementStreak } = useAppState();
  const { difficultWords } = useDifficultWords();
  const { speak, loadingText, playingText, error } = useUrduSpeech();
  useEffect(() => {
    if (error) toast.error(error, { id: "urdu-voice" });
  }, [error]);

  const [missions, setMissions] = useState<MissionState | null>(null);
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [sentenceText, setSentenceText] = useState("");
  const [sentenceSaved, setSentenceSaved] = useState(false);
  const [bonusShown, setBonusShown] = useState(false);
  const [difficultReviewed, setDifficultReviewed] = useState<Set<string>>(new Set());
  const [learnReviewed, setLearnReviewed] = useState<Set<string>>(new Set());
  const [claimedXP, setClaimedXP] = useState<Set<string>>(new Set());

  const today = getToday();
  const isNewDay = missions?.date !== today;

  useEffect(() => {
    if (isNewDay || !missions) {
      const fresh: MissionState = {
        date: today,
        difficultWordsDone: false,
        learnNewDone: false,
        quizDone: false,
        quizScore: 0,
        quizTotal: 5,
        quizQuestions: generateQuizQuestions(5),
        quizAnswers: {},
        quizWrongCount: {},
        sentence: "",
        sentenceDone: false,
        bonusClaimed: false,
      };
      setMissions(fresh);
      if (isNewDay) {
        const lastDate = getLastMissionDate();
        if (lastDate && lastDate !== today) {
          const last = new Date(lastDate);
          const diff = Math.round(
            (new Date(today).getTime() - last.getTime()) / (1000 * 60 * 60 * 24),
          );
          if (diff > 1) {
            localStorage.removeItem("urdu-alive-state");
          }
        }
      }
    } else {
      const fromStorage = loadMissions();
      if (fromStorage && fromStorage.date === today) {
        setMissions(fromStorage);
        if (fromStorage.sentence) setSentenceText(fromStorage.sentence);
        if (fromStorage.sentenceDone) setSentenceSaved(true);
        if (fromStorage.quizDone) setQuizSubmitted(true);
      }
    }
  }, []);

  useEffect(() => {
    if (missions && missions.date === today) {
      saveMissions(missions);
      setLastMissionDate(today);
    }
  }, [missions]);

  const saveSentence = useCallback(() => {
    if (!missions || !sentenceText.trim()) return;
    setMissions((prev) =>
      prev ? { ...prev, sentence: sentenceText.trim(), sentenceDone: true } : prev,
    );
    setSentenceSaved(true);
  }, [sentenceText, missions]);

  const handleQuizAnswer = useCallback(
    (index: number) => {
      if (!missions || quizSelected !== null) return;
      setQuizSelected(index);
      const q = missions.quizQuestions[quizCurrent];
      const correct = index === q.correct;

      setMissions((prev) => {
        if (!prev) return prev;
        const newAnswers = { ...prev.quizAnswers, [q.id]: index };
        const newWrongCount = { ...prev.quizWrongCount };
        if (!correct) {
          newWrongCount[q.wordId] = (newWrongCount[q.wordId] || 0) + 1;
        }
        return {
          ...prev,
          quizAnswers: newAnswers,
          quizWrongCount: newWrongCount,
          quizScore: correct ? prev.quizScore + 1 : prev.quizScore,
        };
      });
    },
    [missions, quizCurrent, quizSelected],
  );

  const nextQuizQuestion = useCallback(() => {
    if (!missions) return;
    if (quizCurrent < missions.quizQuestions.length - 1) {
      setQuizCurrent((c) => c + 1);
      setQuizSelected(null);
    } else {
      const finalScore = missions.quizScore;
      setMissions((prev) => (prev ? { ...prev, quizDone: true } : prev));
      setQuizSubmitted(true);
      if (!claimedXP.has("quiz") && finalScore >= Math.ceil(missions.quizTotal / 2)) {
        addXP(50);
        setClaimedXP((p) => new Set(p).add("quiz"));
      }
    }
  }, [missions, quizCurrent, claimedXP, addXP]);

  const claimDifficultXP = useCallback(() => {
    if (claimedXP.has("difficult") || !missions || missions.difficultWordsDone) return;
    const toReview = difficultWords.slice(0, 5);
    if (difficultReviewed.size >= toReview.length) {
      setMissions((prev) => (prev ? { ...prev, difficultWordsDone: true } : prev));
      addXP(30);
      setClaimedXP((p) => new Set(p).add("difficult"));
    }
  }, [difficultWords, difficultReviewed, missions, claimedXP, addXP]);

  const claimLearnNewXP = useCallback(() => {
    if (claimedXP.has("learn") || !missions || missions.learnNewDone) return;
    if (learnReviewed.size >= 3) {
      setMissions((prev) => (prev ? { ...prev, learnNewDone: true } : prev));
      addXP(20);
      setClaimedXP((p) => new Set(p).add("learn"));
    }
  }, [learnReviewed, missions, claimedXP, addXP]);

  const claimBonus = useCallback(async () => {
    if (!missions || missions.bonusClaimed) return;
    const allDone =
      missions.difficultWordsDone &&
      missions.learnNewDone &&
      missions.quizDone &&
      missions.sentenceDone;
    if (!allDone) return;
    setMissions((prev) => (prev ? { ...prev, bonusClaimed: true } : prev));
    addXP(100);
    incrementStreak();
    setBonusShown(true);

    try {
      const { default: confetti } = await import("canvas-confetti");
      const end = Date.now() + 2000;
      const colors = ["#e63946", "#f4a261", "#2a9d8f", "#7c3aed"];
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    } catch {
      // canvas-confetti not installed
    }
  }, [missions, addXP, incrementStreak]);

  useEffect(() => {
    if (missions && !missions.difficultWordsDone) claimDifficultXP();
  }, [difficultReviewed, missions?.difficultWordsDone]);

  useEffect(() => {
    if (missions && !missions.learnNewDone) claimLearnNewXP();
  }, [learnReviewed, missions?.learnNewDone]);

  useEffect(() => {
    if (missions) claimBonus();
  }, [
    missions?.difficultWordsDone,
    missions?.learnNewDone,
    missions?.quizDone,
    missions?.sentenceDone,
  ]);

  const toReview = useMemo(() => difficultWords.slice(0, 5), [difficultWords]);
  const learnWords = useMemo(() => shuffle(getTrackWords()).slice(0, 3), []);
  const missionCount = useMemo(() => {
    if (!missions) return { done: 0, total: 4, pct: 0 };
    const done = [
      missions.difficultWordsDone,
      missions.learnNewDone,
      missions.quizDone,
      missions.sentenceDone,
    ].filter(Boolean).length;
    return { done, total: 4, pct: Math.round((done / 4) * 100) };
  }, [missions]);

  const allMissionsDone = useMemo(
    () =>
      missions &&
      missions.difficultWordsDone &&
      missions.learnNewDone &&
      missions.quizDone &&
      missions.sentenceDone,
    [missions],
  );

  return (
    <div className="min-h-screen bg-paper dark:bg-background text-ink dark:text-foreground">
      {/* Hero */}
      <div className="bg-indigo-deep text-paper py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-paper/70 hover:text-paper text-xs mb-4 transition-colors"
          >
            <ChevronLeft className="size-3" /> Back to Home
          </Link>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-saffron mb-3">
            Daily Practice
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-tight mb-3">Today's Mission</h1>
          <p className="text-paper/70 max-w-xl text-sm md:text-base leading-relaxed">
            Stay consistent. Learn a little every day.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="rounded-2xl bg-ink/5 p-4 flex items-center gap-3">
            <Flame className="size-5 text-saffron flex-shrink-0" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40">
                Streak
              </div>
              <div className="font-display text-lg font-bold">{streak} days</div>
            </div>
          </div>
          <div className="rounded-2xl bg-ink/5 p-4 flex items-center gap-3">
            <Trophy className="size-5 text-rose flex-shrink-0" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40">
                Total XP
              </div>
              <div className="font-display text-lg font-bold">{xp}</div>
            </div>
          </div>
          <div className="rounded-2xl bg-ink/5 p-4 flex items-center gap-3">
            <Target className="size-5 text-teal flex-shrink-0" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40">
                Completed
              </div>
              <div className="font-display text-lg font-bold">
                {missionCount.done}/{missionCount.total}
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-ink/5 p-4 flex items-center gap-3">
            <Sparkles className="size-5 text-indigo-deep flex-shrink-0" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40">
                Progress
              </div>
              <div className="font-display text-lg font-bold">{missionCount.pct}%</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-ink/50 mb-2">
            <span>Daily Progress</span>
            <span>
              {missionCount.done} / {missionCount.total} Missions
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-ink/5">
            <div
              className="h-full rounded-full bg-teal transition-all duration-500"
              style={{ width: `${missionCount.pct}%` }}
            />
          </div>
        </div>

        {/* Mission 1: Review Difficult Words */}
        <div
          className={`rounded-3xl border p-6 mb-5 transition-all ${
            missions?.difficultWordsDone
              ? "border-teal/30 bg-teal/5"
              : "border-ink/5 bg-card hover:shadow-lg"
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flag
                  className={`size-4 ${missions?.difficultWordsDone ? "text-teal" : "text-saffron"}`}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    missions?.difficultWordsDone ? "text-teal" : "text-saffron"
                  }`}
                >
                  Mission 1
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold">Review Difficult Words</h3>
              <p className="text-xs text-ink/50">Review words you've struggled with</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-rose">+30 XP</div>
              {missions?.difficultWordsDone && (
                <span className="text-[10px] font-bold text-teal uppercase">Done</span>
              )}
            </div>
          </div>
          {toReview.length === 0 ? (
            <div className="rounded-2xl bg-ink/3 p-6 text-center">
              <p className="text-sm text-ink/40">
                No difficult words yet. Mark words as difficult while learning!
              </p>
            </div>
          ) : missions?.difficultWordsDone ? (
            <div className="rounded-2xl bg-teal/10 p-4 text-center">
              <Check className="size-5 text-teal mx-auto mb-1" />
              <p className="text-sm font-semibold text-teal">All difficult words reviewed</p>
            </div>
          ) : (
            <div className="space-y-2">
              {toReview.map((w) => {
                const reviewed = difficultReviewed.has(w.id);
                return (
                  <div
                    key={w.id}
                    onClick={() => {
                      setDifficultReviewed((prev) => {
                        const next = new Set(prev);
                        if (reviewed) next.delete(w.id);
                        else next.add(w.id);
                        return next;
                      });
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      reviewed ? "border-teal/30 bg-teal/5" : "border-ink/5 bg-ink/3 hover:bg-ink/5"
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(w.english);
                      }}
                      className="size-8 rounded-full bg-rose/10 flex items-center justify-center hover:bg-rose/20 transition-colors text-rose flex-shrink-0 disabled:opacity-50"
                      disabled={loadingText === w.english}
                    >
                      {loadingText === w.english ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Volume2 className="size-4" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="font-urdu text-lg text-right">{w.urduScript}</div>
                      <div className="font-display text-sm italic">{w.romanUrdu}</div>
                      <div className="text-xs text-ink/50 truncate">{w.meaning}</div>
                    </div>
                    <div
                      className={`size-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                        reviewed ? "bg-teal text-paper" : "bg-ink/10 text-ink/20"
                      }`}
                    >
                      {reviewed ? <Check className="size-4" /> : null}
                    </div>
                  </div>
                );
              })}
              {toReview.length > 0 && difficultReviewed.size >= toReview.length && (
                <p className="text-xs text-teal font-medium text-center pt-1">
                  All reviewed! XP will be awarded.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Mission 2: Learn New Words */}
        <div
          className={`rounded-3xl border p-6 mb-5 transition-all ${
            missions?.learnNewDone
              ? "border-teal/30 bg-teal/5"
              : "border-ink/5 bg-card hover:shadow-lg"
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen
                  className={`size-4 ${missions?.learnNewDone ? "text-teal" : "text-indigo-deep"}`}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    missions?.learnNewDone ? "text-teal" : "text-indigo-deep"
                  }`}
                >
                  Mission 2
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold">Learn New Words</h3>
              <p className="text-xs text-ink/50">Review 3 words from your learning tracks</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-rose">+20 XP</div>
              {missions?.learnNewDone && (
                <span className="text-[10px] font-bold text-teal uppercase">Done</span>
              )}
            </div>
          </div>
          {missions?.learnNewDone ? (
            <div className="rounded-2xl bg-teal/10 p-4 text-center">
              <Check className="size-5 text-teal mx-auto mb-1" />
              <p className="text-sm font-semibold text-teal">Words reviewed!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {learnWords.map((w) => {
                const reviewed = learnReviewed.has(w.id);
                return (
                  <div
                    key={w.id}
                    onClick={() => {
                      setLearnReviewed((prev) => {
                        const next = new Set(prev);
                        if (reviewed) next.delete(w.id);
                        else next.add(w.id);
                        return next;
                      });
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      reviewed ? "border-teal/30 bg-teal/5" : "border-ink/5 bg-ink/3 hover:bg-ink/5"
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(w.english);
                      }}
                      className="size-8 rounded-full bg-rose/10 flex items-center justify-center hover:bg-rose/20 transition-colors text-rose flex-shrink-0 disabled:opacity-50"
                      disabled={loadingText === w.english}
                    >
                      {loadingText === w.english ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Volume2 className="size-4" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="font-urdu text-lg text-right">{w.urduScript}</div>
                      <div className="font-display text-sm italic">{w.romanUrdu}</div>
                      <div className="text-xs text-ink/50 truncate">{w.meaning}</div>
                    </div>
                    <div
                      className={`size-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                        reviewed ? "bg-teal text-paper" : "bg-ink/10 text-ink/20"
                      }`}
                    >
                      {reviewed ? <Check className="size-4" /> : null}
                    </div>
                  </div>
                );
              })}
              {learnReviewed.size >= 3 && (
                <p className="text-xs text-teal font-medium text-center pt-1">
                  All reviewed! XP will be awarded.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Mission 3: Daily Quiz */}
        <div
          className={`rounded-3xl border p-6 mb-5 transition-all ${
            missions?.quizDone ? "border-teal/30 bg-teal/5" : "border-ink/5 bg-card hover:shadow-lg"
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Target className={`size-4 ${missions?.quizDone ? "text-teal" : "text-rose"}`} />
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    missions?.quizDone ? "text-teal" : "text-rose"
                  }`}
                >
                  Mission 3
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold">Complete Daily Quiz</h3>
              <p className="text-xs text-ink/50">Test your knowledge with 5 questions</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-rose">+50 XP</div>
              {missions?.quizDone && (
                <span className="text-[10px] font-bold text-teal uppercase">Done</span>
              )}
            </div>
          </div>

          {missions?.quizDone ? (
            <div className="rounded-2xl bg-teal/10 p-4 text-center">
              <Check className="size-5 text-teal mx-auto mb-1" />
              <p className="text-sm font-semibold text-teal">
                Quiz complete! Score: {missions.quizScore}/{missions.quizTotal}
              </p>
            </div>
          ) : (
            <div>
              {missions && missions.quizQuestions.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-ink/40">
                      Question {quizCurrent + 1} / {missions.quizQuestions.length}
                    </span>
                    <span className="text-xs font-bold text-rose">Score: {missions.quizScore}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-ink/5 mb-4">
                    <div
                      className="h-full rounded-full bg-rose transition-all"
                      style={{
                        width: `${((quizCurrent + 1) / missions.quizQuestions.length) * 100}%`,
                      }}
                    />
                  </div>
                  <h4 className="font-display text-base mb-4">
                    {missions.quizQuestions[quizCurrent].question}
                  </h4>
                  <div className="grid grid-cols-1 gap-2 mb-3">
                    {missions.quizQuestions[quizCurrent].options.map((opt, i) => {
                      const q = missions.quizQuestions[quizCurrent];
                      const isCorrect = i === q.correct;
                      const isSelected = quizSelected === i;
                      const hasStruggled =
                        quizSelected !== null &&
                        !isCorrect &&
                        isSelected &&
                        (missions.quizWrongCount[q.wordId] || 0) >= 2;

                      let bg = "bg-card hover:border-rose/30";
                      if (quizSelected !== null) {
                        if (isCorrect) bg = "bg-teal/10 border-teal";
                        else if (isSelected) bg = "bg-rose/10 border-rose";
                      }
                      return (
                        <div key={i}>
                          <button
                            onClick={() => handleQuizAnswer(i)}
                            disabled={quizSelected !== null}
                            className={`w-full p-3 rounded-xl border border-ink/10 text-left font-medium transition-all ${bg}`}
                          >
                            <span className="text-sm">{opt}</span>
                            {quizSelected !== null && isCorrect && (
                              <Check className="inline ml-2 size-4 text-teal" />
                            )}
                            {isSelected && !isCorrect && (
                              <X className="inline ml-2 size-4 text-rose" />
                            )}
                          </button>
                          {hasStruggled && (
                            <div className="mt-1.5 flex items-center gap-2 px-3 py-2 rounded-lg bg-saffron/10 border border-saffron/20">
                              <Flag className="size-3.5 text-saffron flex-shrink-0" />
                              <span className="text-xs text-saffron-700">
                                You've struggled with this word several times.
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {quizSelected !== null && (
                    <div className="flex justify-end">
                      <button
                        onClick={nextQuizQuestion}
                        className="px-4 py-2 bg-rose text-paper rounded-full text-sm font-semibold hover:bg-rose/90 transition-colors"
                      >
                        {quizCurrent < missions.quizQuestions.length - 1
                          ? "Next Question"
                          : "Finish Quiz"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl bg-ink/3 p-6 text-center">
                  <p className="text-sm text-ink/40">Generating quiz...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mission 4: Sentence Writing */}
        <div
          className={`rounded-3xl border p-6 mb-5 transition-all ${
            missions?.sentenceDone
              ? "border-teal/30 bg-teal/5"
              : "border-ink/5 bg-card hover:shadow-lg"
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Quote
                  className={`size-4 ${missions?.sentenceDone ? "text-teal" : "text-saffron"}`}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    missions?.sentenceDone ? "text-teal" : "text-saffron"
                  }`}
                >
                  Mission 4
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold">Use Urdu in a Sentence</h3>
              <p className="text-xs text-ink/50">Write a sentence using one of today's words</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-rose">+20 XP</div>
              {missions?.sentenceDone && (
                <span className="text-[10px] font-bold text-teal uppercase">Done</span>
              )}
            </div>
          </div>
          {missions?.sentenceDone ? (
            <div className="rounded-2xl bg-teal/10 p-4 text-center">
              <Check className="size-5 text-teal mx-auto mb-1" />
              <p className="text-sm font-semibold text-teal">Sentence saved!</p>
            </div>
          ) : (
            <div>
              <textarea
                value={sentenceText}
                onChange={(e) => setSentenceText(e.target.value)}
                placeholder="Write an Urdu sentence using one of today's words..."
                className="w-full rounded-2xl border border-ink/10 bg-ink/3 p-4 text-sm placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-saffron/30 resize-none min-h-[100px]"
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={saveSentence}
                  disabled={!sentenceText.trim() || sentenceSaved}
                  className="px-5 py-2 bg-saffron text-ink font-semibold text-sm rounded-full hover:bg-saffron/90 transition-colors disabled:opacity-40"
                >
                  {sentenceSaved ? "Saved!" : "Save Sentence (+20 XP)"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Completion Bonus */}
        {!allMissionsDone && (
          <div className="rounded-3xl border border-dashed border-ink/10 bg-ink/3 p-8 text-center">
            <Sparkles className="size-8 text-ink/20 mx-auto mb-2" />
            <p className="font-display text-base text-ink/40">
              Complete all 4 missions to earn a bonus reward!
            </p>
            <p className="text-xs text-ink/30 mt-1">+100 XP + Streak increase</p>
          </div>
        )}

        {allMissionsDone && !bonusShown && (
          <div className="rounded-3xl border border-teal/30 bg-teal/5 p-8 text-center animate-pulse">
            <Sparkles className="size-8 text-teal mx-auto mb-2" />
            <p className="font-display text-xl font-semibold text-teal mb-1">
              All missions complete!
            </p>
            <p className="text-sm text-teal/70">Claiming your bonus...</p>
          </div>
        )}

        {allMissionsDone && bonusShown && (
          <div className="rounded-3xl border border-saffron/30 bg-saffron/5 p-8 text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 size-24 rounded-full bg-saffron/20 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 size-24 rounded-full bg-rose/20 blur-2xl" />
            <div className="relative">
              <Sparkles className="size-10 text-saffron mx-auto mb-3" />
              <h3 className="font-display text-2xl font-bold mb-2">Congratulations!</h3>
              <p className="text-ink/70 mb-4">You completed today's mission.</p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-saffron text-ink font-bold text-sm">
                <Trophy className="size-4" />
                +100 Bonus XP Awarded
              </div>
              <p className="text-xs text-ink/50 mt-3">Maintain your streak tomorrow!</p>
              <Link
                to="/"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rose hover:text-rose/80 transition-colors"
              >
                Back to Home <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
