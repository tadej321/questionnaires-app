import * as fromQuestionnaireList from '../desktop/store/questionnaire-list.reducer';
import * as fromAuth from '../authentication/store/auth.reducer';

import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  questionnaireList: fromQuestionnaireList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  questionnaireList: fromQuestionnaireList.QuestionnaireListReducer,
  auth: fromAuth.authReducer
};
