import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useMemo } from "react";
import {
  Volume2,
  RotateCcw,
  Loader2,
  Check,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useAppState } from "@/context/AppState";
import { useSpeech } from "@/hooks/useSpeech";
import { learn40Data, type LearnWord } from "@/content/learn40-data";

export const Route = createFileRoute("/learn-40-days")({
  head: () => ({
    meta: [
      { title: "Learn Urdu in 40 Days — Beginner Course" },
      {
        name: "description",
        content: "A practical journey from zero to confident daily conversation in Urdu.",
      },
    ],
  }),
  component: Learn40DaysPage,
});

interface Flashcard {
  id: string;
  front: string;
  back: string;
  urduScript: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

function getDayData(day: number) {
  for (const phase of learn40Data) {
    for (const d of phase.days) {
      if (d.day === day) return d;
    }
  }
  return null;
}

function getAllWordsUpToDay(day: number): LearnWord[] {
  const words: LearnWord[] = [];
  for (const phase of learn40Data) {
    for (const d of phase.days) {
      if (d.day <= day) words.push(...d.words);
    }
  }
  return words;
}

function generateFlashcards(day: number): Flashcard[] {
  const dayData = getDayData(day);
  if (!dayData) return [];
  return dayData.words.map((w) => ({
    id: `fc-${day}-${w.id}`,
    front: w.english,
    back: w.romanUrdu,
    urduScript: w.urduScript,
  }));
}

function generateQuiz(day: number): QuizQuestion[] {
  const allWords = getAllWordsUpToDay(day);
  if (allWords.length < 4) return [];
  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(5, shuffled.length));
  return selected.map((w, i) => {
    const others = allWords
      .filter((x) => x.romanUrdu !== w.romanUrdu)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [...others.map((o) => o.english), w.english].sort(() => Math.random() - 0.5);
    return {
      id: `q-${day}-${i}`,
      question: `What does "${w.romanUrdu}" mean?`,
      options,
      correct: options.indexOf(w.english),
    };
  });
}

