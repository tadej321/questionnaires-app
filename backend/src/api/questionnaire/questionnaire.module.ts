
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {QuestionnaireSchema} from './schemas/questionnaire.schema';
import {QuestionnaireController} from './questionnaire.controller';
import {QuestionnaireService} from './questionnaire.service';
import {QuestionnaireGateway} from './questionnaire.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Questionnaire', schema: QuestionnaireSchema}]),
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService, QuestionnaireGateway],
})
export class QuestionnaireModule {

}
