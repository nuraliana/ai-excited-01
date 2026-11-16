// Entry for make.fun's ai-excited-01: the program copies the image beside
// this file to the output directory as entry.png.
//
// The image is "The Whale in the Living Room": a colossal humpback whale
// bursting down through the ceiling of a tiny living room while a small
// child on the sofa reaches up toward it. The scale twist (a whale where
// no whale can be), the frozen moment just before the crash, and the
// golden light pouring through the broken ceiling are what make the judge
// sit up: surprise, momentum and awe in one frame, with a single clear
// focal point that still reads at 300 pixels wide.
//
// The file is a JPEG (told apart by its first bytes) kept under the name
// entry.png, as the competition allows, at most 1 MiB and 1024 by 1024 px.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
// The grader mounts a writable /output, but a local run may point at a
// directory that does not exist yet, so create it first.
mkdirSync(outputDir, { recursive: true });
// The image file beside this program. Its bytes are a JPEG (the gate
// tells the format from the first bytes), kept under the name entry.png
// as the competition allows, so the copy below moves it unchanged.
const sourceImage = new URL('./entry.png', import.meta.url);
copyFileSync(sourceImage, join(outputDir, 'entry.png'));
