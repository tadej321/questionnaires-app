import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import {Store} from '@ngrx/store';
import {AlertComponent} from '../../shared/alert/alert.component';
import {Subscription} from 'rxjs';
import {PlaceholderDirective} from '../../shared/placeholder/placeholder.directive';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  public correctPassword;
  public correctEmail;
  error: string = null;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private storeSub: Subscription;
  private closeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}



  ngOnInit(): void {
    this.correctEmail = true;
    this.correctPassword = true;
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
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

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
