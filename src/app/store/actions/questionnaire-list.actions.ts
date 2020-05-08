import {Action} from '@ngrx/store';
import {Questionnaire} from '../../models/questionnaire.model';
import {Question} from '../../models/question.model';

export const  ADD_QUESTIONNAIRE = 'ADD_QUESTIONNAIRE';
export const UPDATE_QUESTIONNAIRE = 'UPDATE_QUESTIONNAIRE';
export const DELETE_QUESTIONNAIRE = 'DELETE_QUESTIONNAIRE';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
export const ADD_QUESTION = 'ADD_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';

export class AddQuestionnaire implements Action {
  readonly type = ADD_QUESTIONNAIRE;

  constructor(public payload: Questionnaire) {}
}

export class UpdateQuestionnaire implements Action {
  readonly type = UPDATE_QUESTIONNAIRE;

  constructor(public payload: Questionnaire) {}
}

export class AddQuestion implements Action {
  readonly type = ADD_QUESTION;

  constructor(public payload: Question) {}
}

export class RemoveQuestion implements Action {
  readonly type = REMOVE_QUESTION;

  constructor(public payload: string) {}
}

export class DeleteQuestionnaire implements Action {
  readonly type = DELETE_QUESTIONNAIRE;

  constructor(public payload: string) {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: string) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}
export type QuestionnaireListActions =
  | AddQuestionnaire
  | UpdateQuestionnaire
  | DeleteQuestionnaire
  | StartEdit
  | StopEdit
  | AddQuestion
  | RemoveQuestion;
