import { Component, OnInit } from '@angular/core';
import * as QuestionnaireActions from '../../../store/actions/questionnaire-list.actions';
import {Store} from '@ngrx/store';
import {Questionnaire} from '../../../models/questionnaire.model';
import {Router} from '@angular/router';
import {QuestionnaireService} from '../questionnaire.service';
import * as fromQuestionnaireList from '../../../store/reducers/questionnaire-list.reducer';
import {Question} from '../../../models/question.model';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questionnaire: Questionnaire;

  public isAdmin = true;

  constructor(
    private store: Store<fromQuestionnaireList.AppState>,
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) { }

  ngOnInit(): void {
    this.store.select('questionnaireList').subscribe(stateData => {
      if (stateData.editedQuestionnaireId !== null) {
        this.questionnaire = stateData.editedQuestionnaire;
      } else {
        this.router.navigate(['desktop/list']);
      }
    });
  }

  onAddQuestion() {
    const value = ((document.getElementById('question-input') as HTMLInputElement).value);
    if (value !== '') {
      const newQuestion = new Question(value, 0, 0, 0, 0, 0, value + 'Id');

      this.store.dispatch(new QuestionnaireActions.AddQuestion(newQuestion));
    }
  }


  onRemoveQuestion(id: string) {
    this.store.dispatch(new QuestionnaireActions.RemoveQuestion(id));
  }
}
