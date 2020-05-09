import {Question} from './question.interface';

export interface Questionnaire {

  title: string;
  questions: Question[];
  shared: string[];
  dateModified: string;
  completed: string[];
  id?: string;

}
