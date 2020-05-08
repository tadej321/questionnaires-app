import {Body, Controller, Delete, Get, Param, Post, Put,} from '@nestjs/common';

import {User} from './interfaces/user.interface';
import {ApiBearerAuth} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {AuthService} from './auth.service';

@ApiBearerAuth()
@Controller('auth')
export class ProductsController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  findOne(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.findOne(createUserDto);
  }
}
