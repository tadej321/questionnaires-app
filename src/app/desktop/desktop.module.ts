import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DesktopRoutingModule} from './desktop-routing.module';
import {DesktopComponent} from './desktop.component';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {QuestionsComponent} from './questionnaire/questions/questions.component';
import {ShareComponent} from './questionnaire/share/share.component';
import {ResultsComponent} from './questionnaire/results/results.component';
import { RowPipe } from './questionnaire-list/row.pipe';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    DesktopComponent,
    QuestionnaireComponent,
    QuestionsComponent,
    ShareComponent,
    ResultsComponent,
    RowPipe,
    QuestionnaireListComponent
  ],
  imports: [
    CommonModule,
    DesktopRoutingModule,
    FormsModule
  ]
})
export class DesktopModule { }
