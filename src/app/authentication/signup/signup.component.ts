import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
  public passwordMismatch = false;
  public emailTaken = false;
  private isAdminSub: Subscription;
  private isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnDestroy(): void {
    this.isAdminSub.unsubscribe();
  }

  ngOnInit(): void {
    this.isAdminSub = this.authService.getIsAdminListener().subscribe(data => {
      this.isAdmin = data;
    });
  }

  onSignup(form: NgForm, event) {

    this.passwordMismatch = false;
    this.emailTaken = false;
    if (form.invalid) {
      event.preventDefault();
      return;
    }
    if (form.value.repeatPassword !== form.value.password) {
      this.passwordMismatch = true;
      return;
    }

    const userCredentials = {
      email: form.value.email,
      password: form.value.password,
      isAdmin: this.isAdmin,
    };
    console.log("OK");

    this.store.dispatch(new AuthActions.SignupStart(userCredentials));


  }

}
