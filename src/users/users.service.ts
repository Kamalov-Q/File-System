import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { FileService } from 'src/common/file.service';

export interface User {
  id: number;
  name: string;
  age: number;
}

export interface ResponseReturning {
  message: string;
  data: User | User[];
  success: boolean;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private readonly fileService: FileService) {}

  private async load() {
    this.users = (await this?.fileService?.readJson<User[]>()) || [];
  }

  private async persist() {
    await this?.fileService?.writeJson(this?.users);
  }

  async getUserById(id: number): Promise<ResponseReturning> {
    await this?.load();

    const foundUser = this.users?.find((u) => u?.id === id);

    if (!foundUser)
      throw new NotFoundException(`User with id ${id} not found !`);

    return {
      message: 'Retreieved user successfully',
      data: foundUser,
      success: true,
    };
  }

  async getAllUsers(): Promise<ResponseReturning> {
    await this.load();

    if (!this.users?.length) throw new NotFoundException();

    const users = this?.users;

    return {
      message: 'Retrieved users successfully !',
      data: users,
      success: true,
    };
  }

  async createUser(
    @Body() createUser: CreateUserDto,
  ): Promise<ResponseReturning> {
    await this.load();

    const id = Math?.floor(Math?.random() * 1000);
    const { name } = createUser;

    const unique = this?.users?.find((u) => u?.name === name);
    if (unique)
      throw new ConflictException(`User with this name (${name}) exists`);

    const newUser = {
      ...createUser,
      id,
    };

    this?.users?.push(newUser);
    await this.persist();

    return {
      message: 'User successfully created !',
      data: newUser,
      success: true,
    };
  }

  async updateUser(
    @Body() updUser: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseReturning> {
    await this.load();

    const { name } = updUser;
    const idx = this?.users?.findIndex((u) => u?.id === id);

    if (idx === -1)
      throw new NotFoundException(`User with this name (${name}) not found!`);

    const updatedUser = {
      ...this?.users[idx],
      ...updUser,
    };

    this.users[idx] = updatedUser;
    await this.persist();

    return {
      message: 'User successfully updated !',
      data: updatedUser,
      success: true,
    };
  }

  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseReturning> {
    await this.load();

    const idx = this?.users?.findIndex((u) => u?.id === id);

    if (!idx)
      throw new NotFoundException(`User with this id (${id}) not found`);

    const deletedUser = this?.users[idx];

    this?.users?.splice(idx, 1);

    await this.persist();

    if (!deletedUser)
      throw new BadRequestException(`Error while deleting user!`);

    return {
      message: 'User successfully deleted!',
      data: deletedUser,
      success: true,
    };
  }
}
