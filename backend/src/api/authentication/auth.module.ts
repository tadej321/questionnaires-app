import {APP_FILTER} from '@nestjs/core';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserSchema} from './schemas/user.schema';
import {Model} from 'mongoose';

import {HttpExceptionFilter} from '../../http-exception.filter';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService, {provide: APP_FILTER, useClass: HttpExceptionFilter}],
})
export class ProductModule {

}
