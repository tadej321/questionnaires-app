import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {map, switchMap, take} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['auth/login']);
    }
    return isAuth;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> |Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      return true;
    }
    this.router.navigate(['/']);
  }
}
