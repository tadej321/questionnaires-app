import {Question} from './question.interface';

export interface Questionnaire {

  title: string;
  questions: Question[];
  shared: string[];
  dateModified: Date;
  completed: string[];
  published: boolean;
  _id?: string;

}
