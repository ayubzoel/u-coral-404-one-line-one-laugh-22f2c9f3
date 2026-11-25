// One Line, One Laugh — make.fun program/v1 entry (Node 22, stdlib only).
// Writes exactly one funny line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default ./entry.txt). Deterministic: no Date, no random, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My therapist says I project too much, so I bought a projector \u2014 now my issues are in 4K.";

// Gate, per RULES.txt: the entry must be UTF-8 text of 1 to 200 characters
// (Unicode code points), a single line, and not only white space.
// Enforce it here so a bad line can never be written out.
const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${codePoints.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r") || LINE.trim().length === 0) {
  throw new Error("entry line must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? ".";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
