import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth-guard';
import {SignupComponent} from './signup/signup.component';
import {AuthenticationComponent} from './authentication.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
