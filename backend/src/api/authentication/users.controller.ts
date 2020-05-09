import {Body, Controller, Post} from '@nestjs/common';

import {ApiBearerAuth} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';

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
