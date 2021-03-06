import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {Router} from '@angular/router';
import {Questionnaire} from '../../../models/questionnaire.model';
import {NgForm} from '@angular/forms';
import * as QuestionnaireActions from '../../store/questionnaire-list.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit, OnDestroy {

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

  onSubmit(form: NgForm) {
    if (form.valid) {
      const value = form.value;
      const updatedQuestionnaire = {... this.questionnaire};

      updatedQuestionnaire.shared = [...updatedQuestionnaire.shared, value.email];


      this.store.dispatch(new QuestionnaireActions.UpdateQuestionnaire(updatedQuestionnaire));
    }

  }

  ngOnDestroy(): void {
    this.questionnaireSub.unsubscribe();
  }

}
