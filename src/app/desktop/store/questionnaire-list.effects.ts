import {Actions, ofType} from '@ngrx/effects';

import * as QuestionnaireActions from './questionnaire-list.actions';
import {switchMap} from 'rxjs/operators';

export class QuestionnaireListEffects {
  addQuestionnaire = this.actions$.pipe(
    ofType(QuestionnaireActions.ADD_QUESTIONNAIRE_START), // Continues only if action is of type ADD_QUESTIONNAIRE_START.
    // switchMap((questionnaireData: QuestionnaireActions.AddQuestionnaireStart) => {
    //
    // })
  );

  constructor(private actions$: Actions) {}
}
