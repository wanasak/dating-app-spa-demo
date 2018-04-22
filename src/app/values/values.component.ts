import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
  values: any;

  constructor(private http: Http) {}

  ngOnInit() {
    this.getValues();
  }

  private getValues() {
    this.http
      .get('http://localhost:5000/api/values')
      .subscribe(res => (this.values = res.json()));
  }
}
