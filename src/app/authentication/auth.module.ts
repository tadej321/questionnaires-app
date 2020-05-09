import {NgModule, Optional, SkipSelf} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule} from "@angular/forms";
import {SignupComponent} from './signup/signup.component';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule {
}
