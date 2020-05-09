import {Action} from '@ngrx/store';
import {Questionnaire} from '../../models/questionnaire.model';
import {Question} from '../../models/question.model';

export const ADD_QUESTIONNAIRE = 'ADD_QUESTIONNAIRE';
export const UPDATE_QUESTIONNAIRE = 'UPDATE_QUESTIONNAIRE';
export const DELETE_QUESTIONNAIRE = 'DELETE_QUESTIONNAIRE';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const ADD_QUESTIONNAIRE_START = 'ADD_QUESTIONNAIRE_START';
export const FETCH_QUESTIONNAIRES = 'FETCH_QUESTIONNAIRES';
export const SET_QUESTIONNAIRES = 'SET_QUESTIONNAIRES';

export class AddQuestionnaire implements Action {
  readonly type = ADD_QUESTIONNAIRE;

  constructor(public payload: Questionnaire) {}
}

export class UpdateQuestionnaire implements Action {
  readonly type = UPDATE_QUESTIONNAIRE;

  constructor(public payload: Questionnaire) {}
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

export class AddQuestionnaireStart implements Action {
  readonly type = ADD_QUESTIONNAIRE_START;

  constructor(public payload: Questionnaire) {}
}

export class FetchQuestionnaires implements Action {
  readonly type = FETCH_QUESTIONNAIRES;
}

export class SetQuestionnaires implements Action {
  readonly type = SET_QUESTIONNAIRES;

  constructor(public payload: Questionnaire[]) {}
}
export type QuestionnaireListActions =
  | AddQuestionnaire
  | UpdateQuestionnaire
  | DeleteQuestionnaire
  | StartEdit
  | StopEdit
  | RemoveQuestion
  | FetchQuestionnaires
  | SetQuestionnaires;
