import { Injectable, Logger } from '@nestjs/common';
import path from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService?.name);
  private readonly filePath: string;

  constructor() {
    this.filePath = path?.join(process?.cwd(), 'users.json');
  }

  async ensureFileExists(defaultContent = '[]') {
    try {
      await fs?.access(this?.filePath);
    } catch {
      this?.logger?.log(`users.json not found - creating at ${this?.filePath}`);
      await fs?.writeFile(this?.filePath, defaultContent, 'utf8');
    }
  }

  async readJson<T = any[]>(): Promise<T> {
    await this?.ensureFileExists();
    const raw = await fs?.readFile(this?.filePath, 'utf8');
    return JSON?.parse(raw) as T;
  }

  async writeJson<T = any[]>(data: T) {
    await fs?.writeFile(this?.filePath, JSON?.stringify(data, null, 2), 'utf8');
  }

  

}
