import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Questionnaire} from './interfaces/questionnaire.interface';
import {ObjectID} from 'mongodb';

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
    return await this.questionnaireModel.find({$and: [{shared: {$in: [userEmail]}}, {published: true}]});
  }

  async update(questionnaire: Questionnaire) {

    for (const question of questionnaire.questions) {
      if (!question._id) {
        question._id = new ObjectID();
      }
    }
    return await this.questionnaireModel.updateOne({_id: questionnaire._id}, questionnaire);
  }

  async deleteById(id: string) {

    return await this.questionnaireModel.deleteOne({_id: id});
  }
}
