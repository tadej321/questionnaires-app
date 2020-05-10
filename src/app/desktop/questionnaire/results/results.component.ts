import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {Router} from '@angular/router';
import {Questionnaire} from '../../../models/questionnaire.model';
import {Subscription} from 'rxjs';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  questionnaire: Questionnaire;
  private questionnaireSub: Subscription;
  public scalesArray: number[];

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.questionnaireSub = this.store.select('questionnaireList').subscribe(stateData => {
      if (stateData.editedQuestionnaireId !== null) {
        this.questionnaire = stateData.editedQuestionnaire;
      } else {
        this.router.navigate(['desktop/list']);
      }
    });
  }

  calculateScaleCent(
    question: Question,
    divider: number
  ): string {

    return (divider / (question.scale1 + question.scale2 + question.scale3 + question.scale4 + question.scale5) * 100).toFixed(1);
  }

  ngOnDestroy(): void {
    this.questionnaireSub.unsubscribe();
  }

  getAverageTime(completionTime: number[]) {
    if (completionTime && completionTime.length !== 0) {
      const averageTime = completionTime.reduce((a, b) => a + b, 0) / completionTime.length;
      const date = new Date(0);
      date.setMilliseconds(averageTime);
      return date.toISOString().substr(11, 8);
    }
    return 0;
  }
}
