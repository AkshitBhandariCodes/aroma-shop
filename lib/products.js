import { readFileSync } from 'fs';
import { join } from 'path';

const DATA = join(process.cwd(), 'data', 'products.json');

export const products = JSON.parse(readFileSync(DATA, 'utf8'));

export function findProduct(id) {
  const pid = Number(id);
  return products.find((p) => p.id === pid) || null;
}
