import { Component } from '@angular/core';
import{Response} from '@angular/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(){}
  isLogin:boolean;
  ngOnInit() {

    $(document) .ready(function(){



    });




    console.log("from componenet isLogin " + this.isLogin);
  }
}
