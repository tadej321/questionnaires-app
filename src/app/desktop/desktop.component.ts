import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as QuestionnaireActions from './store/questionnaire-list.actions';
import {AuthService} from '../authentication/auth.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as AuthActions from '../authentication/store/auth.actions';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });

  }

  redirect(): void {
    this.store.dispatch(new QuestionnaireActions.StopEdit());
    this.router.navigate(['desktop/list']);
  }

  onLogout() {
    this.authService.setUserEmail(undefined);
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
