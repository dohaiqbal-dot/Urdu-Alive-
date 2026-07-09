import { useAppState } from "@/context/AppState";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppState();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10 transition-colors cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="size-4 text-ink/70" />
      ) : (
        <Sun className="size-4 text-saffron" />
      )}
    </button>
  );
}
