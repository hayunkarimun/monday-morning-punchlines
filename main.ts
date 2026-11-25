// Monday Morning Punchlines — @hayunkarimun entry.
// Scores 6 original Monday-morning jokes against the judge's 5 criteria
// in the brief's own order (weights 5/4/3/2/1) and writes the winner to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Gate: UTF-8, 1-200 chars, exactly one line, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";

type Cand = { text: string; scores: [number, number, number, number, number] };

const WEIGHTS = [5, 4, 3, 2, 1];
// Criteria, most important first (from the brief):
// 1. Really about Monday mornings. 2. Real laugh, turn/punchline lands,
//    not just a complaint. 3. Surprise: twist is not the obvious one.
// 4. Economy of words. 5. Fresh, not a rerun of tired Monday cliches.
const CANDIDATES: Cand[] = [
  {
    text: "Monday called in sick. HR said no \u2014 apparently even Mondays can't escape Mondays.",
    scores: [5, 5, 5, 5, 5],
  },
  {
    text: "Monday morning, my smart speaker wished me a great week. I asked it to define 'great'. It's been buffering since.",
    scores: [4, 4, 4, 4, 4],
  },
  {
    text: "I tried to negotiate with Monday: I'll take the morning if it takes the meetings. Monday countered with a 7 a.m. standup.",
    scores: [5, 4, 3, 4, 3],
  },
  {
    text: "My alarm clock filed a complaint on Monday morning: it says I keep blaming it for a decision my calendar made.",
    scores: [4, 4, 4, 3, 4],
  },
  {
    text: "My Monday standup started with 'quick update' and ended with me updating my r\u00e9sum\u00e9.",
    scores: [5, 3, 3, 5, 3],
  },
  {
    text: "I set my Monday alarm and labelled it 'fresh start'. It went off labelled 'you again'.",
    scores: [5, 4, 4, 5, 4],
  },
];
// Rejected drafts (and why), kept out of the running on purpose:
// - "I hate Mondays" / coffee / Garfield / snooze-button lines: the brief
//   names tired Monday cliches as losers; a complaint is not a joke.
// - "My Monday coffee needs coffee": coffee is the single most rerun
//   Monday prop; fails criterion 5 outright.
// - "Monday again? My calendar must be broken": no turn, just a complaint.

function total(c: Cand): number {
  return c.scores.reduce((s, v, i) => s + v * WEIGHTS[i], 0);
}

const ranked = [...CANDIDATES].sort((a, b) => total(b) - total(a));
const winner = ranked[0];
const line = winner.text;

// Gate: UTF-8, 1-200 chars, one line, not only whitespace.
if (line.length < 1 || line.length > 200) throw new Error(`gate: length ${line.length}`);
if (line.includes("\n") || line.includes("\r")) throw new Error("gate: not one line");
if (!line.trim()) throw new Error("gate: only whitespace");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line);
console.log(`winner (${line.length} chars, score ${total(winner)}): ${line}`);
console.log(`runner-up: ${ranked[1].text} (score ${total(ranked[1])})`);
