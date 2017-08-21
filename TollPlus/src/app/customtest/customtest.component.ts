import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customtest',
  templateUrl: './customtest.component.html',
  styleUrls: ['./customtest.component.css']
})
export class CustomtestComponent implements OnInit {
  fieldOneName;
  fieldTwoName;
  fieldThreeName;
  fieldFourName;
  enterUserName;
  userNameMandatoryMessage;
  userNameInvalid;
  enterPassword;
  passwordIsMandatory;
  passwordIsInvalid;
  firstFieldType;
  secondeFieldType;
  constructor() {

    this.fieldOneName="userName";
    this.fieldTwoName="passWord";
    this.fieldThreeName="Age";
    this.fieldFourName="Gender";
    this.enterUserName="Please Enter User Name";
    this.userNameMandatoryMessage="User Name is mandatory"
    this.userNameInvalid="User Name is invalid";
    this.enterPassword="Please Enter Password";
    this.passwordIsMandatory="Password is mandatory";
    this.passwordIsInvalid="Password is invalid";
    this.firstFieldType="text";
    this.secondeFieldType="password";
  }
  custom_Form:FormGroup;
  ngOnInit() {

    this.custom_Form=new FormGroup({
      userName:new FormControl("", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-z]+([ '-][a-zA-Z]+)*")])),
      passWord: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-z]+([ '-][a-zA-Z]+)*")])),
      Age:new FormControl(""),
      Gender:new FormControl(""),
    });
  }

}
