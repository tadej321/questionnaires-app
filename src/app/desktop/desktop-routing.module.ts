import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionsComponent} from './questionnaire/questions/questions.component';
import {ShareComponent} from './questionnaire/share/share.component';
import {ResultsComponent} from './questionnaire/results/results.component';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {QuestionnaireListComponent} from './questionnaire-list/questionnaire-list.component';

const routes: Routes = [
  {path: 'list', component: QuestionnaireListComponent},
  {path: 'questionnaire/:id', children: [
      {path: 'questions', component: QuestionsComponent},
      {path: 'share', component: ShareComponent},
      {path: 'results', component: ResultsComponent}
    ], component: QuestionnaireComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class DesktopRoutingModule {}
