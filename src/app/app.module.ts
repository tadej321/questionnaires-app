import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.component';
import {AuthGuard} from './authentication/auth-guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './authentication/auth-interceptor';
import {StoreModule} from '@ngrx/store';
import {QuestionnaireListReducer} from './store/reducers/questionnaire-list.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({questionnaireList: QuestionnaireListReducer})
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
