import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  BookOpen,
  ScrollText,
  Library,
  Zap,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  BookMarked,
  Target,
  Settings,
  ChartLine,
} from "lucide-react";

import { toast } from "sonner";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppStateProvider, useAppState } from "../context/AppState";
import { FavoritesProvider, useFavorites } from "../context/FavoritesContext";
import { DifficultWordsProvider, useDifficultWords } from "../context/DifficultWordsContext";
import { AuthModal } from "../components/AuthModal";
import { Toaster } from "../components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../components/ui/sheet";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Urdu Alive — Learn, Rediscover, and Preserve Urdu" },
      {
        name: "description",
        content:
          "A modern platform to learn practical Urdu, revive vocabulary, explore literary words and cultural idioms.",
      },
      { name: "author", content: "Urdu Alive" },
      { property: "og:title", content: "Urdu Alive — Learn, Rediscover, and Preserve Urdu" },
      {
        property: "og:description",
        content:
          "Learn Urdu in 40 days, revive your vocabulary, and explore the cultural treasury of the Urdu language.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SharedNav() {
  const matches = useMatches();
  const isHome = matches.some((m) => m.pathname === "/");
  const { user, logOut, completedDays, activeTrack, streak, totalWordsLearned } = useAppState();
  const { difficultWords } = useDifficultWords();
  const { favorites } = useFavorites();
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const totalDays = activeTrack === "learn40" ? 40 : activeTrack === "revive" ? 30 : 0;

  const treasuryFavs = favorites.filter((f) => f.source === "treasury").length;
  const unlockedBadges = [
    streak >= 7 && { id: "streak-7", name: "7-Day Streak", emoji: "🔥" },
    streak >= 30 && { id: "streak-30", name: "30-Day Streak", emoji: "⚡" },
    totalWordsLearned >= 100 && { id: "words-100", name: "100 Words", emoji: "📚" },
    totalWordsLearned >= 250 && { id: "words-250", name: "250 Words", emoji: "🎓" },
    streak >= 3 && { id: "quiz-master", name: "Quiz Master", emoji: "🏆" },
    difficultWords.length >= 20 && {
      id: "difficult-conqueror",
      name: "Word Conqueror",
      emoji: "🧠",
    },
    treasuryFavs >= 10 && { id: "poetry-lover", name: "Poetry Lover", emoji: "❤️" },
    completedDays.length >= 5 && {
      id: "cultural-explorer",
      name: "Cultural Explorer",
      emoji: "🌙",
    },
    completedDays.length >= 40 && { id: "urdu-devotee", name: "Urdu Devotee", emoji: "👑" },
    streak >= 7 && { id: "daily-champion", name: "Daily Champion", emoji: "⭐" },
  ].filter(Boolean) as { id: string; name: string; emoji: string }[];
  const previewBadges = unlockedBadges.slice(0, 3);
  const trackName =
    activeTrack === "learn40"
      ? "Learn Urdu in 40 Days"
      : activeTrack === "revive"
        ? "Revive Your Urdu"
        : null;

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-paper/80 dark:bg-background/80 border-b border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-grid place-items-center size-8 rounded-lg bg-rose text-paper font-display font-bold text-sm shadow-md shadow-rose/25">
              ا
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Urdu <span className="italic text-rose">Alive</span>
            </span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-3 text-xs sm:text-sm font-medium">
            {!isHome && (
              <>
                <Link
                  to="/learn-40-days"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-ink/5 transition-colors text-ink/70 hover:text-ink"
                >
                  <BookOpen className="size-3.5" />
                  <span className="hidden sm:inline">Learn</span>
                </Link>
                <Link
                  to="/revive-urdu"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-ink/5 transition-colors text-ink/70 hover:text-ink"
                >
                  <Zap className="size-3.5" />
                  <span className="hidden sm:inline">Revive</span>
                </Link>
                <Link
                  to="/idioms-stories"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-ink/5 transition-colors text-ink/70 hover:text-ink"
                >
                  <ScrollText className="size-3.5" />
                  <span className="hidden sm:inline">Idioms</span>
                </Link>
                <Link
                  to="/urdu-treasury"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-ink/5 transition-colors text-ink/70 hover:text-ink"
                >
                  <Library className="size-3.5" />
                  <span className="hidden sm:inline">Treasury</span>
                </Link>
              </>
            )}
            {user ? (
              <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose/10 text-rose text-xs font-semibold hover:bg-rose/20 transition-colors">
                    <span className="size-5 rounded-full bg-rose text-paper flex items-center justify-center text-[10px] font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                    <ChevronDown className="size-3" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-[320px] p-0 bg-card border-l border-ink/5"
                >
                  <SheetTitle className="sr-only">Profile</SheetTitle>
                  <SheetDescription className="sr-only">User profile drawer</SheetDescription>

                  {/* Profile Section */}
                  <div className="px-6 pt-10 pb-6 border-b border-ink/5">
                    <div className="flex items-center gap-4">
                      <span className="size-12 rounded-full bg-rose text-paper flex items-center justify-center text-lg font-bold font-display">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="font-display text-base font-semibold">{user.name}</p>
                        <p className="text-xs text-ink/40 truncate mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Track & Progress */}
                  <div className="px-6 py-5 border-b border-ink/5 space-y-4">
                    {trackName && (
                      <div className="rounded-2xl bg-teal/5 border border-teal/10 p-3.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-teal mb-1">
                          Current Track
                        </div>
                        <p className="text-xs font-semibold mb-1.5 truncate">{trackName}</p>
                        <div className="flex items-center justify-between text-[10px] text-ink/40 mb-1.5">
                          <span>Progress</span>
                          <span>
                            {completedDays.length}/{totalDays} Days
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-ink/5">
                          <div
                            className="h-full rounded-full bg-teal transition-all"
                            style={{
                              width: `${totalDays > 0 ? (completedDays.length / totalDays) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {!trackName && (
                      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-ink/40">
                        No active track
                      </div>
                    )}
                  </div>

                  {/* Quick Navigation */}
                  <div className="px-6 py-5 border-b border-ink/5">
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose mb-3">
                      Quick Navigation
                    </div>
                    <div className="space-y-1">
                      <Link
                        to="/my-progress"
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
                      >
                        <ChartLine className="size-4" />
                        My Progress
                      </Link>
                      <Link
                        to="/my-dictionary"
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
                      >
                        <BookMarked className="size-4" />
                        My Dictionary
                      </Link>
                      <Link
                        to="/todays-mission"
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
                      >
                        <Target className="size-4" />
                        Today's Mission
                      </Link>
                      <button
                        onClick={() => {
                          toast.info("Settings — coming soon!");
                          setDrawerOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
                      >
                        <Settings className="size-4" />
                        Settings
                      </button>
                    </div>
                  </div>

                  {/* Achievements Preview */}
                  <div className="px-6 py-5 border-b border-ink/5">
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-teal mb-3">
                      Achievements ({unlockedBadges.length}/10)
                    </div>
                    {previewBadges.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {previewBadges.map((badge) => (
                          <span
                            key={badge.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal/10 text-teal text-[10px] font-semibold"
                          >
                            <span className="text-xs">{badge.emoji}</span>
                            {badge.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-ink/30 mb-3">No badges unlocked yet</p>
                    )}
                    <Link
                      to="/my-progress"
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-2 text-[10px] font-semibold text-teal hover:text-teal/80 transition-colors"
                    >
                      View All Achievements →
                    </Link>
                  </div>

                  {/* Log Out */}
                  <div className="px-6 py-4">
                    <button
                      onClick={() => {
                        logOut();
                        setDrawerOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-rose hover:bg-rose/5 transition-colors"
                    >
                      <LogOut className="size-4" />
                      Log Out
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAuthModal("login")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-ink/5 transition-colors text-ink/70 hover:text-ink text-xs font-medium"
                >
                  <LogIn className="size-3.5" />
                  <span className="hidden sm:inline">Log In</span>
                </button>
                <button
                  onClick={() => setAuthModal("signup")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose text-paper text-xs font-semibold hover:bg-rose/90 transition-colors"
                >
                  <UserPlus className="size-3.5" />
                  <span className="hidden sm:inline">Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          switchMode={() => setAuthModal(authModal === "login" ? "signup" : "login")}
        />
      )}
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppStateProvider>
        <FavoritesProvider>
          <DifficultWordsProvider>
            <SharedNav />
            <Outlet />
            <Toaster />
          </DifficultWordsProvider>
        </FavoritesProvider>
      </AppStateProvider>
    </QueryClientProvider>
  );
}
