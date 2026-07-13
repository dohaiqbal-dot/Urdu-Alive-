import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Library,
  ScrollText,
  Zap,
  Target,
  Check,
  Lock,
} from "lucide-react";
import { useAppState } from "@/context/AppState";
import { DashboardStats } from "@/components/StatRing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Urdu Alive — Learn, Rediscover, and Preserve Urdu" },
      {
        name: "description",
        content:
          "Learn practical Urdu in 40 days, revive your vocabulary, and explore a living treasury of literary words and cultural idioms.",
      },
    ],
  }),
  component: Index,
});

const milestones = [
  { name: "Beginner", range: [1, 10] as const },
  { name: "Survival", range: [11, 20] as const },
  { name: "Social", range: [21, 30] as const },
  { name: "Fluent Foundations", range: [31, 40] as const },
];

function getMilestoneInfo(currentDay: number) {
  const milestone = milestones.find((m) => currentDay >= m.range[0] && currentDay <= m.range[1]);
  const milestoneIndex = milestone ? milestones.indexOf(milestone) : -1;
  const daysInMilestone = milestone ? milestone.range[1] - milestone.range[0] + 1 : 10;
  const daysDoneInMilestone = milestone ? currentDay - milestone.range[0] + 1 : 1;
  const progressInMilestone = Math.round((daysDoneInMilestone / daysInMilestone) * 100);
  const nextMilestone = milestones[milestoneIndex + 1];
  const daysRemaining = 40 - currentDay;
  return {
    currentMilestone: milestone || null,
    milestoneIndex,
    progressInMilestone,
    nextMilestone: nextMilestone || null,
    nextMilestoneDay: nextMilestone?.range[0] || 40,
    daysRemaining,
    currentDay,
  };
}

function Index() {
  const { activeTrack, setActiveTrack, isTrackLocked, currentDay, completedDays } = useAppState();

  const handleTrackSelect = (track: "revive" | "learn40") => {
    if (!isTrackLocked) {
      setActiveTrack(track);
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-background text-ink dark:text-foreground font-sans selection:bg-saffron/30">
      <Hero
        onTrackSelect={handleTrackSelect}
        isTrackLocked={isTrackLocked}
        activeTrack={activeTrack}
      />
      <StatsSection />
      <LearningPathSection
        currentDay={currentDay}
        completedDays={completedDays}
        activeTrack={activeTrack}
      />
      <TracksSection
        onTrackSelect={handleTrackSelect}
        isTrackLocked={isTrackLocked}
        activeTrack={activeTrack}
      />
      <Footer />
    </div>
  );
}

function Hero({
  onTrackSelect,
  isTrackLocked,
  activeTrack,
}: {
  onTrackSelect: (t: "revive" | "learn40") => void;
  isTrackLocked: boolean;
  activeTrack: "revive" | "learn40" | null;
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-32 -left-32 size-[28rem] rounded-full bg-saffron/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 size-[32rem] rounded-full bg-rose/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 size-72 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink/5 ring-1 ring-ink/10 mb-6">
            <span className="size-1.5 rounded-full bg-saffron animate-pulse" />
            <span className="text-xs font-medium tracking-wide text-ink/70">
              A living home for the Urdu language
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance">
            Learn Urdu. <span className="italic text-rose">Rediscover</span> Urdu.{" "}
            <span className="relative">
              Preserve
              <span className="absolute left-0 right-0 -bottom-2 h-3 bg-saffron/50 -z-10 rounded-full" />
            </span>{" "}
            Urdu.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/70 max-w-[58ch] leading-relaxed">
            A modern platform where beginners learn practical Urdu from scratch and native speakers
            reconnect with the language's literary depth and cultural soul.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {hydrated ? (
              <Link
                to="/learn-40-days"
                onClick={() => onTrackSelect("learn40")}
                className="inline-flex items-center gap-2 pl-5 pr-4 py-3.5 bg-rose text-paper font-semibold rounded-full shadow-lg shadow-rose/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="size-4" />
                Start Learning Urdu
              </Link>
            ) : null}

            <Link
              to="/todays-mission"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-indigo-deep text-paper font-semibold rounded-full shadow-lg shadow-indigo-deep/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Target className="size-4" />
              Today's Mission
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <Link
              to="/urdu-treasury"
              className="text-sm font-semibold text-ink/70 hover:text-rose border-b-2 border-saffron/40 hover:border-rose pb-0.5 transition-colors"
            >
              Explore Urdu Treasury →
            </Link>
            <Link
              to="/idioms-stories"
              className="text-sm font-semibold text-ink/70 hover:text-rose border-b-2 border-teal/40 hover:border-rose pb-0.5 transition-colors"
            >
              Explore Idioms & Stories →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-12 px-6 border-y border-ink/5 bg-ink text-paper">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8">
        <div className="text-center sm:text-left">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-saffron mb-2">
            Your Journey
          </div>
          <h2 className="font-display text-2xl md:text-3xl leading-tight">
            Track every word, every streak, <span className="italic">every small victory.</span>
          </h2>
        </div>
        <div className="flex gap-6 sm:gap-8 [&>div]:text-paper">
          <DashboardStats />
        </div>
      </div>
    </section>
  );
}

