import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.component';
import {AuthGuard} from './authentication/auth-guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './authentication/auth-interceptor';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './authentication/store/auth.effects';
import {QuestionnaireListEffects} from './desktop/store/questionnaire-list.effects';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, QuestionnaireListEffects]),
    SharedModule,
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
