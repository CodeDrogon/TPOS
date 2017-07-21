import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import "rxjs/add/operator/map";
@Injectable()
export class LoginService {

  constructor(private http:Http) { }


  validateLogin(emailAddress){
    console.log("emailAddress "+emailAddress);
      return this.http.get("http://192.168.50.42:8080/validateEmployee/?emailAddress="+emailAddress);

  }

}
