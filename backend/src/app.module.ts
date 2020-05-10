import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import config from './config/keys';
import {UsersModule} from './api/authentication/users.module';
import {QuestionnaireModule} from './api/questionnaire/questionnaire.module';
import {HttpExceptionFilter} from './http-exception.filter';
import {APP_FILTER} from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    QuestionnaireModule,
    MongooseModule.forRoot(config.mongoURI, {useNewUrlParser: true, useFindAndModify: false}),

  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_FILTER, useClass: HttpExceptionFilter}],
})
export class AppModule {}
