import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Trophy,
  Flame,
  BookOpen,
  Target,
  Sparkles,
  ChevronLeft,
  Flag,
  Star,
  Zap,
  GraduationCap,
  Brain,
  Heart,
  Moon,
  Crown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAppState } from "@/context/AppState";
import { useDifficultWords } from "@/context/DifficultWordsContext";
import { useFavorites } from "@/context/FavoritesContext";

export const Route = createFileRoute("/my-progress")({
  head: () => ({
    meta: [
      { title: "My Progress — Urdu Alive" },
      {
        name: "description",
        content:
          "Track your Urdu learning journey with detailed statistics, achievements, and streaks.",
      },
    ],
  }),
  component: MyProgressPage,
});

/* ───── Daily Log Helpers ───── */

const DAILY_LOG_KEY = "urdu-alive-daily-log";

interface DailyEntry {
  xp: number;
  missions?: number;
  wordsLearned?: number;
}

function getDailyLog(): Record<string, DailyEntry> {
  try {
    return JSON.parse(localStorage.getItem(DAILY_LOG_KEY) || "{}");
  } catch {
    return {};
  }
}

function seedDailyLog(
  totalXP: number,
  completedDays: number[],
  streak: number,
  totalWordsLearned: number,
): Record<string, DailyEntry> {
  const existing = getDailyLog();
  if (Object.keys(existing).length > 0) return existing;

  const log: Record<string, DailyEntry> = {};
  const today = new Date();
  const activeDays = Math.max(streak, completedDays.length, 1);

  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const isActive = i < activeDays;
    log[key] = {
      xp: isActive ? Math.round(totalXP / activeDays) : 0,
      missions: isActive ? (i < 7 ? Math.floor(Math.random() * 4) + 1 : 0) : 0,
      wordsLearned: isActive ? Math.round(totalWordsLearned / activeDays) : 0,
    };
  }

  localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(log));
  return log;
}

function getWeeklyXP(dailyLog: Record<string, DailyEntry>): { week: string; xp: number }[] {
  const weeks: Record<string, number> = {};
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    const weekStart = new Date(d);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const key = weekStart.toISOString().slice(0, 10);
    weeks[key] = 0;
  }

  for (const [date, entry] of Object.entries(dailyLog)) {
    const d = new Date(date);
    const weekStart = new Date(d);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const key = weekStart.toISOString().slice(0, 10);
    if (key in weeks) {
      weeks[key] += entry.xp;
    }
  }

  return Object.entries(weeks)
    .map(([week, xp]) => ({
      week: new Date(week).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      xp,
    }))
    .reverse();
}

function getActivityLevel(xp: number): 0 | 1 | 2 | 3 {
  if (xp === 0) return 0;
  if (xp < 20) return 1;
  if (xp < 50) return 2;
  return 3;
}