function LearningPathSection({
  currentDay,
  completedDays,
  activeTrack,
}: {
  currentDay: number;
  completedDays: number[];
  activeTrack: "revive" | "learn40" | null;
}) {
  const info = getMilestoneInfo(currentDay);
  const hasTrack = activeTrack !== null;

  return (
    <section className="py-16 px-6 bg-ink/3">
      <div className="max-w-5xl mx-auto">
        <div className="text-center sm:text-left mb-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-rose mb-3">
            Your Journey
          </div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
            Your Urdu <span className="italic text-rose">Journey</span>
          </h2>
          <p className="mt-2 text-sm text-ink/50 max-w-lg">
            Track your progression through 40 days of learning Urdu.
          </p>
        </div>

        {!hasTrack ? (
          <div className="rounded-3xl bg-card border border-ink/5 p-8 text-center">
            <div className="size-14 mx-auto mb-4 rounded-full bg-ink/5 flex items-center justify-center">
              <Lock className="size-6 text-ink/30" />
            </div>
            <p className="font-display text-lg text-ink/60 mb-1">
              Start a learning track to unlock your journey
            </p>
            <p className="text-sm text-ink/40">
              Choose Learn Urdu in 40 Days or Revive Your Urdu above to begin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Roadmap */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-card border border-ink/5 p-6 md:p-8">
                <div className="flex items-center justify-between">
                  {milestones.map((m, i) => {
                    const isCompleted = currentDay > m.range[1];
                    const isActive = currentDay >= m.range[0] && currentDay <= m.range[1];
                    const isLocked = currentDay < m.range[0];
                    return (
                      <div key={m.name} className="flex flex-col items-center gap-2 flex-1">
                        <div className="relative">
                          <div
                            className={`size-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isCompleted
                                ? "bg-teal text-paper"
                                : isActive
                                  ? "bg-rose text-paper animate-pulse shadow-lg shadow-rose/30"
                                  : "bg-ink/5 text-ink/30 border-2 border-ink/10"
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="size-5" />
                            ) : isActive ? (
                              <span className="font-display font-bold text-sm">{currentDay}</span>
                            ) : (
                              <Lock className="size-4" />
                            )}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider text-center ${
                            isCompleted ? "text-teal" : isActive ? "text-rose" : "text-ink/30"
                          }`}
                        >
                          {m.name}
                        </span>
                        <span className="text-[9px] text-ink/30 font-mono">
                          Days {m.range[0]}-{m.range[1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Connecting line */}
                <div className="relative mt-2">
                  <div className="absolute top-0 left-[12.5%] right-[12.5%] h-0.5 bg-ink/5">
                    <div
                      className="h-full bg-teal transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (currentDay / 40) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl bg-card border border-ink/5 p-6 md:p-8">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose mb-4">
                  Progress Overview
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-ink/50">Stage</span>
                    <span className="text-sm font-semibold font-display">
                      {info.currentMilestone?.name || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-ink/50">Current Day</span>
                    <span className="text-sm font-semibold font-display">{currentDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-ink/50">Days Remaining</span>
                    <span className="text-sm font-semibold font-display text-rose">
                      {info.daysRemaining}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-ink/50">Next Milestone</span>
                    <span className="text-sm font-semibold font-display">
                      {info.nextMilestone ? `Day ${info.nextMilestone.range[0]}` : "Complete!"}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-ink/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-ink/50">Progress to Next Milestone</span>
                      <span className="text-xs font-bold text-teal">
                        {info.currentMilestone ? `${info.progressInMilestone}%` : "—"}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-ink/5">
                      <div
                        className="h-full rounded-full bg-teal transition-all duration-500"
                        style={{ width: `${info.progressInMilestone}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TracksSection({
  onTrackSelect,
  isTrackLocked,
  activeTrack,
}: {
  onTrackSelect: (t: "revive" | "learn40") => void;
  isTrackLocked: boolean;
  activeTrack: "revive" | "learn40" | null;
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-rose mb-3">
            Four ways to begin
          </div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
            Wherever you are with Urdu,{" "}
            <span className="italic text-rose">there's a door for you.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            to="/learn-40-days"
            onClick={() => onTrackSelect("learn40")}
            className="group relative overflow-hidden rounded-3xl bg-rose text-paper p-8 md:p-10 flex flex-col justify-between min-h-[18rem] transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <span
              aria-hidden
              className="absolute -bottom-6 -right-2 font-urdu text-[8rem] leading-none opacity-15 select-none pointer-events-none"
            >
              آغاز
            </span>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-paper/20 text-paper">
                  Beginner Course
                </span>
                <span className="size-10 grid place-items-center rounded-full bg-current/10 backdrop-blur">
                  <BookOpen className="size-5" />
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2">
                Learn Urdu in 40 Days
              </h3>
              <p className="text-paper/80 max-w-[42ch] leading-relaxed text-sm">
                A practical journey from zero to confident daily conversation with interactive
                lessons and quizzes.
              </p>
            </div>
            <div className="relative mt-6 flex items-end justify-between">
              <div className="flex gap-5">
                {[
                  { k: "40", v: "Days" },
                  { k: "200+", v: "Lessons" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-xl font-semibold leading-none">{s.k}</div>
                    <div className="text-[10px] uppercase tracking-widest mt-1 text-paper/70">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-auto inline-flex items-center gap-2 text-sm font-bold">
                Start Day 1
                <span className="size-8 grid place-items-center rounded-full bg-paper/20 text-current group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
            {activeTrack === "learn40" && (
              <div className="absolute top-4 left-4 px-2 py-0.5 rounded-full bg-paper/30 text-[10px] font-bold uppercase tracking-wider">
                Active
              </div>
            )}
          </Link>

          <Link
            to="/revive-urdu"
            onClick={() => onTrackSelect("revive")}
            className="group relative overflow-hidden rounded-3xl bg-indigo-deep text-paper p-8 md:p-10 flex flex-col justify-between min-h-[18rem] transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <span
              aria-hidden
              className="absolute -bottom-6 -right-2 font-urdu text-[8rem] leading-none opacity-15 select-none pointer-events-none"
            >
              تجدید
            </span>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-saffron text-ink">
                  For Speakers
                </span>
                <span className="size-10 grid place-items-center rounded-full bg-current/10 backdrop-blur">
                  <Zap className="size-5" />
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2">
                Revive Your Urdu
              </h3>
              <p className="text-paper/80 max-w-[42ch] leading-relaxed text-sm">
                A 30-day vocabulary challenge that trades borrowed English words for rich Urdu
                alternatives.
              </p>
            </div>
            <div className="relative mt-6 flex items-end justify-between">
              <div className="flex gap-5">
                {[
                  { k: "30", v: "Days" },
                  { k: "150", v: "Words" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-xl font-semibold leading-none">{s.k}</div>
                    <div className="text-[10px] uppercase tracking-widest mt-1 text-paper/70">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-auto inline-flex items-center gap-2 text-sm font-bold">
                Take the Challenge
                <span className="size-8 grid place-items-center rounded-full bg-paper/20 text-current group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
            {activeTrack === "revive" && (
              <div className="absolute top-4 left-4 px-2 py-0.5 rounded-full bg-paper/30 text-[10px] font-bold uppercase tracking-wider">
                Active
              </div>
            )}
          </Link>

          <Link
            to="/urdu-treasury"
            className="group relative overflow-hidden rounded-3xl bg-teal text-paper p-8 md:p-10 flex flex-col justify-between min-h-[14rem] transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <span
              aria-hidden
              className="absolute -bottom-6 -right-2 font-urdu text-[8rem] leading-none opacity-15 select-none pointer-events-none"
            >
              گنج
            </span>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-paper/20 text-paper">
                  Explore Freely
                </span>
                <span className="size-10 grid place-items-center rounded-full bg-current/10 backdrop-blur">
                  <Library className="size-5" />
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2">
                Urdu Treasury
              </h3>
              <p className="text-paper/80 max-w-[42ch] leading-relaxed text-sm">
                A curated archive of beautiful, rare, and poetic Urdu words — browse like wandering
                a vocabulary garden.
              </p>
            </div>
            <div className="relative mt-6 flex items-end justify-between">
              <span className="text-sm font-bold">Open the Treasury</span>
              <span className="size-8 grid place-items-center rounded-full bg-paper/20 text-current group-hover:translate-x-1 transition-transform">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>

          <Link
            to="/idioms-stories"
            className="group relative overflow-hidden rounded-3xl bg-saffron text-ink p-8 md:p-10 flex flex-col justify-between min-h-[14rem] transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <span
              aria-hidden
              className="absolute -bottom-6 -right-2 font-urdu text-[8rem] leading-none opacity-15 select-none pointer-events-none"
            >
              قصہ
            </span>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-ink text-paper">
                  Culture & Heritage
                </span>
                <span className="size-10 grid place-items-center rounded-full bg-current/10 backdrop-blur">
                  <ScrollText className="size-5" />
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2">
                Idioms & Stories
              </h3>
              <p className="text-ink/80 max-w-[42ch] leading-relaxed text-sm">
                Discover the folklore, trade, and village life behind every iconic Urdu idiom. A
                museum in your pocket.
              </p>
            </div>
            <div className="relative mt-6 flex items-end justify-between">
              <span className="text-sm font-bold">Explore Stories</span>
              <span className="size-8 grid place-items-center rounded-full bg-ink text-paper group-hover:translate-x-1 transition-transform">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/5 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-ink/50">
        <span>© {new Date().getFullYear()} Urdu Alive. Made with care for the language.</span>
        <span className="font-urdu text-base text-rose/80">اردو زندہ باد</span>
      </div>
    </footer>
  );
}
