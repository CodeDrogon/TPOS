import { Component } from '@angular/core';
import {MyDataService} from './my-data.service';
import{Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private newService:MyDataService){}
  isLogin:boolean;
  ngOnInit() {
    this.isLogin = this.newService.getLogin();
    console.log("from componenet isLogin " + this.isLogin);
  }
}
