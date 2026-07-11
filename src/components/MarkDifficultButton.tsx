import { Flag } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useDifficultWords } from "@/context/DifficultWordsContext";

interface MarkDifficultButtonProps {
  item: {
    id: string;
    urduScript: string;
    romanUrdu: string;
    meaning: string;
    source: "learn40" | "revive" | "treasury" | "idioms";
    category?: string;
    dayNumber?: number;
    exampleSentence?: string;
  };
  className?: string;
}

export function MarkDifficultButton({ item, className = "" }: MarkDifficultButtonProps) {
  const { difficultWords, addDifficult, removeDifficult } = useDifficultWords();
  const isHard = difficultWords.some((f) => f.id === item.id);
  const [animating, setAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isHard) {
      removeDifficult(item.id);
    } else {
      addDifficult(item);
      toast("Added to Difficult Words", { duration: 2000 });
    }
    setAnimating(true);
    setTimeout(() => setAnimating(false), 200);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-all duration-200 shrink-0
        ${animating ? "scale-90" : "scale-100"}
        ${
          isHard
            ? "bg-teal/10 text-teal hover:bg-teal/15 dark:bg-teal/20"
            : "bg-saffron/10 text-saffron hover:bg-saffron/15 dark:bg-saffron/20"
        }
        size-8 p-0 md:size-auto md:px-3 md:py-1.5 md:text-xs
        ${className}`}
    >
      <Flag
        className={`size-3.5 transition-all duration-200 shrink-0 ${isHard ? "fill-teal" : ""}`}
      />
      <span className="hidden md:inline whitespace-nowrap">{isHard ? "✓" : ""}</span>
    </button>
  );
}
