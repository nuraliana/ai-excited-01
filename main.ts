/**
 * ai-excited-01 — "The Whale in the Living Room"
 *
 * Entry for the make.fun bounty "ai-excited-01" (AI-generated image on the
 * theme of excitement). The artwork itself lives in `entry.png` next to
 * this file; this program's only job is to place an exact copy of it into
 * the output directory the harness expects, so the submission pipeline can
 * pick the image up without depending on the repository layout.
 *
 * Usage:
 *   MAKEFUN_OUTPUT_DIR=out node main.ts
 *
 * If MAKEFUN_OUTPUT_DIR is not set, the image is written to `/output`.
 * The program uses only the Node.js standard library — no dependencies,
 * no network access, and no image processing. The copy is byte-for-byte,
 * so what the judges see is exactly the file in this repository.
 *
 * A plain copy is deliberate: re-encoding the PNG would risk changing
 * pixels, softening detail, or shifting colours. The artwork was finished
 * before this program runs, and this program must not touch a single
 * pixel of it — it only delivers the file to where the harness looks.
 */

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The artwork sits beside this script, wherever the repo is checked out.
const ENTRY_FILENAME = "entry.png";
const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, ENTRY_FILENAME);

// The harness tells us where to put the result; fall back to /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const destinationPath = join(outputDir, ENTRY_FILENAME);

if (!existsSync(sourcePath)) {
  // A missing source is a hard failure, not something to paper over:
  // writing an empty or placeholder file would submit the wrong entry.
  console.error(`Entry image not found: ${sourcePath}`);
  process.exit(1);
}

// Create the output directory (including parents) when it is missing.
mkdirSync(outputDir, { recursive: true });

// A plain file copy: the submitted image is byte-identical to entry.png.
copyFileSync(sourcePath, destinationPath);
console.log(`Wrote ${destinationPath}`);
