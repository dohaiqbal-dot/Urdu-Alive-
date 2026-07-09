import { useAppState } from "@/context/AppState";

interface StatRingProps {
  value: number;
  label: string;
  max?: number;
  color: string;
  icon: React.ReactNode;
}

export function StatRing({ value, label, max = 100, color, icon }: StatRingProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-24">
        <svg className="size-24 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-ink/5"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-ink/40">{icon}</span>
          <span className="font-display text-xl font-bold leading-none mt-0.5">{value}</span>
        </div>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-ink/50">{label}</span>
    </div>
  );
}

export function DashboardStats() {
  const { xp, streak, completedDays } = useAppState();

  return (
    <div className="flex items-center gap-6 sm:gap-8">
      <StatRing
        value={xp}
        label="Total XP"
        max={500}
        color="var(--saffron)"
        icon={<span className="text-xs">⚡</span>}
      />
      <StatRing
        value={completedDays.length}
        label="Days Done"
        max={40}
        color="var(--rose)"
        icon={<span className="text-xs">📅</span>}
      />
      <StatRing
        value={streak}
        label="Streak"
        max={30}
        color="var(--teal)"
        icon={<span className="text-xs">🔥</span>}
      />
    </div>
  );
}
