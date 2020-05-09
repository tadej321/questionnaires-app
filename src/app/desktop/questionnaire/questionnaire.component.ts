import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as QuestionnaireActions from '../store/questionnaire-list.actions';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {AuthService} from '../../authentication/auth.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit, OnDestroy, AfterViewInit {

  public isAdmin = false;
  @ViewChildren('labelContainer') labelContainer: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new QuestionnaireActions.StopEdit());
  }

  ngAfterViewInit(): void {
    this.toggleTab(0);
  }

  toggleTab(index: number): void {

    this.labelContainer.forEach(container => {

      const labels = container.nativeElement.children;
      console.log(labels);
      for (const label of labels) {
        label.classList.remove('toggled');
      }

      labels[index].classList.add('toggled');
    });

  }


}
