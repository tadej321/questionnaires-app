import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import {Observable, observable, of, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';
import {WebSocketService} from '../../desktop/web-socket.service';

export interface AuthResponseData {
  isAdmin: boolean;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  isAdmin: boolean,
  userId: string,
  token: string,

) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate, isAdmin);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email,
    userId,
    token,
    isAdmin,
    expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.message) {
    case 'user does not exist':
      errorMessage = 'This user does not exist';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          `${environment.backendApiUrl}/auth/signup`,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            isAdmin: signupAction.payload.isAdmin
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            this.authService.setIsAdmin(resData.isAdmin);
            this.authService.setUserEmail(resData.email);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.isAdmin,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          `${environment.backendApiUrl}/auth/login`,
          {
            email: authData.payload.email,
            password: authData.payload.password
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            this.authService.setIsAdmin(resData.isAdmin);
            this.authService.setUserEmail(resData.email);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.isAdmin,
              resData.localId,
              resData.idToken,

            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.isAdmin) {
        this.webSocketService.initSocket();
      }
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/desktop/list']);
      }
    })
  );


  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth/login']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private webSocketService: WebSocketService,
  ) {}
}
