import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import {Observable, Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  private isAdmin = new Subject<boolean>();

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  getIsAdminListener(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }

  setIsAdmin(state: boolean) {
    this.isAdmin.next(state);
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

