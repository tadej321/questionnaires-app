import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  public correctPassword;
  public correctEmail;


  constructor( private store: Store<fromApp.AppState>) {}



  ngOnInit(): void {
    this.correctEmail = true;
    this.correctPassword = true;
  }



  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (!form.value.password) {
      this.correctPassword = false;
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(
      new AuthActions.LoginStart({ email, password })
    );
  }

  onFocus() {
    this.correctPassword = true;
    this.correctEmail = true;
  }


  ngOnDestroy() {

  }
}
