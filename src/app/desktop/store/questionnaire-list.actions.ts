import {Action} from '@ngrx/store';
import {Questionnaire} from '../../models/questionnaire.model';


export const ADD_QUESTIONNAIRE = 'ADD_QUESTIONNAIRE';
export const UPDATE_QUESTIONNAIRE = 'UPDATE_QUESTIONNAIRE';
export const DELETE_QUESTIONNAIRE = 'DELETE_QUESTIONNAIRE';
export const ON_START_EDIT = 'ON_START_EDIT';
export const ON_STOP_EDIT = 'ON_STOP_EDIT';
export const OPEN_QUESTIONNAIRE = 'OPEN_QUESTIONNAIRE';
export const CLOSE_QUESTIONNAIRE = 'CLOSE_QUESTIONNAIRE';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const FETCH_USER_QUESTIONNAIRES = 'FETCH_USER_QUESTIONNAIRES';
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

export class OpenQuestionnaire implements Action {
  readonly type = OPEN_QUESTIONNAIRE;

  constructor(public payload: string) {}
}

export class CloseQuestionnaire implements Action {
  readonly type = CLOSE_QUESTIONNAIRE;
}

export class FetchQuestionnaires implements Action {
  readonly type = FETCH_QUESTIONNAIRES;
}

export class FetchUserQuestionnaires implements Action {
  readonly type = FETCH_USER_QUESTIONNAIRES;

  constructor(public payload: string) {}
}

export class SetQuestionnaires implements Action {
  readonly type = SET_QUESTIONNAIRES;

  constructor(public payload: Questionnaire[]) {}
}

export class OnStartEdit implements Action {
  readonly type = ON_START_EDIT;

  constructor(public payload: {editor: string, editing: string}) {}
}

export class OnStopEdit implements Action {
  readonly type = ON_STOP_EDIT;

  constructor(public payload: {editor: string, editing: string}) {}
}
export type QuestionnaireListActions =
  | AddQuestionnaire
  | UpdateQuestionnaire
  | DeleteQuestionnaire
  | OpenQuestionnaire
  | CloseQuestionnaire
  | RemoveQuestion
  | FetchQuestionnaires
  | SetQuestionnaires
  | FetchQuestionnaires
  | OnStartEdit
  | OnStopEdit;
