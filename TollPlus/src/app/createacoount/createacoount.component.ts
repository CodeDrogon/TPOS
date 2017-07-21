import { Component, OnInit } from '@angular/core';
import {MyDataService} from './../my-data.service';
import {FormGroup, FormControl, NgModelGroup,Validators} from '@angular/forms';
import {AppComponent} from './../app.component';
import $ from 'jquery';
declare var populateCountries: any;

@Component({
  selector: 'app-createacoount',
  templateUrl: './createacoount.component.html',
  styleUrls: ['./createacoount.component.css']
})
export class CreateacoountComponent implements OnInit {



  constructor(private newService:MyDataService,
              private  myApp:AppComponent) { }

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
  ngOnInit() {

    $(document).ready(function() {


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

      populateCountries("country", "state"); // first parameter is id of country drop-down and second parameter is id of state drop-down
      populateCountries("country2");
      populateCountries("country2");

    });





    this.isLogin=this.newService.getLogin();
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

    $("#startEffectiveDate").value(startDate);



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