function Learn40DaysPage() {
  const {
    setActiveTrack,
    isTrackLocked,
    activeTrack,
    currentDay,
    setCurrentDay,
    completedDays,
    markDayComplete,
    addXP,
  } = useAppState();
  const { speak, stop, loading } = useSpeech();
  const [view, setView] = useState<"list" | "practice">("list");
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const dayData = useMemo(() => getDayData(currentDay), [currentDay]);
  const flashcards = useMemo(() => generateFlashcards(currentDay), [currentDay]);
  const quiz = useMemo(() => generateQuiz(currentDay), [currentDay]);

  const currentPhase = useMemo(() => {
    for (const phase of learn40Data) {
      for (const d of phase.days) {
        if (d.day === currentDay) return phase;
      }
    }
    return null;
  }, [currentDay]);

  const handleStartTrack = () => setActiveTrack("learn40");

  const fireConfetti = useCallback(async () => {
    try {
      const { default: confetti } = await import("canvas-confetti");
      const end = Date.now() + 1500;
      const colors = ["#e63946", "#f4a261", "#2a9d8f", "#264653"];
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
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
  }, []);

  const handleQuizAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === quiz[quizIndex].correct) {
      setQuizScore((s) => s + 1);
      setWrongCount(0);
      addXP(10);
    } else {
      setWrongCount((c) => {
        const next = c + 1;
        if (next >= 3) setShowExplanation(true);
        return next;
      });
    }
  };

  const nextQuizQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (quizIndex < quiz.length - 1) {
      setQuizIndex((i) => i + 1);
    } else {
      setQuizComplete(true);
      if (quizScore >= quiz.length * 0.7) {
        markDayComplete(currentDay);
        addXP(50);
        fireConfetti();
      }
    }
  };

  const resetPractice = () => {
    setView("list");
    setFlashcardIndex(0);
    setIsFlipped(false);
    setQuizIndex(0);
    setQuizScore(0);
    setWrongCount(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-background text-ink dark:text-foreground">
      {/* Hero */}
      <div className="bg-rose text-paper py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-saffron mb-3">
            Beginner Course
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-tight mb-3">
            Learn Urdu in 40 Days
          </h1>
          <p className="text-paper/70 max-w-xl text-sm md:text-base leading-relaxed">
            A practical journey from zero to confident daily conversation. Speak, understand, and
            connect.
          </p>
          {!isTrackLocked && (
            <button
              onClick={handleStartTrack}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-paper text-rose font-semibold text-sm rounded-full hover:bg-paper/90 transition-colors"
            >
              <Sparkles className="size-4" /> Start Day 1
            </button>
          )}
          {activeTrack === "learn40" && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper/20 text-xs font-bold uppercase tracking-wider">
              Active Track — Day {currentDay}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Day Selector */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => {
              setCurrentDay(Math.max(1, currentDay - 1));
              resetPractice();
            }}
            className="size-8 rounded-full bg-ink/5 flex items-center justify-center hover:bg-ink/10 transition-colors flex-shrink-0"
            disabled={currentDay <= 1}
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {Array.from({ length: 40 }, (_, i) => i + 1).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setCurrentDay(d);
                  resetPractice();
                }}
                className={`flex-shrink-0 w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  currentDay === d
                    ? "bg-rose text-paper shadow"
                    : completedDays.includes(d)
                      ? "bg-teal/10 text-teal"
                      : "bg-ink/5 text-ink/50 hover:bg-ink/10"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setCurrentDay(Math.min(40, currentDay + 1));
              resetPractice();
            }}
            className="size-8 rounded-full bg-ink/5 flex items-center justify-center hover:bg-ink/10 transition-colors flex-shrink-0"
            disabled={currentDay >= 40}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {dayData && currentPhase ? (
          <>
            {/* Phase & Day Header */}
            <div className="mb-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose/60 mb-1">
                {currentPhase.title} — Days {currentPhase.dayRange}
              </div>
              <h2 className="font-display text-2xl md:text-3xl">
                Day {dayData.day} — {dayData.title}
              </h2>
              {!completedDays.includes(currentDay) && activeTrack === "learn40" && (
                <button
                  onClick={() => {
                    markDayComplete(currentDay);
                    addXP(50);
                    fireConfetti();
                  }}
                  className="mt-3 px-4 py-2 bg-teal text-paper text-sm font-semibold rounded-full hover:bg-teal/90 transition-colors"
                >
                  Mark Day Complete (+50 XP)
                </button>
              )}
              {completedDays.includes(currentDay) && (
                <span className="mt-3 inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-bold uppercase">
                  Completed
                </span>
              )}
            </div>

            {/* LIST VIEW — Core Memorization Grid */}
            {view === "list" && (
              <>
                <div className="rounded-2xl border border-ink/5 overflow-hidden mb-8">
                  {/* Table Header */}
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-4 px-5 py-3 bg-ink/5 border-b border-ink/5 text-[10px] font-bold uppercase tracking-wider text-ink/40">
                    <span>English</span>
                    <span>Roman Urdu</span>
                    <span className="w-10" />
                  </div>
                  {/* Word Rows */}
                  {dayData.words.map((word, i) => (
                    <div
                      key={word.id}
                      className={`grid grid-cols-[1fr_1fr_auto] gap-4 px-5 py-3.5 items-center transition-colors hover:bg-ink/3 ${
                        i < dayData.words.length - 1 ? "border-b border-ink/5" : ""
                      }`}
                    >
                      <span className="text-sm font-medium">{word.english}</span>
                      <span className="text-sm text-ink/70 italic font-display">
                        {word.romanUrdu}
                      </span>
                      <button
                        onClick={() => speak(word.romanUrdu, word.urduScript)}
                        disabled={loading}
                        className="size-8 rounded-full bg-rose/10 flex items-center justify-center hover:bg-rose/20 transition-colors text-rose flex-shrink-0 disabled:opacity-50"
                        title="Listen to pronunciation"
                      >
                        {loading ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Volume2 className="size-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Practice Button */}
                {dayData.words.length > 0 && (
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setView("practice");
                        setFlashcardIndex(0);
                        setIsFlipped(false);
                        setQuizIndex(0);
                        setQuizScore(0);
                        setQuizComplete(false);
                        setSelectedAnswer(null);
                        setWrongCount(0);
                        setShowExplanation(false);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose text-paper font-semibold text-sm hover:bg-rose/90 transition-colors"
                    >
                      <ArrowRight className="size-4" /> Start Practice & Exercises
                    </button>
                    <p className="text-xs text-ink/40 mt-2">
                      Review the list above, then practice with flashcards and quizzes
                    </p>
                  </div>
                )}
              </>
            )}

            {/* PRACTICE VIEW — Flashcards + Quiz */}
            {view === "practice" && (
              <div>
                <button
                  onClick={() => setView("list")}
                  className="text-sm text-ink/50 hover:text-ink mb-6 inline-flex items-center gap-1"
                >
                  <ChevronLeft className="size-3" /> Back to memorization list
                </button>

                {/* Practice Mode Tabs */}
                <div className="flex gap-2 mb-8">
                  <button
                    onClick={() => {
                      setFlashcardIndex(0);
                      setIsFlipped(false);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                      flashcardIndex >= 0 && !quizComplete
                        ? "bg-rose text-paper"
                        : "bg-ink/5 text-ink/50 hover:bg-ink/10"
                    }`}
                  >
                    Flashcards
                  </button>
                  <button
                    onClick={() => {
                      setQuizIndex(0);
                      setQuizScore(0);
                      setQuizComplete(false);
                      setSelectedAnswer(null);
                      setWrongCount(0);
                      setShowExplanation(false);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                      quizComplete ? "bg-teal/10 text-teal" : "bg-ink/5 text-ink/50 hover:bg-ink/10"
                    }`}
                  >
                    Quiz
                  </button>
                </div>

                {/* Flashcards Section */}
                {!quizComplete && flashcards.length > 0 && (
                  <div className="max-w-md mx-auto mb-12">
                    <h3 className="font-display text-lg font-semibold mb-4 text-center">
                      Flashcards
                    </h3>
                    <div className="relative perspective-1000">
                      <div
                        className={`w-full aspect-[3/4] rounded-3xl cursor-pointer transition-transform duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                      >
                        {/* Front */}
                        <div className="absolute inset-0 rounded-3xl bg-card border border-ink/10 p-8 flex flex-col items-center justify-center backface-hidden">
                          <div className="text-xs font-mono uppercase tracking-wider text-ink/30 mb-4">
                            {flashcardIndex + 1} / {flashcards.length}
                          </div>
                          <div className="text-3xl font-display font-bold text-center">
                            {flashcards[flashcardIndex].front}
                          </div>
                          <p className="text-xs text-ink/30 mt-6">Tap to flip</p>
                        </div>
                        {/* Back */}
                        <div className="absolute inset-0 rounded-3xl bg-ink text-paper p-8 flex flex-col items-center justify-center rotate-y-180 backface-hidden">
                          <div className="font-display text-3xl italic text-paper/90 mb-4">
                            {flashcards[flashcardIndex].back}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speak(flashcards[flashcardIndex].back, flashcards[flashcardIndex].urduScript);
                            }}
                            disabled={loading}
                            className="mt-4 size-10 rounded-full bg-paper/20 flex items-center justify-center hover:bg-paper/30 transition-colors disabled:opacity-50"
                          >
                            {loading ? (
                              <Loader2 className="size-5 animate-spin" />
                            ) : (
                              <Volume2 className="size-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3 mt-6">
                      <button
                        onClick={() => {
                          setFlashcardIndex((i) => Math.max(0, i - 1));
                          setIsFlipped(false);
                        }}
                        disabled={flashcardIndex === 0}
                        className="px-4 py-2 rounded-full bg-ink/5 text-sm font-medium hover:bg-ink/10 disabled:opacity-30"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => {
                          setFlashcardIndex((i) => Math.min(flashcards.length - 1, i + 1));
                          setIsFlipped(false);
                          addXP(10);
                        }}
                        disabled={flashcardIndex === flashcards.length - 1}
                        className="px-4 py-2 rounded-full bg-rose text-paper text-sm font-medium hover:bg-rose/90 disabled:opacity-30"
                      >
                        Next (+10 XP)
                      </button>
                    </div>
                  </div>
                )}

                {/* Quiz Section */}
                {quiz.length > 0 && !quizComplete && (
                  <div className="max-w-lg mx-auto mb-12">
                    <h3 className="font-display text-lg font-semibold mb-4 text-center">
                      Quick Quiz
                    </h3>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-ink/40">
                        Question {quizIndex + 1} / {quiz.length}
                      </span>
                      <span className="text-xs font-bold text-rose">Score: {quizScore}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink/5 mb-6">
                      <div
                        className="h-full rounded-full bg-rose transition-all"
                        style={{
                          width: `${((quizIndex + 1) / quiz.length) * 100}%`,
                        }}
                      />
                    </div>
                    <h3 className="font-display text-xl mb-6">{quiz[quizIndex].question}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {quiz[quizIndex].options.map((opt, i) => {
                        const isCorrect = i === quiz[quizIndex].correct;
                        const isSelected = selectedAnswer === i;
                        let bg = "bg-card hover:border-rose/30";
                        if (selectedAnswer !== null) {
                          if (isCorrect) bg = "bg-teal/10 border-teal";
                          else if (isSelected) bg = "bg-rose/10 border-rose";
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => handleQuizAnswer(i)}
                            disabled={selectedAnswer !== null}
                            className={`p-4 rounded-xl border border-ink/10 text-left font-medium transition-all ${bg}`}
                          >
                            <span className="text-sm">{opt}</span>
                            {selectedAnswer !== null && isCorrect && (
                              <Check className="inline ml-2 size-4 text-teal" />
                            )}
                            {isSelected && !isCorrect && (
                              <X className="inline ml-2 size-4 text-rose" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {selectedAnswer !== null && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={nextQuizQuestion}
                          className="px-5 py-2 bg-rose text-paper rounded-full text-sm font-semibold hover:bg-rose/90"
                        >
                          {quizIndex < quiz.length - 1 ? "Next Question" : "See Results"}
                        </button>
                      </div>
                    )}
                    {showExplanation && (
                      <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                        <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
                          3 wrong attempts — Explanation:
                        </p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          Review the memorization list above, then try again.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Quiz Complete */}
                {quizComplete && (
                  <div className="max-w-md mx-auto text-center py-12">
                    <div className="text-5xl mb-4">
                      {quizScore >= quiz.length * 0.7 ? "🎉" : "📖"}
                    </div>
                    <h3 className="font-display text-2xl mb-2">
                      {quizScore >= quiz.length * 0.7 ? "Excellent Work!" : "Keep Practicing!"}
                    </h3>
                    <p className="text-ink/60 mb-2">
                      You scored {quizScore} / {quiz.length}
                    </p>
                    {quizScore >= quiz.length * 0.7 ? (
                      <p className="text-sm text-teal font-medium mb-6">
                        +50 XP earned! Day {currentDay} complete.
                      </p>
                    ) : (
                      <p className="text-sm text-ink/50 mb-6">
                        Score 70% or higher to pass. Try again!
                      </p>
                    )}
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => setView("list")}
                        className="px-5 py-2 rounded-full bg-ink/5 text-sm font-medium hover:bg-ink/10"
                      >
                        Back to List
                      </button>
                      <button
                        onClick={() => {
                          setQuizIndex(0);
                          setQuizScore(0);
                          setQuizComplete(false);
                          setSelectedAnswer(null);
                          setWrongCount(0);
                          setShowExplanation(false);
                        }}
                        className="px-5 py-2 rounded-full bg-rose text-paper text-sm font-semibold hover:bg-rose/90"
                      >
                        <RotateCcw className="inline size-3.5 mr-1" /> Retry Quiz
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-ink/40">
            <p className="font-display text-xl">Select a day to begin</p>
            <p className="text-sm mt-2">Tap any day number above to view vocabulary</p>
          </div>
        )}
      </div>
    </div>
  );
}
