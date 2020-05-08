import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Store} from '@ngrx/store';
import {exhaustMap, map, take} from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';

@Injectable()

  /**
   * ARGUMENTS:
   *  @req[HttpRequest]: the request we are intercepting
   *  @next:[HttpHandler]: allows us to leave the interceptor once it has finished.
   *
   * FUNCTION:
   * This method mandatory, because Angular will call this method for requests leaving the app.
   **/
  export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //
  //   const authToken = this.authService.getToken();
  //
  //   this.authService.resetAuthTimer(3600)
  //
  //   const authRequest = req.clone( {
  //     headers: req.headers.set('Authorization', 'Bearer' + authToken)
  //   });
  //   return next.handle(authRequest);
  // }

// }
