import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as QuestionnaireActions from './store/questionnaire-list.actions';
import {AuthService} from '../authentication/auth.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as AuthActions from '../authentication/store/auth.actions';
import {WebSocketService} from './web-socket.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  public isAdmin = false;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private webSocketService: WebSocketService,
    ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        this.isAdmin = user.isAdmin;
      });

  }

  redirect(): void {
    this.router.navigate(['desktop/list']);
  }

  onLogout() {
    this.userSub.unsubscribe();
    if (this.isAdmin) {
      this.webSocketService.disconnectSocket();
    }
    this.authService.setUserEmail(undefined);
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
