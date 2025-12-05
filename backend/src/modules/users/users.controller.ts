import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsEmail, IsString, MinLength } from 'class-validator';

class CreateUserDto {
  @IsString()
  @MinLength(2)
  name!: string;
  @IsEmail()
  email!: string;
  @IsString()
  @MinLength(8)
  password!: string;
}

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.users.createUser(dto);
  }

  @Get('me')
  me() {
    return { ok: true };
  }
}
