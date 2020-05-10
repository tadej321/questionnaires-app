import {Actions, Effect, ofType} from '@ngrx/effects';

import * as QuestionnaireActions from './questionnaire-list.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Questionnaire} from '../../models/questionnaire.model';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {WebSocketService} from '../web-socket.service';

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

  @Effect()
  fetchUserQuestionnaire = this.actions$.pipe(
    ofType(QuestionnaireActions.FETCH_USER_QUESTIONNAIRES),
    switchMap((questionnaireData: QuestionnaireActions.FetchUserQuestionnaires) => {
      return this.http.get<Questionnaire[]>(
        `${environment.backendApiUrl}/questionnaire/${questionnaireData.payload}`
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

  @Effect({ dispatch: false })
  onStartEdit = this.actions$.pipe(
    ofType(QuestionnaireActions.ON_START_EDIT),
    tap((questionnaireData: QuestionnaireActions.OnStartEdit) => {
      this.webSocketService.emit('editStart', questionnaireData.payload);
    })
  );

  @Effect({ dispatch: false })
  onStopEdit = this.actions$.pipe(
    ofType(QuestionnaireActions.ON_STOP_EDIT),
    tap((questionnaireData: QuestionnaireActions.OnStopEdit) => {
      this.webSocketService.emit('editStop', questionnaireData.payload);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private webSocketService: WebSocketService) {}
}
