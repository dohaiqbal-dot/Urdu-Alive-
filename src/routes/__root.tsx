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
} from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppStateProvider, useAppState } from "../context/AppState";
import { AuthModal } from "../components/AuthModal";

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
  const { user, logOut } = useAppState();
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-paper/80 dark:bg-background/80 border-b border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-grid place-items-center size-8 rounded-lg bg-rose text-paper font-display font-bold text-sm shadow-md shadow-rose/25">
              ا
            </span>
            <span className="font-display text-lg font-semibold tracking-tight hidden sm:inline">
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
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose/10 text-rose text-xs font-semibold hover:bg-rose/20 transition-colors"
                >
                  <span className="size-5 rounded-full bg-rose text-paper flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                  <ChevronDown className="size-3" />
                </button>
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-ink/10 rounded-xl shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-ink/5">
                        <p className="text-xs font-semibold truncate">{user.name}</p>
                        <p className="text-[10px] text-ink/40 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose hover:bg-ink/5 transition-colors"
                      >
                        <LogOut className="size-3.5" />
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
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
        <SharedNav />
        <Outlet />
      </AppStateProvider>
    </QueryClientProvider>
  );
}
