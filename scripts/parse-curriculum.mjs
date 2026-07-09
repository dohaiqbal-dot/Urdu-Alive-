import fs from "fs";

const md = fs.readFileSync(
  "C:/Users/HP/OneDrive/Desktop/Urdu Alive/urdu-bloom/src/content/urdu-40-day-curriculum.md",
  "utf-8",
);

const phases = [
  { phase: 1, title: "Foundations", dayRange: "1-10" },
  { phase: 2, title: "Survival", dayRange: "11-20" },
  { phase: 3, title: "Social", dayRange: "21-30" },
  { phase: 4, title: "Advanced", dayRange: "31-40" },
];

const lines = md.split("\n");
const days = [];
let currentDay = null;
let currentPhaseIndex = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect phase headers
  if (line.match(/^# PHASE 1/i)) currentPhaseIndex = 0;
  if (line.match(/^# PHASE 2/i)) currentPhaseIndex = 1;
  if (line.match(/^# PHASE 3/i)) currentPhaseIndex = 2;
  if (line.match(/^# PHASE 4/i)) currentPhaseIndex = 3;

  // Detect day headers: ## Day N — Title
  const dayMatch = line.match(/^## Day (\d+)\s*[—–-]\s*(.+)/);
  if (dayMatch) {
    currentDay = {
      day: parseInt(dayMatch[1]),
      title: dayMatch[2].trim(),
      phase: phases[currentPhaseIndex].title,
      words: [],
    };
    days.push(currentDay);
    continue;
  }

  // Parse vocabulary table rows
  if (currentDay && line.startsWith("|") && !line.match(/^\|\s*[-]+/)) {
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    // Skip header row
    if (cells[0] === "RU" || cells[0] === "RU ") continue;
    if (cells.length >= 2) {
      const romanUrdu = cells[0];
      const english = cells[1];
      const exampleSentence = cells[2] || "";
      // Skip empty rows
      if (romanUrdu && english) {
        currentDay.words.push({
          romanUrdu,
          english,
          exampleSentence,
        });
      }
    }
  }
}

// Build output
let id = 1;
const outputPhases = phases.map((p) => ({
  ...p,
  days: days
    .filter((d) => d.phase === p.title)
    .map((d) => ({
      ...d,
      words: d.words.map((w) => ({ id: id++, ...w })),
    })),
}));

// Filter out days with no vocabulary (assessment/review days)
const filteredPhases = outputPhases.map((p) => ({
  ...p,
  days: p.days.filter((d) => d.words.length > 0),
}));

let ts = `export interface LearnWord {
  id: number;
  romanUrdu: string;
  english: string;
  exampleSentence: string;
}

export interface LearnDay {
  day: number;
  title: string;
  phase: string;
  words: LearnWord[];
}

export interface LearnPhase {
  phase: number;
  title: string;
  dayRange: string;
  days: LearnDay[];
}

export const learn40Data: LearnPhase[] = ${JSON.stringify(filteredPhases, null, 2)};
`;

fs.writeFileSync(
  "C:/Users/HP/OneDrive/Desktop/Urdu Alive/urdu-bloom/src/content/learn40-data.ts",
  ts,
);
console.log(`Written ${id - 1} words across ${days.length} days`);
