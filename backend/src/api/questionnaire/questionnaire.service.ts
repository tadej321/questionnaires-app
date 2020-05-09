import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Questionnaire} from './interfaces/questionnaire.interface';
import {CreateQuestionnaireDto} from './dto/create-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel('Questionnaire') private readonly questionnaireModel: Model<Questionnaire>,
  ) {}

  async create(questionnaire: Questionnaire) {
    return await this.questionnaireModel.create(questionnaire);
  }

  async getAll(): Promise<Questionnaire[]> {
    return await this.questionnaireModel.find();
  }

  async getByUser(userEmail: string): Promise<Questionnaire[]> {
    return await this.questionnaireModel.findOne({shared: {$in: [userEmail]}});
  }

  async update(questionnaire: Questionnaire) {
    return await this.questionnaireModel.updateOne({_id: questionnaire.id}, questionnaire);
  }

  async deleteById(id: string) {

    return await this.questionnaireModel.deleteOne({_id: id});
  }
}
