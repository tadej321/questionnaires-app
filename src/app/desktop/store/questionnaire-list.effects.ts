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
      console.log(typeof questionnaires);
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

  @Effect()
  fetchUserQuestionnaire = this.actions$.pipe(
    ofType(QuestionnaireActions.FETCH_USER_QUESTIONNAIRES),
    switchMap((questionnaireData: QuestionnaireActions.FetchUserQuestionnaires) => {
      return this.http.get<Questionnaire[]>(
        `${environment.backendApiUrl}/questionnaire/${questionnaireData.payload}`
      );
    }),
    map(questionnaires => {
      console.log(questionnaires);
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


  @Effect()
  addQuestionnaire = this.actions$.pipe(
    ofType(QuestionnaireActions.ADD_QUESTIONNAIRE),
    switchMap((questionnaireData: QuestionnaireActions.AddQuestionnaire) => {
      return this.http.post<Questionnaire[]>(
        `${environment.backendApiUrl}/questionnaire`,
        questionnaireData.payload
      );
    }),
    map(() => {
      return new QuestionnaireActions.FetchQuestionnaires();
    })
  );

  @Effect()
  updateQuestionnaire = this.actions$.pipe(
    ofType(QuestionnaireActions.UPDATE_QUESTIONNAIRE),
    switchMap((questionnaireData: QuestionnaireActions.UpdateQuestionnaire) => {
      console.log(questionnaireData);
      return this.http.put<{}>(
        `${environment.backendApiUrl}/questionnaire`,
        questionnaireData.payload
      );
    }),
    map(() => {
      return new QuestionnaireActions.FetchQuestionnaires();
    })
  );

  @Effect()
  deleteQuestionnaire = this.actions$.pipe(
    ofType(QuestionnaireActions.DELETE_QUESTIONNAIRE),
    switchMap((questionnaireData: QuestionnaireActions.DeleteQuestionnaire) => {
      return this.http.delete<{}>(
        `${environment.backendApiUrl}/questionnaire/${questionnaireData.payload}`,
      );
    }),
    map(() => {
      return new QuestionnaireActions.FetchQuestionnaires();
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
