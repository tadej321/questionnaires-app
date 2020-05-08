import { Injectable } from '@angular/core';
import {Questionnaire} from '../../models/questionnaire.model';
import {Store} from '@ngrx/store';
import * as fromQuestionnaireList from '../../store/reducers/questionnaire-list.reducer';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private questionnaireId: string;
  private questionnaire: Questionnaire;

  constructor(
    private store: Store<fromQuestionnaireList.AppState>,
    private router: Router,
  ) {
    this.store.select('questionnaireList').subscribe(stateData => {
      if (stateData.editedQuestionnaireId !== null) {
        this.questionnaire = stateData.editedQuestionnaire;
      } else {
        this.router.navigate(['desktop/list']);
      }
    });
  }

  setQuestionnaireId(id) {
    this.questionnaireId = id;
  }

  getQuestionnaire(): Questionnaire {
    return this.questionnaire;
  }
}
