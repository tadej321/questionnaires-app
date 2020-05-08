import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Questionnaire} from '../../models/questionnaire.model';
import {Observable} from 'rxjs';
import * as QuestionnaireActions from '../../store/actions/questionnaire-list.actions';
import * as fromQuestionnaireList from '../../store/reducers/questionnaire-list.reducer';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {

  questionnaires: Observable<{questionnaires: Questionnaire[]}>;

  public mod = [1, 2, 3, 4, 5];

  constructor(
    private router: Router,
    private store: Store<fromQuestionnaireList.AppState>
  ) {}

  ngOnInit(): void {
   this.questionnaires = this.store.select('questionnaireList');
   // this.questionnaires.subscribe(data => {
   //   console.log(data);
   // });
   // this.questionnaires.unshift({_id: '0', value: 'ADD'});



  }

  redirect(id): void {
    this.store.dispatch(new QuestionnaireActions.StartEdit(id));
    this.router.navigate(['desktop/questionnaire', id, 'questions']);
  }

  onAddQuestionnaire() {
    const newQuestionnaire = new Questionnaire('', [], [], new Date());
    this.store.dispatch(new QuestionnaireActions.AddQuestionnaire(newQuestionnaire));
  }

  onRemoveQuestionnaire(id) {
    this.store.dispatch(new QuestionnaireActions.DeleteQuestionnaire(id));
  }
}
