import {Component, OnDestroy, OnInit} from '@angular/core';
import * as QuestionnaireActions from '../../store/questionnaire-list.actions';
import {Store} from '@ngrx/store';
import {Questionnaire} from '../../../models/questionnaire.model';
import {Router} from '@angular/router';
import * as fromApp from '../../../store/app.reducer';
import {Question} from '../../../models/question.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../authentication/auth.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  questionnaire: Questionnaire;

  public isAdmin = false;

  private questionnaireSub: Subscription;
  public isDisabled: boolean;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    this.questionnaireSub = this.store.select('questionnaireList').subscribe(stateData => {
      if (stateData.editedQuestionnaireId !== null) {
        this.questionnaire = stateData.editedQuestionnaire;
        this.setDisabled(stateData.editedQuestionnaire.completed);
      } else {
        this.router.navigate(['desktop/list']);
      }
    });
  }

  private setDisabled(completed: string[]) {
    this.isDisabled = !!completed.find(e => e === this.authService.getUserEmail());
  }

  onAddQuestion() {
    const value = ((document.getElementById('question-input') as HTMLInputElement).value);
    if (value !== '') {
      const newQuestion = new Question(value, 0, 0, 0, 0, 0);

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

  private onUpdateQuestionnaire(questions?: Question[], title?: string) {

    const newQuestions = questions ? questions : this.questionnaire.questions;
    const newTitle = title ? title : this.questionnaire.title;

    const newQuestionnaire = new Questionnaire(
      newTitle,
      newQuestions,
      this.questionnaire.shared,
      new Date(),
      this.questionnaire.completed,
      false,
      this.questionnaire._id
    );

    this.store.dispatch(new QuestionnaireActions.UpdateQuestionnaire(newQuestionnaire));
  }


  onRemoveQuestion(id: string) {
    this.onUpdateQuestionnaire(this.questionnaire.questions.filter((q, qIndex) => {
      return q._id !== id;
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

    const newQuestionnaire = new Questionnaire(
      this.questionnaire.title,
      updatedQuestions,
      this.questionnaire.shared,
      this.questionnaire.dateModified,
      [...this.questionnaire.completed, this.authService.getUserEmail()],
      this.questionnaire.published,
      this.questionnaire._id
    );

    this.store.dispatch(new QuestionnaireActions.UpdateQuestionnaire(newQuestionnaire));
  }

  ngOnDestroy(): void {
    this.questionnaireSub.unsubscribe();
  }

  onPublish() {
    const newQuestionnaire = new Questionnaire(
      this.questionnaire.title,
      this.questionnaire.questions,
      this.questionnaire.shared,
      this.questionnaire.dateModified,
      this.questionnaire.completed,
      true,
      this.questionnaire._id,
    );
    console.log(newQuestionnaire);
    this.store.dispatch(new QuestionnaireActions.UpdateQuestionnaire(newQuestionnaire));
  }
}
