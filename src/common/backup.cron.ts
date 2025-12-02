import { Injectable } from '@nestjs/common';
import { BackupService } from './backup.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BackupCron {
  constructor(private readonly backupService: BackupService) {}

  //Runs every day in an hour
  @Cron('0 * * * * ')
  async dailyBackup() {
    await this.backupService.zipUsersFile();
  }
}
