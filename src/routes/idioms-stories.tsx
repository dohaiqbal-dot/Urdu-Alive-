import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { idiomsData } from "@/content/idioms-data";
import { FavoriteButton } from "@/components/FavoriteButton";

export const Route = createFileRoute("/idioms-stories")({
  head: () => ({
    meta: [
      { title: "20 Idioms & Stories — Urdu Cultural Heritage" },
      {
        name: "description",
        content: "Discover the folklore, trade, and village life behind every iconic Urdu idiom.",
      },
    ],
  }),
  component: IdiomsStoriesPage,
});

function IdiomsStoriesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-paper dark:bg-background text-ink dark:text-foreground">
      {/* Hero */}
      <div className="bg-saffron text-ink py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-ink/50 mb-3">
            Cultural Heritage
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-tight mb-3">Idioms & Stories</h1>
          <p className="text-ink/70 max-w-xl text-sm md:text-base leading-relaxed">
            A living museum of Urdu idioms — each one rooted in centuries of village life, trade,
            royal courts, and agrarian culture.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 gap-4">
          {idiomsData.map((idiom) => (
            <div key={idiom.id} className="rounded-2xl border border-ink/5 bg-card overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === idiom.id ? null : idiom.id)}
                className="w-full p-6 text-left cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-saffron mb-2">
                      Idiom #{idiom.id}
                    </div>
                    <div className="text-right font-urdu text-2xl md:text-3xl text-ink leading-loose mb-3">
                      {idiom.urduScript}
                    </div>
                    <div className="font-display text-lg italic mb-1">{idiom.romanUrdu}</div>
                    <div className="text-xs text-ink/50 italic mb-3">
                      "{idiom.literalTranslation}"
                    </div>
                    <p className="text-sm text-ink/70 leading-relaxed">{idiom.meaning}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    <FavoriteButton
                      item={{
                        id: `idioms-${idiom.id}`,
                        urduScript: idiom.urduScript,
                        romanUrdu: idiom.romanUrdu,
                        meaning: idiom.meaning,
                        source: "idioms",
                      }}
                    />
                    {expandedId === idiom.id ? (
                      <ChevronUp className="size-5 text-ink/30" />
                    ) : (
                      <ChevronDown className="size-5 text-ink/30" />
                    )}
                  </div>
                </div>
              </button>

              {expandedId === idiom.id && (
                <div className="px-6 pb-6 border-t border-ink/5 pt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="size-4 text-saffron" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-saffron">
                      The Story Behind
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed whitespace-pre-line">
                    {idiom.story}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
