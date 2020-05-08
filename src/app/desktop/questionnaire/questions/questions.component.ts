import { Component, OnInit } from '@angular/core';
import * as QuestionnaireActions from '../../store/questionnaire-list.actions';
import {Store} from '@ngrx/store';
import {Questionnaire} from '../../../models/questionnaire.model';
import {Router} from '@angular/router';
import * as fromApp from '../../../store/app.reducer';
import {Question} from '../../../models/question.model';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questionnaire: Questionnaire;

  public isAdmin = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
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

      const updatedQuestions = [...this.questionnaire.questions, newQuestion];

      this.onUpdateQuestionnaire(updatedQuestions);
    }
    document.getElementById('question-input').setAttribute('value', '');
  }

  onUpdateTitle() {
    const value = ((document.getElementById('title-input') as HTMLInputElement).value);
    if (value !== '') {
      this.onUpdateQuestionnaire(undefined, value);
    }
  }

  onUpdateQuestionnaire(questions?: Question[], title?: string) {

    const newQuestions = questions ? questions : this.questionnaire.questions;
    const newTitle = title ? title : this.questionnaire.title;

    const newQuestionnaire = new Questionnaire(
      newTitle,
      newQuestions,
      this.questionnaire.shared,
      new Date(),
      this.questionnaire.id
    );

    this.store.dispatch(new QuestionnaireActions.UpdateQuestionnaire(newQuestionnaire));
  }


  onRemoveQuestion(id: string) {
    this.onUpdateQuestionnaire(this.questionnaire.questions.filter((q, qIndex) => {
      return q.id !== id;
    }));
  }

  onSubmit(form: NgForm) {

    const value = form.value;
    const updatedQuestions = [...this.questionnaire.questions];
    let index = 0;
    for (const res in value) {
      if (res === '') {
        return;
      } else {
        const updatedQuestion = {...updatedQuestions[index]};
        updatedQuestion['scale' + value[res]] ++;
        updatedQuestions[index] = updatedQuestion;
      }
      index ++;
    }

    this.onUpdateQuestionnaire(updatedQuestions);
  }
}
