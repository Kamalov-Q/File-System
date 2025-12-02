import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BackupService } from './common/backup.service';
import { BackupCron } from './common/backup.cron';

@Module({
  imports: [ScheduleModule.forRoot(), UsersModule],
  controllers: [],
  providers: [BackupService, BackupCron],
})
export class AppModule {}
