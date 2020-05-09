import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
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

export class SignupComponent implements OnInit, OnDestroy, AfterViewInit {

  public passwordMismatch = false;
  public emailTaken = false;
  private isAdmin: boolean;

  @ViewChildren('labelContainer') labelContainer: QueryList<ElementRef>;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
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
    this.store.dispatch(new AuthActions.SignupStart(userCredentials));


  }

  ngAfterViewInit(): void {
    this.onUserSelect(0);
  }

  onUserSelect(buttonNum: number): void {
    this.toggleRole(buttonNum);
    this.isAdmin = buttonNum === 0;
    this.authService.setIsAdmin(buttonNum === 0);
  }

  /**
   * sets the button state to toggled depending user role selected.
   *
   * @param index Index of the selected role.
   */
  toggleRole(index: number): void {

    this.labelContainer.forEach(container => {

      const labels = container.nativeElement.children;

      for (const label of labels) {
        label.classList.remove('toggled');
      }

      labels[index].classList.add('toggled');
    });

  }
}
