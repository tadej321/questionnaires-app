import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

import {User} from './interfaces/user.interface';
import {ApiBearerAuth} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';
import {HttpResponse} from '@angular/common/http';

@ApiBearerAuth()
@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  findOne(@Body() createUserDto: CreateUserDto): Promise<{token: string, isAdmin: boolean}> {
    return this.userService.findOne(createUserDto);
  }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.userService.create(createUserDto);
  }
}
