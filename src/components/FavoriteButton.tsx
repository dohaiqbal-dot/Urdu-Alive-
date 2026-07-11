import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteButtonProps {
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

export function FavoriteButton({ item, className = "" }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFav = favorites.some((f) => f.id === item.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFav) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
      toast("Saved to your Urdu Dictionary", {
        duration: 2000,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`size-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 ${
        isFav ? "text-rose bg-rose/10" : "text-ink/30 hover:text-rose/60 hover:bg-rose/5"
      } ${className}`}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`size-4 transition-all duration-200 ${isFav ? "fill-rose scale-110" : ""}`}
      />
    </button>
  );
}
