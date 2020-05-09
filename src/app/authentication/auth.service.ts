import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import {Observable, Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  private isAdmin: boolean;
  private userEmail: string;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  setIsAdmin(state: boolean) {
    this.isAdmin = state;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  getUserEmail(): string {
    return this.userEmail;
  }

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}

