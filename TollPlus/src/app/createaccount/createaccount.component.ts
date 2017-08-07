import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {AppComponent} from './../app.component';
import * as $ from 'jquery';
import {UtilityService} from "../services/common/utility.service";
declare var populateCountries: any;
declare var businessCustomerTooltip:any;
@Component({

  selector: 'app-createacoount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {


  businessCustomerTooltip = 'Please Select Business Type';

  user_Form:FormGroup;
  form1;
  text:FormControl;
  constructor(private  myApp:AppComponent,private utilityService:UtilityService, private formBuilder:FormBuilder) {

  }



  form:FormGroup;
  editVehicleForrm:FormGroup;
  isLogin:boolean;
  Selections = [];
  TagDetails = [];
  ServiceType = [];
  shippingAddress = [];
  addressSelection = [];
  amountSummaryDetails = [];
  billingAddress = [];
  paymentMethods = [];
  Options = [];

  businesses=[];
  businessCustomers=[];
  countries=[];
  countryObject:Object={};
  states=[];
  suffixs=[];
  titles=[];
  genders=[];
  addressProofs=[];
  addressProofBusinesses=[];
  idProofs=[];
  idProofBusinesses=[];
  ngOnInit() {

    let emailPattern = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    let emailPattern1 = "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)";

    this.user_Form=new FormGroup({
      first_Name:new FormControl("", Validators.compose([Validators.required,  Validators.pattern("[a-zA-z]+([ '-][a-zA-Z]+)*")])),
      last_Name: new FormControl("",Validators.required),
      businessCustomerType: new FormControl("", Validators.required),
      title: new FormControl(""),
      businessName: new FormControl("", Validators.required),
      suffix: new FormControl(""),
      middle_Name: new FormControl(""),
      gender: new FormControl(""),
      date_Of_Birth: new FormControl(""),
      primary_Email: new FormControl("", Validators.compose([Validators.required,CreateaccountComponent.emailValidator])),
      secondary_Email: new FormControl(""),
      day_Phone_Number: new FormControl("",Validators.compose([Validators.required, Validators.pattern("/[1-9]{1}[0-9]{9}$/")])),
      mobile_Phone_Number: new FormControl("",Validators.compose([Validators.required, Validators.pattern("/[1-9]{1}[0-9]{9}$/")])),
      eveningPhone: new FormControl(""),
      workPhone: new FormControl(""),
      fax:new FormControl(""),
      ext: new FormControl(""),
      country: new FormControl("", Validators.required),
      city: new FormControl(""),
      zip1: new FormControl(""),
      zip2: new FormControl(""),
      address1: new FormControl("",Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern("/[a-zA-Z0-9]/")])),
      address2: new FormControl(""),
      idProofType: new FormControl(""),
      idProofNo: new FormControl(""),
      addressProof: new FormControl(""),
      userName: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("[a-zA-z]+([ '-][a-zA-Z]+)*")]))
    });

    /*this.userForm.get('businessCustomerType').valueChanges.subscribe(
      (businessCustomerType)=>{
        if(businessCustomerType == '1'){
          this.userForm.get('businessCustomerType').setValidators([Validators.required]);
          this.businessCustomerTooltip = 'Select correct customer type';
        }
        this.userForm.get('businessCustomerType').updateValueAndValidity();

      }
    )*/

    $(document).ready(function() {


      $('<link>').appendTo('head').attr({type: 'text/css',rel: 'stylesheet',href: "./../../assets/datepicker/datepicker.min.css"});
      $.getScript( "./../../assets/datepicker/datepicker.min.js" );
      $.getScript( "./../../assets/datepicker/datepicker.en.js" );



      $('.collapse').on('shown.bs.collapse', function(){
        $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
      }).on('hidden.bs.collapse', function(){
        $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
      });


      $('.btnNext').click(function(){
        //alert("next "+$('.nav-tabs > .active').next('li').find('a').getAttribute("href"));
        $('.nav-tabs > .active').next('li').find('a').click(function() {
          // 'this' is not a jQuery object, so it will use
          // the default click() function
          this.click();
        }).click();
      });

      $('.btnPrevious').click(function(){
        //alert("previous "+$('.nav-tabs > .active').prev('li').find('a'));
        $('.nav-tabs > .active').prev('li').find('a').click(function() {
          // 'this' is not a jQuery object, so it will use
          // the default click() function
          this.click();
        }).click();
      });
      /*$('#modalDiag').click('on', function (item) {
       alert("click "+item.attributes['data-id'].value);

       })*/
      /*$(document).on("click", ".glyphicon-edit", function(item) {
       alert($(".glyphicon-edit").attributes['data-id'].value);
       //alert(item.attributes['data-id'].value);
       });*/

      /*populateCountries("country", "state"); // first parameter is id of country drop-down and second parameter is id of state drop-down
      populateCountries("country2");
      populateCountries("country2");
      */

    });





    //this.isLogin=this.newService.getLogin();
    this.myApp.isLogin=true;
    console.log("model driven result "+this.isLogin);
    this.Options = [
      {name: 'OptionA', value: '1', checked: true},
      {name: 'OptionB', value: '2', checked: true},
      {name: 'OptionC', value: '3', checked: true},
      {name: 'OptionD', value: '4', checked: true}
    ]

    this.paymentMethods = [
      {
        id: 1,
        description: 'Credit Card'

      },
      {
        id: 2,
        description: 'Bank Account'
      },
      {
        id: 3,
        description: 'Check'
      },
      {
        id: 4,
        description: 'Cash',

      },
      {
        id: 5,
        description: 'Money Order'
      },
      {
        id: 6,
        description: 'Gift Certificate'
      }
    ];
    this.billingAddress = [
      {
        id: 1,
        description: 'Same as Shipping Address',

      },
      {
        id: 2,
        description: 'Use Existing Address'
      },
      {
        id: 3,
        description: 'Add New Address'
      }
    ];

    this.amountSummaryDetails = [
      {
        description: 'Toll Balance',
        amount: '25.00'
      },
      {
        description: 'Total Tag Fee',
        amount: '25.00'
      },
      {
        description: 'Enroll Fee',
        amount: '25.00'
      },
      {
        description: 'Total Tag Deposit',
        amount: '25.00'
      },
      {
        description: 'Sub Total',
        amount: '25.00'
      },
      {
        description: 'Service Tax',
        amount: '25.00'
      },
      {
        description: 'Shiiping Charge',
        amount: '25.00'
      },
      {
        description: 'Total Amount',
        amount: '25.00'
      }
    ];


    this.addressSelection = [
      {
        id: 1,
        description: 'Address1, line 2, 3452345',

      },
      {
        id: 2,
        description: 'Address2, line 2, 3452345'
      }
    ];

    this.shippingAddress = [
      {
        id: 1,
        description: 'Use Existing Address',

      },
      {
        id: 2,
        description: 'Add New Address'
      }
    ];
    this.ServiceType = [
      {
        id: 1,
        description: 'US Mail'
      },
      {
        id: 2,
        description: 'FedEx'
      }
    ];
    this.Selections = [
      {
        id: 1,
        description: 'Transponder Toll'
      },
      {
        id: 2,
        description: 'Video Toll'
      }
    ];

    this.TagDetails = [
      {
        protocol: '6C',
        mounting: 'Transponder1',
        noOftags: '10',
        perTagFee: '10',
        perTagDeposit: '35'
      },
      {
        protocol: '6C',
        mounting: 'Transponder2',
        noOftags: '20',
        perTagFee: '10',
        perTagDeposit: '35'
      },
      {
        protocol: '6C',
        mounting: 'Transponder3',
        noOftags: '30',
        perTagFee: '10',
        perTagDeposit: '35'
      }
    ];

    this.form=new FormGroup({
      firstName:new FormControl("",Validators.compose([Validators.required,
        Validators.minLength(3),
        Validators.pattern('[\\w\\-\\w\\/]+')])),
      platNo: new FormControl(""),
      class: new FormControl(""),
      state: new FormControl(""),
      description: new FormControl(""),
      color: new FormControl(""),
      country: new FormControl(""),
      startEffectiveDate: new FormControl(""),
      endEffectiveDate: new FormControl(""),

      language: new FormControl("Java")
    });
    console.log("model driven result "+this.isLogin);
    this.getCountries();
    //this.getStates();
    this.getSuffix();
    this.getTitle();
    this.getGender();
    this.getAddressProof();
    this.getAddressProofBusiness();
    this.getIdProof();
    this.getIdProofBusiness();
    this.getBusiness();
    this.getBusinessCustomer();
  }


  testValidations(control){
    if(control.value.length<3){

      return {"lastName":true};
    }
    else{
      return {"lastName":false};
    }
  }


  editRecord=function(item) {
    console.log(" "+item.currentTarget.getAttribute("data-Plat-No"));

    this.form=new FormGroup({
      firstName:new FormControl(item.currentTarget.getAttribute("data-Plat-No")),
      platNo:new FormControl(item.currentTarget.getAttribute("data-Plat-No")),
      class:new FormControl(item.currentTarget.getAttribute("data-Class")),
      state:new FormControl(item.currentTarget.getAttribute("data-State")),
      description:new FormControl(item.currentTarget.getAttribute("data-Description")),
      color:new FormControl(item.currentTarget.getAttribute("data-Color")),
      country:new FormControl(item.currentTarget.getAttribute("data-Country")),
      endEffectiveDate:new FormControl(item.currentTarget.getAttribute("data-End-Date"))

    });
    var startDate=item.currentTarget.getAttribute("data-Start-Date");

    $("#startEffectiveDate").val(startDate);



  }

  savePersonal=function(customerPersonal){
    //console.log(userInfo);
    this.newService.savePersonal(customerPersonal).subscribe(res=>
    {
      var resObj=JSON.parse(res._body);
      console.log("response "+resObj);

    });
  }
  saveAddress=function(customerPersonal){
    //console.log(userInfo);
    this.newService.saveAddress(customerPersonal).subscribe(res=>
    {
      var resObj=JSON.parse(res._body);
      console.log("response "+resObj);

    });
  }
  updateUser=function(updatedUserInfo){
    console.log(updatedUserInfo);

  }


  getCountries=function () {
    this.utilityService.getCountries("GetCountries").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.countries = resObj.ResultValue;
      //console.log("countries" + resObj.ResultValue);
      //console.log(typeof  resObj)
    })
  };

  getStates=function(){
this.countryObject={
  "LookUpTypeCode" : "TollSchedulePriorities",
  "CountryCode" :$("#countryId").val()};
console.log(this.countryObject);
    this.utilityService.getStates("PostGetStatesByCountryCode",JSON.stringify(this.countryObject)).subscribe(res=>{

      var resObj=JSON.parse(res._body);
      console.log(resObj.StateCode);
      this.states = resObj.ResultValue;
      /*for(var i=0;i<resObj.ResultValue.length;i++){
        console.log(resObj.ResultValue[i].StateCode);
      }*/
      //var resObj=JSON.parse(res._body);
      //console.log(typeof  resObj)
      //this.states = res._body.ResultValue;
      //console.log("countrie List " + res._body);

    })
  };


  getSuffix=function () {
    this.utilityService.getDropDownValues("GetLookups/?Type=Suffix").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.suffixs = resObj.ResultValue;


    })

  }
  getTitle=function () {
    this.utilityService.getDropDownValues("GetLookups/?Type=Title").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.titles = resObj.ResultValue;


    })

  }
  getGender=function () {
    this.utilityService.getDropDownValues("GetLookups/?Type=Gender").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.genders = resObj.ResultValue;


    })

  }
  getAddressProof=function () {
    this.utilityService.getDropDownValues("GetLookups/?Type=AddressProof").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.addressProofs = resObj.ResultValue;


    })

  }
  getAddressProofBusiness=function () {
    this.utilityService.getDropDownValues("GetLookups/?Type=AddressProofBusiness").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.addressProofBusinesses = resObj.ResultValue;


    })

  }
  getIdProof=function () {
    this.utilityService.getDropDownValues("GetLookups/?Type=IDProof").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.idProofs = resObj.ResultValue;


    })

  }
  getIdProofBusiness=function () {
    this.utilityService.getDropDownValues("GetLookups/?Type=IDProofBusiness").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.idProofBusinesses = resObj.ResultValue;


    })

  }


  getBusiness=function () {
    this.utilityService.getDropDownValues("GetLookups/?Type=Business").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.businesses = resObj.ResultValue;

    })

  }
  getBusinessCustomer=function () {
    this.utilityService.getDropDownValues("GetLookups/?Type=Business&Customer").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.businessCustomers = resObj.ResultValue;

    })

  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static validatePhoneNumber(control) {

   /* if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }*/
  //validate phone numbers of format "1234567890"
  if (control.value.matches("\\d{10}")){return true;}
  //validating phone number with -, . or spaces
  else if(control.value.matches("\\d{3}[-\\.\\s]\\d{3}[-\\.\\s]\\d{4}")){return true;}
  //validating phone number with extension length from 3 to 5
  else if(control.value.matches("\\d{3}-\\d{3}-\\d{4}\\s(x|(ext))\\d{3,5}")) {return true;}
  //validating phone number where area code is in braces ()
  else if(control.value.matches("\\(\\d{3}\\)-\\d{3}-\\d{4}")) {return true;}
  //return false if nothing matches the input
  else {
    return {'invalidPhoneNumber': true};
  }

}

  /*
   form;
   ngOnInit() {
   this.form=new FormGroup({
   decimal:new FormControl(""),
   binary: new FormControl(""),
   octal: new FormControl(""),
   hexa: new FormControl(""),
   });
   }

   decimalChanged=function(oldValue,newValue){
   if(newValue!=""){
   this.form.patchValue({binary: parseInt(newValue,10).toString(2)});
   this.form.patchValue({octal: parseInt(newValue,10).toString(8)});
   this.form.patchValue({hexa: parseInt(newValue,10).toString(16)});
   }else{
   this.form.patchValue({binary: ""});
   this.form.patchValue({octal: ""});
   this.form.patchValue({hexa: ""});
   }
   }*/




}
