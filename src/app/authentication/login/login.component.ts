import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Subscription} from 'rxjs';
import {NgForm, NgModel} from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  public correctPassword;
  public correctEmail;

  @ViewChildren('labelContainer') labelContainer: QueryList<ElementRef>;

  constructor( private store: Store<fromApp.AppState>) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.correctEmail = true;
    this.correctPassword = true;
  }

  ngAfterViewInit(): void {
    this.toggleRole(1);
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

  onUserSelect(buttonNum: number): void {
    this.toggleRole(buttonNum);
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
