import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, AfterViewInit {

  @ViewChildren('labelContainer') labelContainer: QueryList<ElementRef>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.onUserSelect(0);
  }

  onUserSelect(buttonNum: number): void {
    this.toggleRole(buttonNum);
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
