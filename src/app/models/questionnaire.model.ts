import {Question} from './question.model';

export class Questionnaire {

  constructor(
    public title: string,
    public questions: Question[],
    public shared: string[],
    public dateModified: Date,
    public completed: string[],
    public id?: string,
  ) {}

}
