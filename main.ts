// NusaData — entri "Make the best national statistics site".
// Program penyerahan (Node 22, standard library saja, tanpa network):
// menyalin app/ dan screenshots/ dari repositori ini ke direktori keluaran
// lalu menulis dossier.json memakai pustaka make.fun yang divendor.
//
// Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Program ini deterministik: dua kali jalan dengan masukan yang sama
// menulis byte yang sama ke direktori keluaran.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });

const screenshotsDir = join(outputDir, 'screenshots');
mkdirSync(screenshotsDir, { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), screenshotsDir, { recursive: true });
}

// Batas yang dipakai buildDossier mengikuti batas gate: teks dossier paling
// banyak 160 KiB, paling banyak 4 screenshot @ 256 KiB, app/ paling banyak
// 993 entri dan 16 MiB.
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
