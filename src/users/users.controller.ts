import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { type ResponseReturning, UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<ResponseReturning> {
    return this?.usersService?.getAllUsers();
  }

  @Get(':id')
  getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseReturning> {
    return this?.usersService?.getUserById(id);
  }

  @Post()
  createUser(@Body() createU: CreateUserDto): Promise<ResponseReturning> {
    return this?.usersService?.createUser(createU);
  }

  @Patch(':id')
  updateUser(
    @Body() updUser: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseReturning> {
    return this?.usersService?.updateUser(updUser, id);
  }

  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseReturning> {
    return this?.usersService?.deleteUser(id);
  }
}