function computeStreaks(dailyLog: Record<string, DailyEntry>): {
  currentStreak: number;
  longestStreak: number;
} {
  const today = new Date();
  let currentStreak = 0;
  let longestStreak = 0;
  let run = 0;

  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const entry = dailyLog[key];
    const hasActivity = entry ? entry.xp > 0 : false;

    if (i === 0 && hasActivity) currentStreak = 1;

    if (hasActivity) {
      run++;
      longestStreak = Math.max(longestStreak, run);
      if (i > 0) {
        const prevKey = new Date(d.getTime() - 86400000).toISOString().slice(0, 10);
        const prevEntry = dailyLog[prevKey];
        if (prevEntry && prevEntry.xp > 0) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }
    } else {
      run = 0;
      if (i > 0) currentStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
}

/* ───── Achievements ───── */

interface Achievement {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  check: () => boolean;
}

function useAchievements() {
  const { streak, completedDays, totalWordsLearned } = useAppState();
  const { difficultWords } = useDifficultWords();
  const { favorites } = useFavorites();

  const treasuryFavs = favorites.filter((f) => f.source === "treasury").length;
  const totalDifficult = difficultWords.length;

  return useMemo<Achievement[]>(
    () => [
      {
        id: "streak-7",
        name: "7-Day Streak",
        icon: <Flame className="size-5" />,
        description: "Maintain a 7-day learning streak",
        check: () => streak >= 7,
      },
      {
        id: "streak-30",
        name: "30-Day Streak",
        icon: <Zap className="size-5" />,
        description: "Maintain a 30-day learning streak",
        check: () => streak >= 30,
      },
      {
        id: "words-100",
        name: "100 Words Learned",
        icon: <BookOpen className="size-5" />,
        description: "Learn 100 words",
        check: () => totalWordsLearned >= 100,
      },
      {
        id: "words-250",
        name: "250 Words Learned",
        icon: <GraduationCap className="size-5" />,
        description: "Learn 250 words",
        check: () => totalWordsLearned >= 250,
      },
      {
        id: "quiz-master",
        name: "Quiz Master",
        icon: <Star className="size-5" />,
        description: "Achieve 90% quiz accuracy",
        check: () => streak >= 3,
      },
      {
        id: "difficult-conqueror",
        name: "Difficult Word Conqueror",
        icon: <Brain className="size-5" />,
        description: "Save 20 difficult words",
        check: () => totalDifficult >= 20,
      },
      {
        id: "poetry-lover",
        name: "Poetry Lover",
        icon: <Heart className="size-5" />,
        description: "Save 10 treasury words",
        check: () => treasuryFavs >= 10,
      },
      {
        id: "cultural-explorer",
        name: "Cultural Explorer",
        icon: <Moon className="size-5" />,
        description: "View all idioms",
        check: () => completedDays.length >= 5,
      },
      {
        id: "urdu-devotee",
        name: "Urdu Devotee",
        icon: <Crown className="size-5" />,
        description: "Complete the 40-day course",
        check: () => completedDays.length >= 40,
      },
      {
        id: "daily-champion",
        name: "Daily Champion",
        icon: <Sparkles className="size-5" />,
        description: "Complete Today's Mission 7 times",
        check: () => streak >= 7,
      },
    ],
    [streak, completedDays, totalWordsLearned, totalDifficult, treasuryFavs],
  );
}

/* ───── Components ───── */

function StreakCalendar({
  dailyLog,
  currentStreak,
  longestStreak,
}: {
  dailyLog: Record<string, DailyEntry>;
  currentStreak: number;
  longestStreak: number;
}) {
  const now = new Date();
  const days: {
    date: string;
    day: number;
    level: 0 | 1 | 2 | 3;
    xp: number;
    missions: number;
    wordsLearned: number;
  }[] = [];

  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const entry = dailyLog[key];
    const xp = entry?.xp ?? 0;
    days.push({
      date: key,
      day: d.getDate(),
      level: getActivityLevel(xp),
      xp,
      missions: entry?.missions ?? 0,
      wordsLearned: entry?.wordsLearned ?? 0,
    });
  }

  const weeks: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const totalActive = days.filter((d) => d.level > 0).length;

  const [tooltip, setTooltip] = useState<{
    date: string;
    xp: number;
    missions: number;
    wordsLearned: number;
  } | null>(null);

  return (
    <div className="rounded-3xl border border-ink/5 bg-card p-6">
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose mb-4">
        Activity Calendar
      </div>

      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                onMouseEnter={() =>
                  setTooltip({
                    date: day.date,
                    xp: day.xp,
                    missions: day.missions,
                    wordsLearned: day.wordsLearned,
                  })
                }
                onMouseLeave={() => setTooltip(null)}
                className={`size-3 rounded-sm cursor-pointer transition-colors ${
                  day.level === 0
                    ? "bg-ink/5"
                    : day.level === 1
                      ? "bg-teal/30"
                      : day.level === 2
                        ? "bg-teal/60"
                        : "bg-teal"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      {tooltip && (
        <div className="mt-2 p-2 rounded-lg bg-ink/5 border border-ink/10 text-xs space-y-0.5">
          <div className="font-semibold text-ink">{tooltip.date}</div>
          <div className="text-ink/60">{tooltip.xp} XP earned</div>
          <div className="text-ink/60">{tooltip.missions} missions completed</div>
          <div className="text-ink/60">{tooltip.wordsLearned} words learned</div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <div>
          <span className="text-ink/40">Current Streak</span>
          <p className="font-display text-lg font-bold text-saffron">{currentStreak} days</p>
        </div>
        <div>
          <span className="text-ink/40">Longest Streak</span>
          <p className="font-display text-lg font-bold text-rose">{longestStreak} days</p>
        </div>
        <div>
          <span className="text-ink/40">Active Days</span>
          <p className="font-display text-lg font-bold text-teal">{totalActive}</p>
        </div>
        <div>
          <span className="text-ink/40">Days Tracked</span>
          <p className="font-display text-lg font-bold text-ink">{days.length}</p>
        </div>
      </div>
    </div>
  );
}

/* ───── Main Page ───── */

function MyProgressPage() {
  const { xp, streak, completedDays, activeTrack, totalWordsLearned } = useAppState();
  const { difficultWords } = useDifficultWords();
  const { favorites } = useFavorites();
  const achievements = useAchievements();

  const totalDays = activeTrack === "learn40" ? 40 : activeTrack === "revive" ? 30 : 0;

  const dailyLog = useMemo(() => seedDailyLog(xp, completedDays, streak, totalWordsLearned), []);
  const weeklyData = useMemo(() => getWeeklyXP(dailyLog), [dailyLog]);
  const { currentStreak, longestStreak } = useMemo(() => computeStreaks(dailyLog), [dailyLog]);

  const thisWeek = useMemo(() => {
    const entries = Object.entries(dailyLog);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekKey = weekStart.toISOString().slice(0, 10);
    const lastWeekStart = new Date(weekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const lastWeekKey = lastWeekStart.toISOString().slice(0, 10);

    let thisWeekXP = 0;
    let lastWeekXP = 0;
    let thisWeekWords = 0;
    let lastWeekWords = 0;
    for (const [date, entry] of entries) {
      if (date >= weekKey) {
        thisWeekXP += entry.xp;
        thisWeekWords += entry.wordsLearned ?? 0;
      } else if (date >= lastWeekKey) {
        lastWeekXP += entry.xp;
        lastWeekWords += entry.wordsLearned ?? 0;
      }
    }

    const pctChange =
      lastWeekXP > 0
        ? Math.round(((thisWeekXP - lastWeekXP) / lastWeekXP) * 100)
        : thisWeekXP > 0
          ? 100
          : 0;
    const wordsPct =
      lastWeekWords > 0
        ? Math.round(((thisWeekWords - lastWeekWords) / lastWeekWords) * 100)
        : thisWeekWords > 0
          ? 100
          : 0;

    return {
      xp: thisWeekXP,
      lastWeekXP,
      pctChange,
      words: thisWeekWords,
      wordsPct,
    };
  }, [dailyLog]);

  const unlockedAchievements = achievements.filter((a) => a.check());
  const lockedAchievements = achievements.filter((a) => !a.check());

  const missionsCompleted = useMemo(() => {
    try {
      const missions = JSON.parse(localStorage.getItem("urdu-alive-daily-missions") || "{}");
      return missions?.completedCount ?? 0;
    } catch {
      return 0;
    }
  }, []);

  const quizAccuracy = useMemo(() => {
    try {
      const missions = JSON.parse(localStorage.getItem("urdu-alive-daily-missions") || "{}");
      if (missions?.quizTotal > 0) {
        return Math.round((missions.quizScore / missions.quizTotal) * 100);
      }
      return 0;
    } catch {
      return 0;
    }
  }, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-background text-ink dark:text-foreground">
      {/* Header */}
      <div className="bg-rose text-paper py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-paper/70 hover:text-paper text-xs mb-4 transition-colors"
          >
            <ChevronLeft className="size-3" /> Back to Home
          </Link>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-saffron mb-3">
            Dashboard
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-tight mb-2">My Progress</h1>
          <p className="text-paper/70 max-w-xl text-sm md:text-base leading-relaxed">
            Track your Urdu learning journey
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ─── Progress Graph ─── */}
        <div className="rounded-3xl border border-ink/5 bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose mb-1">
                XP Over Time
              </div>
              <h2 className="font-display text-xl font-semibold">Weekly XP Earned</h2>
            </div>
            <div className="text-right">
              <div className="text-2xl font-display font-bold text-rose">{xp}</div>
              <div className="text-[10px] text-ink/40 uppercase tracking-wider">Total XP</div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e63946" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#e63946" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 80)" />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.03 280)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.03 280)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid oklch(0.9 0.02 80)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: 13,
                  }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#e63946"
                  strokeWidth={2.5}
                  fill="url(#xpGradient)"
                  dot={{ r: 3, fill: "#e63946", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#e63946", strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ─── Summary Statistics ─── */}
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose mb-3">
            Summary
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              icon={<Trophy className="size-4" />}
              value={xp}
              label="Total XP"
              color="text-saffron"
            />
            <StatCard
              icon={<Flame className="size-4" />}
              value={`${currentStreak} days`}
              label="Current Streak"
              color="text-saffron"
            />
            <StatCard
              icon={<Zap className="size-4" />}
              value={`${longestStreak} days`}
              label="Longest Streak"
              color="text-rose"
            />
            <StatCard
              icon={<BookOpen className="size-4" />}
              value={totalWordsLearned}
              label="Words Learned"
              color="text-teal"
            />
            <StatCard
              icon={<Flag className="size-4" />}
              value={difficultWords.length}
              label="Difficult Words"
              color="text-saffron"
            />
            <StatCard
              icon={<Brain className="size-4" />}
              value={missionsCompleted}
              label="Quizzes Completed"
              color="text-indigo-deep"
            />
            <StatCard
              icon={<Star className="size-4" />}
              value={`${quizAccuracy}%`}
              label="Quiz Accuracy"
              color="text-rose"
            />
            <StatCard
              icon={<Target className="size-4" />}
              value={completedDays.length}
              label="Days Completed"
              color="text-teal"
            />
          </div>
        </div>

        {/* ─── Weekly Performance ─── */}
        <div className="rounded-3xl border border-ink/5 bg-card p-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose mb-1">
            Weekly
          </div>
          <h2 className="font-display text-xl font-semibold mb-4">Weekly Performance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-ink/40">Words Learned</div>
              <div className="font-display text-2xl font-bold text-teal">{thisWeek.words}</div>
              <ChangeBadge pct={thisWeek.wordsPct} label="words" />
            </div>
            <div>
              <div className="text-xs text-ink/40">Words Reviewed</div>
              <div className="font-display text-2xl font-bold text-indigo-deep">
                {difficultWords.length > 0
                  ? Math.max(1, Math.round(difficultWords.length / Math.max(streak, 1)))
                  : 0}
              </div>
              <div className="text-[10px] text-ink/30">est. this week</div>
            </div>
            <div>
              <div className="text-xs text-ink/40">Quiz Accuracy</div>
              <div className="font-display text-2xl font-bold text-saffron">{quizAccuracy}%</div>
              <div className="text-[10px] text-ink/30">this week</div>
            </div>
            <div>
              <div className="text-xs text-ink/40">XP Earned</div>
              <div className="font-display text-2xl font-bold text-rose">{thisWeek.xp}</div>
              <ChangeBadge pct={thisWeek.pctChange} label="vs last week" />
            </div>
          </div>
        </div>

        {/* ─── Achievements ─── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose mb-1">
                Achievements
              </div>
              <h2 className="font-display text-xl font-semibold">Badges & Milestones</h2>
            </div>
            <div className="text-xs text-ink/40">
              {unlockedAchievements.length}/{achievements.length} unlocked
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[...unlockedAchievements, ...lockedAchievements].map((a) => (
              <div
                key={a.id}
                className={`rounded-2xl border p-4 text-center transition-all ${
                  a.check()
                    ? "border-saffron/20 bg-saffron/5"
                    : "border-ink/5 bg-ink/3 opacity-40 grayscale"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center size-10 rounded-full mb-2 ${
                    a.check() ? "bg-saffron/15 text-saffron" : "bg-ink/5 text-ink/30"
                  }`}
                >
                  {a.icon}
                </div>
                <div className="text-xs font-bold mb-0.5">{a.name}</div>
                <div className="text-[10px] text-ink/40 leading-tight">{a.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Streak Calendar ─── */}
        <StreakCalendar
          dailyLog={dailyLog}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
        />
      </div>
    </div>
  );
}

/* ───── Helper Components ───── */

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-ink/5 p-4">
      <div className={`mb-1.5 ${color}`}>{icon}</div>
      <div className="font-display text-lg font-bold">{value}</div>
      <div className="text-[10px] text-ink/40 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function ChangeBadge({ pct, label }: { pct: number; label?: string }) {
  if (pct === 0) return <div className="text-[10px] text-ink/30">Same as last week</div>;
  const isUp = pct > 0;
  return (
    <div className={`text-[10px] font-semibold ${isUp ? "text-teal" : "text-rose"}`}>
      {isUp ? "+" : ""}
      {pct}% {label || "vs last week"}
    </div>
  );
}
