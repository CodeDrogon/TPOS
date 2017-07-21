import { Component, OnInit } from '@angular/core';
import {LoginService} from './../login.service';
import {MyDataService} from './../my-data.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,private myDataService:MyDataService,private router:Router) { }
  isLogin:boolean=false;
  ngOnInit() {
    console.log("login component ")
    this.isLogin=false;
  }

  onSubmit=function(userInfo){
    console.log("user "+userInfo);
this.loginService.validateLogin(userInfo.emailAddress).subscribe(

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
);
  }

}
