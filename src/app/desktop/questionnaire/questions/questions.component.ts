import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public questions = [
    {_id: 'd7as89d689as', value: 'Question 1'},
    {_id: 'd7as89d68sds', value: 'Question 2'},
    {_id: 'd7as89d68234', value: 'Question 3'},
    {_id: 'd7as89d6sd31', value: 'Question 4'},
    {_id: 'd7as89d68123', value: 'Question 5'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddQuestion() {
    const value = ((document.getElementById('question-input') as HTMLInputElement).value);
    console.log(value);
    if (value !== '') {
      this.questions.push({_id: value + 'as1', value: value.toString()});
    }
  }

  onRemoveQuestion(id: string) {

  }
}
