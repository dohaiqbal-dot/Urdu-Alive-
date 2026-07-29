import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Volume2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAppState } from "@/context/AppState";
import { useUrduSpeech } from "@/hooks/useUrduSpeech";
import { reviveData, type ReviveWord } from "@/content/revive-urdu-data";
import { FavoriteButton } from "@/components/FavoriteButton";
import { MarkDifficultButton } from "@/components/MarkDifficultButton";

export const Route = createFileRoute("/revive-urdu")({
  head: () => ({
    meta: [
      { title: "Revive Your Urdu — 30-Day Vocabulary Challenge" },
      {
        name: "description",
        content: "Replace borrowed English words with rich Urdu alternatives in 30 days.",
      },
    ],
  }),
  component: ReviveUrduPage,
});

function ReviveUrduPage() {
  const { speak, loadingText, error } = useUrduSpeech();
  useEffect(() => {
    if (error) toast.error(error, { id: "urdu-voice" });
  }, [error]);

  const { setActiveTrack, isTrackLocked, activeTrack, completedDays, markDayComplete, addXP, addWordsLearned } =
    useAppState();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [expandedWord, setExpandedWord] = useState<number | null>(null);

  const handleStartTrack = () => {
    setActiveTrack("revive");
  };

  const currentWeek = reviveData[selectedWeek];
  const currentDayData =
    selectedDay !== null ? reviveData[selectedWeek]?.days.find((d) => d.day === selectedDay) : null;

  const handleDayComplete = (day: number) => {
    if (completedDays.includes(day)) return;
    markDayComplete(day);
    addXP(50);
    const dayData = reviveData.flatMap(w => w.days).find(d => d.day === day);
    if (dayData) addWordsLearned(dayData.words.length);
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-background text-ink dark:text-foreground">
      {/* Hero */}
      <div className="bg-indigo-deep text-paper py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-saffron mb-3">
            30-Day Challenge
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-tight mb-3">Revive Your Urdu</h1>
          <p className="text-paper/70 max-w-xl text-sm md:text-base leading-relaxed">
            A vocabulary challenge for native speakers to replace borrowed English words with rich,
            authentic Urdu alternatives.
          </p>
          {!isTrackLocked && (
            <button
              onClick={handleStartTrack}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-saffron text-ink font-semibold text-sm rounded-full hover:bg-mustard transition-colors"
            >
              Start This Challenge
            </button>
          )}
          {activeTrack === "revive" && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper/20 text-xs font-bold uppercase tracking-wider">
              Active Track
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Week Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {reviveData.map((week, i) => (
            <button
              key={week.week}
              onClick={() => {
                setSelectedWeek(i);
                setSelectedDay(null);
                setExpandedWord(null);
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedWeek === i ? "bg-rose text-paper" : "bg-ink/5 text-ink/60 hover:bg-ink/10"
              }`}
            >
              Week {week.week}
            </button>
          ))}
        </div>

        <h2 className="font-display text-xl md:text-2xl mb-4">{currentWeek.title}</h2>

        {/* Day Selector */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 mb-8">
          {currentWeek.days.map((day) => (
            <button
              key={day.day}
              onClick={() => {
                setSelectedDay(day.day);
                setExpandedWord(null);
              }}
              className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                selectedDay === day.day
                  ? "bg-rose text-paper shadow-lg shadow-rose/30 scale-105"
                  : completedDays.includes(day.day)
                    ? "bg-teal/10 text-teal border border-teal/30"
                    : "bg-ink/5 text-ink/60 hover:bg-ink/10"
              }`}
            >
              {day.day}
              {completedDays.includes(day.day) && (
                <span className="absolute -top-1 -right-1 size-3 rounded-full bg-teal" />
              )}
            </button>
          ))}
        </div>

        {/* Day Content */}
        {currentDayData ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl">
                  Day {currentDayData.day} — {currentDayData.title}
                </h3>
                <p className="text-ink/50 text-sm mt-1">{currentDayData.theme}</p>
              </div>
              {!completedDays.includes(currentDayData.day) && activeTrack === "revive" && (
                <button
                  onClick={() => handleDayComplete(currentDayData.day)}
                  className="px-4 py-2 bg-teal text-paper text-sm font-semibold rounded-full hover:bg-teal/90 transition-colors"
                >
                  Mark Complete (+50 XP)
                </button>
              )}
              {completedDays.includes(currentDayData.day) && (
                <span className="px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-bold uppercase">
                  Completed
                </span>
              )}
            </div>

            <div className="space-y-3">
              {currentDayData.words.map((word) => (
                <WordCard
                  key={word.id}
                  word={word}
                  isExpanded={expandedWord === word.id}
                  onToggle={() => setExpandedWord(expandedWord === word.id ? null : word.id)}
                  speak={speak}
                  loadingText={loadingText}
                />
              ))}
            </div>
          </div>
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

function WordCard({
  word,
  isExpanded,
  onToggle,
  speak,
  loadingText,
}: {
  word: ReviveWord;
  isExpanded: boolean;
  onToggle: () => void;
  speak: (text: string) => void;
  loadingText: string | null;
}) {
  return (
    <div className="rounded-2xl border border-ink/5 bg-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="text-right font-urdu text-2xl text-ink leading-tight min-w-[80px]">
            {word.urduScript}
          </div>
          <div>
            <div className="font-display text-lg italic">{word.romanUrdu}</div>
            <div className="text-xs text-ink/50 mt-0.5">{word.meaning}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              speak(word.meaning);
            }}
            className="size-8 rounded-full bg-rose/10 flex items-center justify-center hover:bg-rose/20 transition-colors text-rose flex-shrink-0 disabled:opacity-50"
            disabled={loadingText === word.meaning}
            title="Listen to pronunciation"
          >
            {loadingText === word.meaning ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>
          <FavoriteButton
            item={{
              id: `revive-${word.id}`,
              urduScript: word.urduScript,
              romanUrdu: word.romanUrdu,
              meaning: word.meaning,
              source: "revive",
              exampleSentence: word.urduSentence,
            }}
          />
          <MarkDifficultButton
            item={{
              id: `dif-revive-${word.id}`,
              urduScript: word.urduScript,
              romanUrdu: word.romanUrdu,
              meaning: word.meaning,
              source: "revive",
              exampleSentence: word.urduSentence,
            }}
          />
          {isExpanded ? (
            <ChevronUp className="size-4 text-ink/30" />
          ) : (
            <ChevronDown className="size-4 text-ink/30" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-ink/5 pt-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal mb-1">
              Definition
            </div>
            <p className="text-sm text-ink/70">{word.definition}</p>
          </div>

          <div className="bg-ink/3 rounded-xl p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose mb-2">
              Urdu Sentence
            </div>
            <div className="text-right font-urdu text-lg leading-loose mb-2">
              {word.urduSentence}
            </div>
            <div className="text-xs text-ink/50 italic">{word.romanUrduSentence}</div>
            <div className="text-xs text-ink/60 mt-1">{word.englishTranslation}</div>
          </div>

          {/* Before/After Upgrade Block */}
          <div className="rounded-xl overflow-hidden border border-ink/5">
            <div className="bg-ink/5 px-4 py-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-1">
                  Before (English)
                </div>
                <p className="text-sm text-ink/50 line-through">{word.beforeSentence}</p>
              </div>
              <ArrowRight className="size-4 text-rose flex-shrink-0" />
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                  After (Urdu)
                </div>
                <p className="text-sm font-bold text-ink dark:text-amber-200">
                  {word.afterSentence}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
