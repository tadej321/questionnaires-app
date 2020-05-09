import {Actions, Effect, ofType} from '@ngrx/effects';

import * as QuestionnaireActions from './questionnaire-list.actions';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Questionnaire} from '../../models/questionnaire.model';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()
export class QuestionnaireListEffects {
  @Effect()
  fetchQuestionnaire = this.actions$.pipe(
    ofType(QuestionnaireActions.FETCH_QUESTIONNAIRES),
    switchMap(() => {
      return this.http.get<Questionnaire[]>(
        `${environment.backendApiUrl}/questionnaire`
      );
    }),
    map(questionnaires => {
      return questionnaires.map(questionnaire => {
        return {
          ... questionnaire
        };
      });
    }),
    map(questionnaires => {
      return new QuestionnaireActions.SetQuestionnaires(questionnaires);
    })
  );
  // addQuestionnaire = this.actions$.pipe(
  //   ofType(QuestionnaireActions.ADD_QUESTIONNAIRE_START),
  //   // switchMap((questionnaireData: QuestionnaireActions.AddQuestionnaireStart) => {
  //   //
  //   // })
  // );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
