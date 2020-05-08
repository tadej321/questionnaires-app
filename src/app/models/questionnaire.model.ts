import {Question} from './question.model';

export class Questionnaire {
  id?: string;
  title: string;
  questions: Question[];
  shared: string[];
  dateModified: Date;

  constructor(
    title: string,
    questions: Question[],
    shared: string[],
    dateModified: Date,
    id?: string,
  ) {
    this.id = id;
    this.title = title;
    this.questions = questions;
    this.shared = shared;
    this.dateModified = dateModified;
  }

}
