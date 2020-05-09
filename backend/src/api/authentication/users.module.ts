import {APP_FILTER} from '@nestjs/core';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersController} from './users.controller';
import {UserSchema} from './schemas/user.schema';
import config from '../../config/keys';
import {HttpExceptionFilter} from '../../http-exception.filter';
import {UsersService} from './users.service';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule.register({
      secret: config.secret,
      signOptions: {expiresIn: '1h'},
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {

}
