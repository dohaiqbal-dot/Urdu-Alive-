import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, BookOpen, Library, ScrollText, Flame, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Urdu Alive — Learn, Rediscover, and Preserve Urdu" },
      {
        name: "description",
        content:
          "Learn practical Urdu in 40 days, revive your vocabulary, and explore a living treasury of literary words and cultural idioms.",
      },
      { property: "og:title", content: "Urdu Alive — Learn, Rediscover, and Preserve Urdu" },
      {
        property: "og:description",
        content:
          "A vibrant home for the Urdu language — interactive lessons, vocabulary revival, and cultural storytelling.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-saffron/30">
      <Nav />
      <Hero />
      <MissionStrip />
      <Tracks />
      <ContentTaste />
      <ProgressBand />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-paper/80 border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="inline-grid place-items-center size-9 rounded-xl bg-rose text-paper font-display font-bold text-lg shadow-md shadow-rose/25">
            ا
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Urdu <span className="italic text-rose">Alive</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/70">
          <a href="#tracks" className="hover:text-rose transition-colors">
            Learn
          </a>
          <a href="#treasury" className="hover:text-rose transition-colors">
            Treasury
          </a>
          <a href="#idioms" className="hover:text-rose transition-colors">
            Idioms
          </a>
          <a href="#about" className="hover:text-rose transition-colors">
            About
          </a>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-ink/70 hover:text-ink transition-colors cursor-pointer">
            Sign In
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper text-sm font-semibold rounded-full hover:bg-indigo-deep transition-colors cursor-pointer">
            Start Free
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* vibrant blobs */}
      <div className="absolute -top-32 -left-32 size-[28rem] rounded-full bg-saffron/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 size-[32rem] rounded-full bg-rose/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 size-72 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink/5 ring-1 ring-ink/10 mb-8">
              <span className="size-1.5 rounded-full bg-saffron animate-pulse" />
              <span className="text-xs font-medium tracking-wide text-ink/70">
                A living home for the Urdu language
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance">
              Learn Urdu.{" "}
              <span className="italic text-rose">Rediscover</span> Urdu.{" "}
              <span className="relative">
                Preserve
                <span className="absolute left-0 right-0 -bottom-2 h-3 bg-saffron/50 -z-10 rounded-full" />
              </span>{" "}
              Urdu.
            </h1>
            <p className="mt-7 text-lg md:text-xl text-ink/70 max-w-[58ch] leading-relaxed">
              A modern platform where beginners learn practical Urdu from scratch and native
              speakers reconnect with the language's literary depth and cultural soul.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 pl-5 pr-4 py-3.5 bg-rose text-paper font-semibold rounded-full shadow-lg shadow-rose/30 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer">
                <Sparkles className="size-4" />
                Start Learning Urdu
              </button>
              <button className="inline-flex items-center gap-2 pl-5 pr-4 py-3.5 bg-ink text-paper font-semibold rounded-full hover:bg-indigo-deep transition-colors cursor-pointer">
                <Flame className="size-4 text-saffron" />
                Revive Your Urdu
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
              <a
                href="#treasury"
                className="text-sm font-semibold text-ink/70 hover:text-rose border-b-2 border-saffron/40 hover:border-rose pb-0.5 transition-colors"
              >
                Explore Urdu Treasury →
              </a>
              <a
                href="#idioms"
                className="text-sm font-semibold text-ink/70 hover:text-rose border-b-2 border-teal/40 hover:border-rose pb-0.5 transition-colors"
              >
                Explore Idioms & Stories →
              </a>
            </div>
          </div>

          {/* Hero word card stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm">
              {/* back card */}
              <div className="absolute -top-6 -right-6 w-full h-full rounded-3xl bg-teal/90 rotate-6 shadow-xl" />
              <div className="absolute -bottom-5 -left-5 w-full h-full rounded-3xl bg-saffron rotate-[-4deg] shadow-xl" />

              {/* main card */}
              <div className="relative rounded-3xl bg-paper ring-1 ring-ink/10 p-8 shadow-2xl shadow-ink/10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose">
                    Word of the day
                  </span>
                  <span className="size-7 grid place-items-center rounded-full bg-saffron/20 text-saffron">
                    <Sparkles className="size-3.5" />
                  </span>
                </div>
                <div className="text-right font-urdu text-7xl text-ink leading-tight mb-6">
                  محبت
                </div>
                <div className="space-y-1">
                  <div className="font-display text-3xl italic">Muhabbat</div>
                  <div className="text-sm text-ink/60">noun · pronounced moo-hub-but</div>
                </div>
                <div className="mt-5 pt-5 border-t border-ink/5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                    Meaning
                  </div>
                  <p className="text-ink/80 leading-relaxed">
                    A deep, devoted love — the kind that lingers in poetry and quiet conversation
                    alike.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    <span className="size-6 rounded-full bg-rose ring-2 ring-paper" />
                    <span className="size-6 rounded-full bg-saffron ring-2 ring-paper" />
                    <span className="size-6 rounded-full bg-teal ring-2 ring-paper" />
                  </div>
                  <button className="text-xs font-bold uppercase tracking-wider text-rose hover:text-ink transition-colors cursor-pointer">
                    Save word →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionStrip() {
  return (
    <section id="about" className="border-y border-ink/5 bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-saffron mb-3">
            Our Mission
          </div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight">
            Urdu deserves to be{" "}
            <span className="italic text-saffron">spoken, read, and felt</span> — not just
            remembered.
          </h2>
        </div>
        <div className="md:col-span-7 grid sm:grid-cols-2 gap-5">
          {[
            { t: "Language Learning", d: "Practical lessons that build daily fluency." },
            { t: "Vocabulary Enrichment", d: "Revive words being lost to English loanwords." },
            { t: "Cultural Preservation", d: "Idioms and stories rooted in heritage." },
            { t: "Literary Appreciation", d: "Discover the poetry hidden in everyday words." },
          ].map((p) => (
            <div key={p.t} className="p-5 rounded-2xl bg-paper/5 ring-1 ring-paper/10">
              <div className="font-display text-lg mb-1">{p.t}</div>
              <p className="text-sm text-paper/60 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tracks() {
  return (
    <section id="tracks" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-rose mb-3">
              Four ways to begin
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
              Wherever you are with Urdu,{" "}
              <span className="italic text-rose">there's a door for you.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1 - Learn 40 Days - hero card */}
          <TrackCard
            className="md:col-span-7 bg-rose text-paper"
            badge="Beginner Course"
            badgeAccent="bg-paper/20 text-paper"
            urdu="آغاز"
            title="Learn Urdu in 40 Days"
            description="A practical, Duolingo-style journey from zero to confident daily conversation. Speak, understand, and connect — no grammar headaches."
            stats={[
              { k: "40", v: "Days" },
              { k: "200+", v: "Lessons" },
              { k: "1.2k", v: "Words" },
            ]}
            icon={<BookOpen className="size-5" />}
            cta="Start Day 1"
          />

          {/* Card 2 - Revive */}
          <TrackCard
            className="md:col-span-5 bg-indigo-deep text-paper"
            badge="For Speakers"
            badgeAccent="bg-saffron text-ink"
            urdu="تجدید"
            title="Revive Your Urdu"
            description="A 30-day vocabulary challenge that trades borrowed English words for the rich Urdu you already half-remember."
            stats={[
              { k: "30", v: "Days" },
              { k: "150", v: "Words" },
            ]}
            icon={<Zap className="size-5" />}
            cta="Take the Challenge"
          />

          {/* Card 3 - Treasury */}
          <TrackCard
            className="md:col-span-5 bg-teal text-paper"
            badge="Explore Freely"
            badgeAccent="bg-paper/20 text-paper"
            urdu="گنج"
            title="Urdu Treasury"
            description="A curated archive of beautiful, rare, and poetic Urdu words — browse like wandering a vocabulary garden."
            icon={<Library className="size-5" />}
            cta="Open the Treasury"
            anchor="#treasury"
          />

          {/* Card 4 - Idioms */}
          <TrackCard
            className="md:col-span-7 bg-saffron text-ink"
            badge="Culture & Heritage"
            badgeAccent="bg-ink text-paper"
            urdu="قصہ"
            title="Idioms & Stories"
            description="Discover the folklore, trade, and village life behind every iconic Urdu idiom. A museum that fits in your pocket."
            stats={[
              { k: "120+", v: "Idioms" },
              { k: "120", v: "Stories" },
            ]}
            icon={<ScrollText className="size-5" />}
            cta="Explore Stories"
            anchor="#idioms"
            invertCta
          />
        </div>
      </div>
    </section>
  );
}

function TrackCard({
  className,
  badge,
  badgeAccent,
  urdu,
  title,
  description,
  stats,
  icon,
  cta,
  anchor,
  invertCta,
}: {
  className: string;
  badge: string;
  badgeAccent: string;
  urdu: string;
  title: string;
  description: string;
  stats?: { k: string; v: string }[];
  icon: React.ReactNode;
  cta: string;
  anchor?: string;
  invertCta?: boolean;
}) {
  return (
    <a
      href={anchor ?? "#"}
      className={`group relative overflow-hidden rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[20rem] transition-all hover:-translate-y-1 hover:shadow-2xl ${className}`}
    >
      <span
        aria-hidden
        className="absolute -bottom-6 -right-2 font-urdu text-[8rem] leading-none opacity-15 select-none pointer-events-none"
      >
        {urdu}
      </span>

      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full ${badgeAccent}`}
          >
            {badge}
          </span>
          <span className="size-10 grid place-items-center rounded-full bg-current/10 backdrop-blur">
            {icon}
          </span>
        </div>
        <h3 className="font-display text-3xl md:text-4xl leading-tight mb-3 max-w-[18ch]">
          {title}
        </h3>
        <p className="text-current/80 max-w-[42ch] leading-relaxed">{description}</p>
      </div>

      <div className="relative mt-8 flex items-end justify-between gap-6">
        {stats && (
          <div className="flex gap-6">
            {stats.map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl font-semibold leading-none">{s.k}</div>
                <div className="text-[10px] uppercase tracking-widest mt-1 text-current/70">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          className={`ml-auto inline-flex items-center gap-2 text-sm font-bold ${
            invertCta ? "text-ink" : ""
          }`}
        >
          {cta}
          <span
            className={`size-9 grid place-items-center rounded-full transition-transform group-hover:translate-x-1 ${
              invertCta ? "bg-ink text-paper" : "bg-paper/20 text-current"
            }`}
          >
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </a>
  );
}

function ContentTaste() {
  return (
    <section className="py-24 px-6 bg-secondary/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-teal mb-3">
              A taste of the content
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
              Real words. <span className="italic text-rose">Real stories.</span>
            </h2>
          </div>
          <p className="text-ink/60 max-w-sm">
            A peek at the kind of treasures and folklore you'll discover inside Urdu Alive.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6" id="treasury">
          {/* Treasury card */}
          <article className="md:col-span-2 bg-paper rounded-3xl ring-1 ring-ink/5 p-8 shadow-xl shadow-ink/5 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose">
                Treasury · Word 412
              </span>
              <span className="size-8 grid place-items-center rounded-full bg-rose/10 text-rose">
                <Library className="size-4" />
              </span>
            </div>
            <div className="text-right font-urdu text-6xl text-ink leading-tight mb-6">
              دلکش
            </div>
            <div className="space-y-1 mb-6">
              <div className="font-display text-2xl italic">Dilkash</div>
              <div className="text-xs uppercase tracking-widest text-teal font-semibold">
                Heart-pulling · charming
              </div>
            </div>
            <p className="text-ink/70 leading-relaxed text-sm mt-auto pt-5 border-t border-ink/5">
              Used to describe something with an irresistible charm — a melody, a face, a quiet
              evening — that quietly tugs the heart toward it.
            </p>
          </article>

          {/* Idiom card */}
          <article
            id="idioms"
            className="md:col-span-3 bg-ink text-paper rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 size-56 rounded-full bg-saffron/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-saffron">
                  Idioms & Stories · Entry 47
                </span>
                <span className="size-8 grid place-items-center rounded-full bg-saffron/20 text-saffron">
                  <ScrollText className="size-4" />
                </span>
              </div>
              <div className="text-right font-urdu text-3xl md:text-4xl text-paper leading-loose mb-6">
                آسمان سے گرا، کھجور میں اٹکا
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-saffron mb-1.5">
                    Literal
                  </div>
                  <p className="italic text-paper/80 text-sm leading-relaxed">
                    "Fell from the sky, got stuck in a date palm."
                  </p>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-saffron mb-1.5">
                    Meaning
                  </div>
                  <p className="font-display text-lg leading-snug">
                    Escaping one trouble only to land in another.
                  </p>
                </div>
              </div>
              <div className="mt-7 pt-6 border-t border-paper/10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-saffron mb-1.5">
                  The story
                </div>
                <p className="text-sm text-paper/75 leading-relaxed">
                  Born from the rhythms of village trade: a traveler survives a sudden storm only
                  to be stranded high in a thorny date palm — safe, but unable to climb down. A
                  vivid Urdu way of saying that not every rescue is a true escape.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProgressBand() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-rose via-rose to-indigo-deep text-paper p-10 md:p-14 relative overflow-hidden">
        <div className="absolute -top-20 right-10 size-72 rounded-full bg-saffron/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 size-80 rounded-full bg-teal/25 blur-3xl" />
        <div className="relative grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-saffron mb-3">
              Your Journey
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">
              Track every word, every streak,{" "}
              <span className="italic">every small victory.</span>
            </h2>
            <p className="text-paper/75 max-w-sm">
              Progress is saved across both tracks — pick up exactly where you left off.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: "12", v: "Day Streak", a: "text-saffron" },
              { k: "240", v: "Words Learned", a: "text-paper" },
              { k: "18", v: "Idioms Explored", a: "text-paper" },
              { k: "85%", v: "Lesson Fluency", a: "text-saffron" },
            ].map((s) => (
              <div
                key={s.v}
                className="p-5 rounded-2xl bg-paper/10 ring-1 ring-paper/15 backdrop-blur"
              >
                <div className={`font-display text-4xl font-semibold ${s.a}`}>{s.k}</div>
                <div className="text-[10px] uppercase tracking-widest text-paper/70 mt-2">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/5 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <span className="inline-grid place-items-center size-9 rounded-xl bg-rose text-paper font-display font-bold text-lg shadow-md shadow-rose/25">
                ا
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">
                Urdu <span className="italic text-rose">Alive</span>
              </span>
            </Link>
            <p className="text-sm text-ink/60 leading-relaxed max-w-sm">
              Preserving, promoting, and expanding the Urdu language — for learners, for speakers,
              and for the generations still to come.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterCol
              title="Learn"
              links={["40-Day Course", "Revive Your Urdu", "Daily Words", "Pronunciation"]}
            />
            <FooterCol
              title="Explore"
              links={["Urdu Treasury", "Idioms & Stories", "Random Word", "Collections"]}
            />
            <FooterCol
              title="About"
              links={["Our Mission", "Contributors", "Contact", "Privacy"]}
            />
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-ink/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-ink/50">
          <span>© {new Date().getFullYear()} Urdu Alive. Made with care for the language.</span>
          <span className="font-urdu text-base text-rose/80">اردو زندہ باد</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 mb-4">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-ink/70 hover:text-rose transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
