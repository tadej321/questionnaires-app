import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {QuestionnaireService} from './questionnaire.service';
import * as QuestionnaireActions from '../../store/actions/questionnaire-list.actions';
import {Store} from '@ngrx/store';
import * as fromQuestionnaireList from '../../store/reducers/questionnaire-list.reducer';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private store: Store<fromQuestionnaireList.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.questionnaireService.setQuestionnaireId(params.id);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new QuestionnaireActions.StopEdit());
  }

}
