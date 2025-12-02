import { Injectable, Logger } from '@nestjs/common';
import path from 'path';
import * as fs from 'fs';
import archiver from 'archiver';

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  async zipUsersFile() {
    try {
      const srcFile = path.join(process.cwd(), 'users.json');

      if (!fs.existsSync(srcFile)) {
        this.logger.error('users.json does not exist!');
        return;
      }

      const backupFolder = path.join(process.cwd(), 'backups');
      if (!fs.existsSync(backupFolder)) {
        fs.mkdirSync(backupFolder);
      }

      const now = new Date();
      const date = now.toISOString().split('T')[0]; //2025-12-12

      const time = `${now.getHours()} - ${now.getMinutes()} - ${now.getSeconds()}`;

      const zipPath = path.join(
        backupFolder,
        `users-backup-${date}_${time}.zip`,
      );

      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      archive.pipe(output);
      archive.file(srcFile, { name: 'users.json' });
      await archive.finalize();

      this.logger.log(`Backup created: ${zipPath}`);
    } catch (error) {
      this.logger.error(`Error while creating ZIP backup: ${error}`);
    }
  }
}
