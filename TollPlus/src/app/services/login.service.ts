import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import "rxjs/add/operator/map";
@Injectable()
export class LoginService {

  constructor(private http:Http) { }
private Color:string;

  get color(): string {
    return this.Color;
  }

  set color(value: string) {
    this.Color = value;
  }

  validateLogin(emailAddress): Promise<boolean>{
    console.log("emailAddress "+emailAddress);
    if(emailAddress=='sagar.nerellaa@gmail.com'){
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
    //return this.http.get("http://192.168.50.42:8080/validateEmployee/?emailAddress="+emailAddress);

  }

}
