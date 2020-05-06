import {NgModule, Optional, SkipSelf} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule {
}
