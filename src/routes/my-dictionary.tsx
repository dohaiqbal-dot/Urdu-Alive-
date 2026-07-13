import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Search, X, BookMarked, Flag, ChevronLeft, Trash2, Volume2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUrduSpeech } from "@/hooks/useUrduSpeech";
import { useFavorites } from "@/context/FavoritesContext";
import { useDifficultWords } from "@/context/DifficultWordsContext";

export const Route = createFileRoute("/my-dictionary")({
  head: () => ({
    meta: [
      { title: "My Urdu Dictionary — Saved Words" },
      {
        name: "description",
        content: "Your personal collection of saved Urdu words and phrases.",
      },
    ],
  }),
  component: MyDictionaryPage,
});

const sourceLabels: Record<string, string> = {
  learn40: "Learn Urdu",
  revive: "Revive Urdu",
  treasury: "Treasury",
  idioms: "Idioms",
};

const sourceColors: Record<string, string> = {
  learn40: "bg-rose/10 text-rose",
  revive: "bg-indigo-deep/10 text-indigo-deep",
  treasury: "bg-teal/10 text-teal",
  idioms: "bg-saffron/10 text-ink",
};

function MyDictionaryPage() {
  const { speak, loadingText, error } = useUrduSpeech();
  useEffect(() => {
    if (error) toast.error(error, { id: "urdu-voice" });
  }, [error]);
  const { favorites, removeFavorite } = useFavorites();
  const { difficultWords, removeDifficult } = useDifficultWords();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [tab, setTab] = useState<"favorites" | "hard">("favorites");

  const filtered = useMemo(() => {
    const items = tab === "favorites" ? favorites : difficultWords;
    let result = items;
    if (filter) {
      result = result.filter((f) => f.source === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.urduScript.toLowerCase().includes(q) ||
          f.romanUrdu.toLowerCase().includes(q) ||
          f.meaning.toLowerCase().includes(q) ||
          (f.category || "").toLowerCase().includes(q),
      );
    }
    return result;
  }, [favorites, difficultWords, search, filter, tab]);

  const recentlyAddedCount = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return favorites.filter((f) => f.savedAt > sevenDaysAgo).length;
  }, [favorites]);

  const currentList = tab === "favorites" ? favorites : difficultWords;

  return (
    <div className="min-h-screen bg-paper dark:bg-background text-ink dark:text-foreground">
      <div className="bg-rose text-paper py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-paper/70 hover:text-paper text-xs mb-4 transition-colors"
          >
            <ChevronLeft className="size-3" /> Back to Home
          </Link>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-paper/60 mb-3">
            Your Collection
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-tight mb-3">
            My Urdu Dictionary
          </h1>
          <p className="text-paper/70 max-w-xl text-sm md:text-base leading-relaxed">
            All the words you've saved in one place. Review, search, and manage your personal
            collection.
          </p>
          <div className="mt-5 flex gap-6">
            <div>
              <div className="text-2xl font-display font-bold">{favorites.length}</div>
              <div className="text-[10px] uppercase tracking-wider text-paper/60">
                Favorite Words
              </div>
            </div>
            <div>
              <div className="text-2xl font-display font-bold">{difficultWords.length}</div>
              <div className="text-[10px] uppercase tracking-wider text-paper/60">Hard Words</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => {
              setTab("favorites");
              setSearch("");
              setFilter(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              tab === "favorites"
                ? "bg-rose text-paper shadow-lg shadow-rose/20"
                : "bg-ink/5 text-ink/60 hover:bg-ink/10"
            }`}
          >
            <BookMarked className="size-3.5" />
            Favorite Words ({favorites.length})
          </button>
          <button
            onClick={() => {
              setTab("hard");
              setSearch("");
              setFilter(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              tab === "hard"
                ? "bg-saffron text-ink shadow-lg shadow-saffron/20"
                : "bg-ink/5 text-ink/60 hover:bg-ink/10"
            }`}
          >
            <Flag className="size-3.5" />
            Hard Words ({difficultWords.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ink/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Urdu, Roman Urdu, meaning, or category..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-card border border-ink/10 text-sm placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-rose/30"
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

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setFilter(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              filter === null ? "bg-rose text-paper" : "bg-ink/5 text-ink/60 hover:bg-ink/10"
            }`}
          >
            All ({currentList.length})
          </button>
          {(["learn40", "revive", "treasury", "idioms"] as const).map((src) => {
            const count = currentList.filter((f) => f.source === src).length;
            if (count === 0) return null;
            return (
              <button
                key={src}
                onClick={() => setFilter(filter === src ? null : src)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  filter === src ? "bg-rose text-paper" : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                }`}
              >
                {sourceLabels[src]} ({count})
              </button>
            );
          })}
        </div>

        {/* Word Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="size-16 mx-auto mb-4 rounded-full bg-ink/5 flex items-center justify-center">
              {tab === "favorites" ? (
                <BookMarked className="size-8 text-ink/20" />
              ) : (
                <Flag className="size-8 text-ink/20" />
              )}
            </div>
            <p className="font-display text-xl text-ink/60 mb-2">
              {currentList.length === 0
                ? tab === "favorites"
                  ? "You haven't saved any favorite words yet."
                  : "You haven't marked any hard words yet."
                : "No words match your search."}
            </p>
            <p className="text-sm text-ink/40 max-w-sm mx-auto">
              {currentList.length === 0
                ? tab === "favorites"
                  ? "Start exploring and build your personal Urdu dictionary."
                  : "Mark words as difficult while learning to review them here."
                : "Try a different search or filter."}
            </p>
            {currentList.length === 0 && tab === "favorites" && (
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Link
                  to="/learn-40-days"
                  className="px-5 py-2.5 rounded-full bg-rose text-paper text-sm font-semibold hover:bg-rose/90 transition-colors"
                >
                  Start Learning
                </Link>
                <Link
                  to="/urdu-treasury"
                  className="px-5 py-2.5 rounded-full bg-teal text-paper text-sm font-semibold hover:bg-teal/90 transition-colors"
                >
                  Explore Treasury
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-ink/5 bg-card p-5 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${sourceColors[item.source] || "bg-ink/5 text-ink/60"}`}
                  >
                    {sourceLabels[item.source] || item.source}
                  </span>
                  <button
                    onClick={() => {
                      if (tab === "favorites") removeFavorite(item.id);
                      else removeDifficult(item.id);
                    }}
                    className="size-7 rounded-full flex items-center justify-center text-ink/20 hover:text-rose hover:bg-rose/5 transition-all"
                    title={
                      tab === "favorites" ? "Remove from dictionary" : "Remove from hard words"
                    }
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-end gap-2 mb-2">
                  <button
                    onClick={() => speak(item.meaning)}
                    className="size-7 rounded-full bg-rose/10 flex items-center justify-center hover:bg-rose/20 transition-colors text-rose flex-shrink-0 disabled:opacity-50"
                    disabled={loadingText === item.meaning}
                    title="Listen to pronunciation"
                  >
                    {loadingText === item.meaning ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Volume2 className="size-3.5" />
                    )}
                  </button>
                  <div className="text-right font-urdu text-2xl text-ink leading-tight">
                    {item.urduScript}
                  </div>
                </div>
                <div className="font-display text-base italic mb-1">{item.romanUrdu}</div>
                <p className="text-xs text-ink/60 leading-relaxed line-clamp-2">{item.meaning}</p>
                {item.exampleSentence && (
                  <div className="mt-3 pt-3 border-t border-ink/5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-ink/30 mb-1">
                      Example
                    </div>
                    <p className="text-xs text-ink/50 italic">{item.exampleSentence}</p>
                  </div>
                )}
                {item.category && (
                  <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-teal/60">
                    {item.category}
                  </div>
                )}
                {tab === "hard" && "wrongCount" in item && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-saffron/70">
                    <Flag className="size-3" />
                    Struggled {(item as { wrongCount: number }).wrongCount} times
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
