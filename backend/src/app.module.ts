import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import config from './config/keys';
import {UsersModule} from './api/authentication/users.module';
import {UsersService} from './api/authentication/users.service';
import {QuestionnaireModule} from './api/questionnaire/questionnaire.module';
import {QuestionnaireGateway} from './api/questionnaire/questionnaire.gateway';

@Module({
  imports: [
    UsersModule,
    QuestionnaireModule,
    MongooseModule.forRoot(config.mongoURI, {useNewUrlParser: true, useFindAndModify: false}),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
