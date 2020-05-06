import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  public route: string;

  public questionnaires = [
    {_id: 'asd6a78s67d', value: 'question 1'},
    {_id: 'asd6a78s673', value: 'question 2'},
    {_id: 'asd6a78s672', value: 'question 3'},
    {_id: 'asd6a78s676', value: 'question 4'},
    {_id: 'asd6a78s67f', value: 'question 5'},
    {_id: 'asd6a78s67a', value: 'question 6'},
    {_id: 'asd6a78s67j', value: 'question 7'},
    {_id: 'asd6a78s67y', value: 'question 8'},
    ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.questionnaires.unshift({_id: '0', value: 'ADD'});
    this.route = this.router.url;


  }

  redirect(): void {
    this.router.navigate(['desktop/list']);
  }
}
