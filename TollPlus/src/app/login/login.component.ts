import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {CustomComponent} from "../custom/custom.component";
import {SessionService} from "../services/session-service.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService:LoginService,private router:Router,private sessionService:SessionService) { }
  isLogin:boolean=false;
  highlightColor:string;
  ngOnInit() {
    console.log("login component ")
    this.sessionService.isLogged().then((result: boolean) => {
      if(result) {
        this.isLogin=true;
        this.router.navigate(['/createaccount']);
      }
    })



  }

  onSubmit=function(userInfo){
    console.log("user "+userInfo);
this.loginService.validateLogin(userInfo.emailAddress).then((result:boolean) => {
  if(result) {
    if(typeof (Storage) !== 'undefined') {
      localStorage.setItem('User',userInfo.emailAddress);
    }
    this.router.navigate(['/createaccount']);
  } else {
    this.router.navigate(['/login']);
  }
})
/*this.loginService.validateLogin(userInfo.emailAddress).subscribe(

  (value) => {
    var resObj=JSON.parse(value._body);
    if(resObj.errorCode==412){
      console.log("in error")
      this.myDataService.setLogin(false);
      this.isLogin=false;
      this.router.navigateByUrl('login');
    }else{
      this.isLogin=true;
      this.myDataService.setLogin(true);
      console.log("in login")
      this.router.navigateByUrl('createaccount');
    }

  }
);*/
    //this.router.navigateByUrl('createaccount');
  }


}
