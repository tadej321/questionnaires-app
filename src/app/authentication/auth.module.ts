import {NgModule, Optional, SkipSelf} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule} from "@angular/forms";
import {SignupComponent} from './signup/signup.component'
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AuthModule {
}
