import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

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



// import {Injectable} from '@angular/core';
// import {Observable, Subject} from 'rxjs';
// import {environment} from '../../environments/environment';
// import {User} from './models/user.model';
// import {HttpClient} from '@angular/common/http';
// import {Router} from '@angular/router';
//
//
// const BACKEND_URL = environment.backendApiUrl + '/user';
//
// interface UserCredentials {
//   userId: string;
//   name: string;
//   surname: string;
// }
//
// @Injectable({ providedIn: 'root'})
// export class AuthService {
//   private authStatusListener = new Subject<boolean>();
//   private token: string;
//   private tokenTimer: any;
//   private isAuthenticated = false;
//   private userId;
//
//   constructor(private http: HttpClient, private router: Router) {}
//
//   getToken() {
//     return this.token;
//   }
//
//   getIsAuth() {
//     return this.isAuthenticated;
//   }
//
//   getUserId() {
//     return this.userId;
//   }
//
//   getUserCredentials() {
//     return {
//       userId: this.getAuthData().userId,
//       name: this.getAuthData().name,
//       surname: this.getAuthData().surname,
//     };
//   }
//
//   getAuthStatusListener() {
//     return this.authStatusListener.asObservable();
//   }
//
//   async login(email: string, password: string) {
//     // const authData: User = {email, password};
//     await this.http.post<{token: string, expiresIn: number, userCredentials: UserCredentials}>(BACKEND_URL + '/login', authData).toPromise()
//       .then(response => {
//         const token = response.token;
//         this.token = token;
//         if (token) {
//           const expiresInDuration = response.expiresIn;
//           this.setAuthTimer(expiresInDuration);
//           this.isAuthenticated = true;
//           this.authStatusListener.next(true);
//           const now = new Date();
//           const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
//           this.saveAuthData(token, expirationDate, response.userCredentials);
//           this.router.navigate(['desktop/tasks']);
//         }
//       }).catch(error => {
//         this.authStatusListener.next(false);
//         throw error;
//       });
//   }
//
//   autoAuthUser() {
//     const authInformation = this.getAuthData();
//     if (!authInformation) {
//       return;
//     }
//     const now = new Date();
//     const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
//     if (expiresIn > 0) {
//       this.token = authInformation.token;
//       this.isAuthenticated = true;
//       this.userId = authInformation.userId;
//       this.resetAuthTimer(expiresIn / 1000);
//       this.authStatusListener.next(true);
//     }
//   }
//
//   resetAuthTimer(duration: number) {
//     clearTimeout(this.tokenTimer);
//     this.setAuthTimer(duration);
//   }
//
//   private setAuthTimer(duration: number) {
//     clearTimeout(this.tokenTimer);
//     this.tokenTimer = setTimeout(() => {
//       this.logout();
//     }, duration * 1000);
//   }
//
//   logout() {
//     this.token = null;
//     this.isAuthenticated = false;
//     this.authStatusListener.next(false);
//     clearTimeout(this.tokenTimer);
//     this.clearAuthData();
//     this.router.navigate(['/auth/login']);
//
//   }
//
//   private saveAuthData(token: string, expirationDate: Date, userCredentials: UserCredentials) {
//     localStorage.setItem('token', token);
//     localStorage.setItem('expiration', expirationDate.toISOString());
//     localStorage.setItem('userId', userCredentials.userId);
//   }
//
//   private clearAuthData() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('expiration');
//     localStorage.removeItem('userId');
//   }
//
//   private getAuthData() {
//     const token = localStorage.getItem('token');
//     const expirationDate = localStorage.getItem('expiration');
//     const userId = localStorage.getItem('userId');
//     if (!token && !expirationDate) {
//       return;
//     }
//     return {
//       token,
//       expirationDate: new Date(expirationDate),
//       userId,
//       name,
//       surname
//     };
//   }
// }
