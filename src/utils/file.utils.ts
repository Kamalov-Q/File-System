import { promises as fs } from 'fs';
import * as path from 'path';
import { User } from 'src/users/users.service';

export const USERS_FILE_PATH = path?.join(process?.cwd(), 'users.json');

export async function ensureUsersFileExists() {
  try {
    await fs?.access(USERS_FILE_PATH);
  } catch {
    await fs?.writeFile(USERS_FILE_PATH, JSON?.stringify([], null, 2));
  }
}

export async function readUserFile(): Promise<any[]> {
  await ensureUsersFileExists();
  const data = await fs?.readFile(USERS_FILE_PATH, 'utf8');
  return JSON?.parse(data);
}

export async function writeUserFile(users: User[]) {
  await fs?.writeFile(USERS_FILE_PATH, JSON?.stringify(users, null, 2));
}
