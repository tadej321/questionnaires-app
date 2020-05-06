import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  private authStatusSub: Subscription;
  public correctPassword;
  public correctEmail;

  @ViewChildren('labelContainer') labelContainer: QueryList<ElementRef>;

  constructor(public authService: AuthService) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.correctEmail = true;
    this.correctPassword = true;
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe();
  }

  ngAfterViewInit(): void {
    this.toggleDay(1);
  }


  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (!form.value.password) {
      this.correctPassword = false;
      return;
    }

    this.authService.login(form.value.email, form.value.password).catch(e => {
      if (e.error.message === 'Auth failed, password not found') {
        this.correctPassword = false;
      } else if (e.error.message === 'Auth failed, email not found') {
        this.correctEmail = false;
      }
    });
  }

  onFocus() {
    this.correctPassword = true;
    this.correctEmail = true;
  }

  onUserSelect(buttonNum: number): void {
    this.toggleDay(buttonNum);
  }

  /**
   * sets the button state to toggled depending on the day selected.
   *
   * @param index Index of the selected day in the week.
   */
  toggleDay(index: number): void {

    this.labelContainer.forEach(container => {

      const labels = container.nativeElement.children;

      for (const label of labels) {
        label.classList.remove('toggled');
      }

      labels[index].classList.add('toggled');
    });

  }


}
