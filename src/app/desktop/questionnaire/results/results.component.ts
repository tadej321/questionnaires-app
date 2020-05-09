import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {Router} from '@angular/router';
import {Questionnaire} from '../../../models/questionnaire.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  questionnaire: Questionnaire;
  private questionnaireSub: Subscription;

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

  ngOnDestroy(): void {
    this.questionnaireSub.unsubscribe();
  }

}
