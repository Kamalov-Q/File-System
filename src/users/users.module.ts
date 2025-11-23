import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FileService } from 'src/common/file.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, FileService],
  exports: [UsersService],
})
export class UsersModule {}
