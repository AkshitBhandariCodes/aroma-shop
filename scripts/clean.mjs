/**
 * Deep clean: node_modules, Next.js output, optional `tools/` + `assets/`, demo user file.
 *
 * Does NOT delete `public/images/` (add your raster assets there).
 * After running: reinstall with `npm install` from the project root.
 */
import { existsSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const toRemove = [
  join(root, 'node_modules'),
  join(root, '.next'),
  join(root, 'out'),
  join(root, 'tools'),
  join(root, 'assets'),
  join(root, 'data', 'users.json'),
];

for (const p of toRemove) {
  if (existsSync(p)) {
    rmSync(p, { recursive: true, force: true });
    console.log('Removed:', p);
  }
}

console.log(`
Clean finished.

Reinstall from this folder:
  npm install

Then start the app:
  npm run dev
`);
