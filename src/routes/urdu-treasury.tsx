import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Search, X, Volume2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { treasuryCategories, allTreasuryWords, type TreasuryWord } from "@/content/treasury-data";
import { useUrduSpeech } from "@/hooks/useUrduSpeech";
import { FavoriteButton } from "@/components/FavoriteButton";
import { MarkDifficultButton } from "@/components/MarkDifficultButton";

export const Route = createFileRoute("/urdu-treasury")({
  head: () => ({
    meta: [
      { title: "Urdu Treasury — Rare & Poetic Words" },
      {
        name: "description",
        content:
          "A curated collection of rare, literary, and poetic Urdu words from the depths of historical literature.",
      },
    ],
  }),
  component: UrduTreasuryPage,
});

function UrduTreasuryPage() {
  const { speak, loadingText, playingText, error } = useUrduSpeech();
  useEffect(() => {
    if (error) toast.error(error, { id: "urdu-voice" });
  }, [error]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedWord, setExpandedWord] = useState<number | null>(null);

  const filteredWords = useMemo(() => {
    let words = allTreasuryWords;
    if (selectedCategory) {
      words = words.filter((w) => w.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      words = words.filter(
        (w) =>
          w.romanUrdu.toLowerCase().includes(q) ||
          w.englishExplanation.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q),
      );
    }
    return words;
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-paper dark:bg-background text-ink dark:text-foreground">
      {/* Hero */}
      <div className="bg-teal text-paper py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-paper/60 mb-3">
            Explore Freely
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-tight mb-3">Urdu Treasury</h1>
          <p className="text-paper/70 max-w-xl text-sm md:text-base leading-relaxed">
            A curated archive of rare, literary, and poetic Urdu words — wander through the
            vocabulary garden of historical Urdu literature.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ink/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search words by name, meaning, or category..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-card border border-ink/10 text-sm placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-ink/5 flex items-center justify-center hover:bg-ink/10"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              selectedCategory === null
                ? "bg-teal text-paper"
                : "bg-ink/5 text-ink/60 hover:bg-ink/10"
            }`}
          >
            All ({allTreasuryWords.length})
          </button>
          {treasuryCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat.name
                  ? "bg-teal text-paper"
                  : "bg-ink/5 text-ink/60 hover:bg-ink/10"
              }`}
            >
              {cat.name} ({cat.words.length})
            </button>
          ))}
        </div>

        {/* Words Grid */}
        {filteredWords.length === 0 ? (
          <div className="text-center py-16 text-ink/40">
            <p className="font-display text-xl">No words found</p>
            <p className="text-sm mt-2">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWords.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                isExpanded={expandedWord === word.id}
                onToggle={() => setExpandedWord(expandedWord === word.id ? null : word.id)}
              />
            ))}
          </div>
        )}

        <div className="mt-10 text-center text-xs text-ink/30">
          Showing {filteredWords.length} of {allTreasuryWords.length} words
        </div>
      </div>
    </div>
  );
}

function WordCard({
  word,
  isExpanded,
  onToggle,
}: {
  word: TreasuryWord;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className={`rounded-2xl border border-ink/5 bg-card p-5 cursor-pointer transition-all hover:shadow-lg hover:border-teal/20 ${
        isExpanded ? "ring-2 ring-teal/30 shadow-lg" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              speak(word.englishExplanation);
            }}
            className="size-8 rounded-full bg-rose/10 flex items-center justify-center hover:bg-rose/20 transition-colors text-rose flex-shrink-0 disabled:opacity-50"
            disabled={loadingText === word.englishExplanation}
            title="Listen to pronunciation"
          >
            {loadingText === word.englishExplanation ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>
          <FavoriteButton
            item={{
              id: `treasury-${word.id}`,
              urduScript: word.urduScript,
              romanUrdu: word.romanUrdu,
              meaning: word.englishExplanation,
              source: "treasury",
              category: word.category,
            }}
          />
          <MarkDifficultButton
            item={{
              id: `dif-treasury-${word.id}`,
              urduScript: word.urduScript,
              romanUrdu: word.romanUrdu,
              meaning: word.englishExplanation,
              source: "treasury",
              category: word.category,
            }}
          />
        </div>
        <div className="text-right font-urdu text-3xl text-ink leading-tight">
          {word.urduScript}
        </div>
      </div>
      <div className="font-display text-lg italic mb-1">{word.romanUrdu}</div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-teal/60 mb-2">
        {word.category}
      </div>
      <p className="text-xs text-ink/60 leading-relaxed line-clamp-2">{word.englishExplanation}</p>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-ink/5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-teal mb-2">
            Full Meaning
          </div>
          <p className="text-sm text-ink/70 leading-relaxed">{word.englishExplanation}</p>
        </div>
      )}
    </div>
  );
}
