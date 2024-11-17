import { Component } from '@angular/core';
import { DataProvider } from './providers/data.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SOMANI';
  constructor(public dataProvider:DataProvider){}
}
