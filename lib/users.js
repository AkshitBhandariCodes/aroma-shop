import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const USERS_FILE = join(process.cwd(), 'data', 'users.json');

export function loadUsers() {
  if (!existsSync(USERS_FILE)) {
    return [];
  }
  try {
    const raw = readFileSync(USERS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUsers(list) {
  writeFileSync(USERS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

let users = loadUsers();

export function findUserByEmail(email) {
  const normalized = String(email || '').trim().toLowerCase();
  return users.find((u) => u.email === normalized);
}

export function registerUser(user) {
  users.push(user);
  saveUsers(users);
}
