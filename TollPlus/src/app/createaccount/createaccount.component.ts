import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {AppComponent} from '../app.component';
import * as $ from 'jquery';
import {UtilityService} from "../services/common/utility.service";
import {Account} from "../pojo/account";
import {Email} from "../pojo/email";
import {Address} from "../pojo/address";
import {KYCDocument} from "../pojo/kycdocument";
import {Phone} from "../pojo/phone";
declare var populateCountries: any;
declare var businessCustomerTooltip:any;
@Component({

  selector: 'app-createacoount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  account=new Account();

  businessCustomerTooltip = 'Please Select Business Type';

  user_Form:FormGroup;
  vehicleForm:FormGroup;
  addtnl_Info_Form: FormGroup;
  form1;
  text:FormControl;
  constructor(private  myApp:AppComponent,private utilityService:UtilityService, private formBuilder:FormBuilder) {
    this.idProofFullPath='/pom.xml';
    this.addressProofFullPath='/pom.xml';
  }



  vehicleFormEdit:FormGroup;

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
  files = [];
  idProofFullPath;
  addressProofFullPath;
  userNameValidationResult;

  hearAboutUs=[];
  statementDelivOption=[];
  revenueCategory=[];


  public IdProofDropped(event) {
    this.files = event.files;
    //this.idProofFullPath=event.files[0].fileEntry.fullPath;
    this.idProofFullPath='/pom.xml';

    console.log(event.files[0].fileEntry.fullPath);
    /*for (file of event.files) {
     file.fileEntry.file(info => {
     console.log(info);
     });
     }*/
  }

  public IdProofFileOver(event){
  }

  public IdProofFileLeave(event){
  }
  public AddressProofDropped(event) {
    this.files = event.files;
    this.addressProofFullPath=event.files[0].fileEntry.fullPath;
    this.idProofFullPath='/pom.xml';
    console.log(this.addressProofFullPath);
  }


  public AddressProofFileOver(event){
  }

  public AddressProofFileLeave(event){
  }

  //vehicle dropdowns
  vehicleClassDropdowns=[];
  vehicleYear=[];
  vehicleColors=[];
  vehicleMake=[];
  vehicleModels=[];

  //additional information dropdowns
  howDidYouHearUsOptions=[];
  statementDeliveryOptions=[];
  accountCategories=[];

  ngOnInit() {
    this.getHearAboutUs();
    this.getStatementDelivOption();
    this.getRevenueCategory();
    let emailPattern = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    let emailPattern1 = "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)";

    this.user_Form=new FormGroup({
      first_Name:new FormControl("", Validators.compose([Validators.required,  Validators.pattern("[a-zA-z]+([ '-][a-zA-Z]+)*")])),
      last_Name: new FormControl("",Validators.compose([Validators.required,  Validators.pattern("[a-zA-z]+([ '-][a-zA-Z]+)*")])),
      businessCustomerType: new FormControl("", Validators.required),
      title: new FormControl(""),
      businessName: new FormControl("", Validators.required),
      suffix: new FormControl(""),
      middle_Name: new FormControl("", Validators.compose([Validators.required,  Validators.pattern("[a-zA-z]+([ '-][a-zA-Z]+)*"),Validators.maxLength(2)])),
      gender: new FormControl(""),
      date_Of_Birth: new FormControl(""),
      primary_Email: new FormControl("", Validators.compose([Validators.required,CreateaccountComponent.emailValidator])),
      secondary_Email: new FormControl("", Validators.compose([CreateaccountComponent.emailValidator])),
      day_Phone_Number: new FormControl("",Validators.compose([Validators.required, Validators.maxLength(10), CreateaccountComponent.validatePhoneNumber])),
      eveningPhone: new FormControl("",Validators.compose([CreateaccountComponent.validatePhoneNumber])),
      mobile_Phone_Number: new FormControl("",Validators.compose([Validators.required,CreateaccountComponent.validatePhoneNumber])),
      workPhone: new FormControl("", Validators.compose([CreateaccountComponent.validatePhoneNumber])),
      fax:new FormControl("",Validators.compose([Validators.required, CreateaccountComponent.validatePhoneNumber])),
      ext: new FormControl(""),
      country: new FormControl("", Validators.required),
      city_Name:new FormControl("", Validators.compose([Validators.required,  Validators.pattern("[a-zA-z]+([ '-][a-zA-Z]+)*")])),
      zip1: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(6)])),
      zip2: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(4)])),
      address1: new FormControl("",Validators.required),
      address2: new FormControl(""),
      idProofType: new FormControl("", Validators.required),
      idProofNo: new FormControl("", Validators.compose([Validators.required, Validators.pattern("[a-zA-z0-9]+([ '-][a-zA-Z0-9]+)*")])),
      idProofFileDrop: new FormControl(""),
      addressProof: new FormControl("", Validators.required),
      userName: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-z]+([ '-][a-zA-Z]+)*")])),
      agreeTermsAndConditions: new FormControl("", Validators.required),
      passWord: new FormControl("",Validators.required),
      selectedstate:new FormControl("", Validators.required),
      idProof_other: new FormControl(""),
      addressProof_other: new FormControl(""),
      addressProofFileDrop: new FormControl(""),
      preferredEmail:new FormControl("Primary Email"),
      preferredPhone: new FormControl("Day Phone"),


    });
    this.vehicleForm = new FormGroup({
      plateNumber:new FormControl("",Validators.compose([Validators.required, Validators.pattern("/[1-9]{1}[0-9]{9}$/")])),
      vehicle_Class_dropdown: new FormControl("", Validators.required),
      vehicle_Year: new FormControl(""),
      vehicle_Model: new FormControl(""),
      vehicle_Color: new FormControl(""),
      registered_Country:new FormControl(""),
      registeredState:new FormControl(""),
      isTemporaryLicencePlateNumber: new FormControl(""),

    });

    this.addtnl_Info_Form = new FormGroup({
      friendshipRewardAccountNo: new FormControl(""),
      howDidYouHearUs: new FormControl(""),
      statement_Delivery_Options: new FormControl(""),
      account_Category: new FormControl("")
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

    this.vehicleFormEdit=new FormGroup({
      plateNumber:new FormControl(""),
      vehicle_Class_dropdown:new FormControl(""),
      vehicle_Year: new FormControl(""),
      vehicle_Make: new FormControl(""),
      vehicle_Model:new FormControl(""),
      state:new FormControl(""),
      description:new FormControl(""),
      vehicle_Color:new FormControl(""),
      registered_Country:new FormControl(""),
      startEffectiveDate: new FormControl(""),
      endEffectiveDate:new FormControl(""),
      isTemporaryLicencePlateNumber: new FormControl(""),
      language: new FormControl("Java")
    });
    console.log("model driven result "+this.isLogin);
    this.getCountries();
    //this.getStates();
    this.getSuffix();
    this.getTitle();
    this.getGender();
    /*this.getAddressProof();
     this.getAddressProofBusiness();
     this.getIdProof();
     this.getIdProofBusiness();*/
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

    this.vehicleFormEdit=new FormGroup({
      plateNumber:new FormControl(item.currentTarget.getAttribute("data-Plat-No")),
      vehicle_Class_dropdown:new FormControl(item.currentTarget.getAttribute("data-Class")),
      vehicle_Year: new FormControl(""),
      vehicle_Make: new FormControl(""),
      vehicle_Model: new FormControl(""),
      state:new FormControl(item.currentTarget.getAttribute("data-State")),
      description:new FormControl(item.currentTarget.getAttribute("data-Description")),
      vehicle_Color:new FormControl(item.currentTarget.getAttribute("data-Color")),
      registered_Country:new FormControl(item.currentTarget.getAttribute("data-Country")),
      endEffectiveDate:new FormControl(item.currentTarget.getAttribute("data-End-Date"))

    });
    var startDate=item.currentTarget.getAttribute("data-Start-Date");

    $("#startEffectiveDate").val(startDate);



  }

  savePersonal=function(customerInfo){
    var primaryEmailIsPrefd=false;
    var secondaryEmailisPrfd=false;
    if(customerInfo.preferredEmail=="Primary Email"){
      primaryEmailIsPrefd=true;
      secondaryEmailisPrfd=false;
    }else{
      primaryEmailIsPrefd=false;
      secondaryEmailisPrfd=true;
    }
    var dayPhoneIsPrfd=false;
    var eveningPhoneIsPrfd=false;
    var workPhoneIsPrfd=false;
    var mobilePhoneIsPrfd=false;
    if(customerInfo.preferredPhone=="Day Phone"){
      dayPhoneIsPrfd=true;
      eveningPhoneIsPrfd=false;
      workPhoneIsPrfd=false;
      mobilePhoneIsPrfd=false;
    }
    if(customerInfo.preferredPhone=="Evening Phone"){
      dayPhoneIsPrfd=false;
      eveningPhoneIsPrfd=true;
      workPhoneIsPrfd=false;
      mobilePhoneIsPrfd=false;
    }
    if(customerInfo.preferredPhone=="Work Phone"){
      dayPhoneIsPrfd=false;
      eveningPhoneIsPrfd=false;
      workPhoneIsPrfd=true;
      mobilePhoneIsPrfd=false;
    }
    if(customerInfo.preferredPhone=="Mobile Phone"){
      dayPhoneIsPrfd=false;
      eveningPhoneIsPrfd=false;
      workPhoneIsPrfd=false;
      mobilePhoneIsPrfd=true;
    }

    this.account.accountId=0;
    this.account.sourcePkId=0;
    this.account.accountStatus="9";
    this.account.revenueCategory='Revenue';
    this.account.customerStatus='0';
    this.account.sourceOfEntry="0";
    this.account.accountType="";
    this.account.isNotificationsEnabled=false;
    this.account.retypePassword=customerInfo.passWord;
    this.account.addressType="6";
    this.account.line1="";
    this.account.line2="";
    this.account.line3="";
    this.account.city="";
    this.account.state="";
    this.account.country="";
    this.account.isCommunication=false;
    this.account.pin="";
    this.account.currentPasswordExpiryDate=this.getCurrentDate();
    this.account.address=null;
    var OrganizationName="";
    if(customerInfo.businessCustomerType=="Business") {
      OrganizationName = "Business";
    }else{
      OrganizationName = "Individual";
    }
    this.account.organizationName=OrganizationName;
    this.account.webType="";
    this.account.subSystem="1";
    this.account.isSplitCustomer=false;
    this.account.BoolActivityRequired=true;
    this.account.ConvertToCustomer=false;
    this.account.actionCode="";
    this.account.featuresCode="";
    this.account.keyValue=""
    this.account.user="SureIT";// Logged in user User Name
    this.account.loginId=0;
    this.account.activityTypeDescription=""
    this.account.checkBlockList=true
    this.account.kYCStatus="Received"
    this.account.kYCDate=this.getCurrentDate()
    this.account.kYCRequired=true // false : If it's optional
    this.account.loginStatus=""
    this.account.unPaidAmount=0
    this.account.planCode=""
    this.account.planDescription=""
    this.account.parentPlanId=0
    this.account.parentPlanCode=""
    this.account.parentPlanDescription=""
    this.account.enrollmentNumber=""
    this.account.isRegistered=false
    this.account.preloadedAccountId=0
    this.account.isCreateAccount=true
    this.account.isPrimary=false
    this.account.userName=customerInfo.userName;
    this.account.password=customerInfo.passWord;
    this.account.firstName=customerInfo.first_Name;
    this.account.lastName=customerInfo.last_Name;
    this.account.dOB=this.getCurrentDate();//$("#date_Of_Birth").val();
    this.account.gender=customerInfo.gender;
    this.account.suffix=customerInfo.suffix;
    this.account.title=customerInfo.title;
    //this.account.city=customerInfo.city;
    //this.account.country=customerInfo.country;
    this.account.zip1=customerInfo.zip1;
    this.account.zip2=customerInfo.zip2;
    this.account.activitySource="0";
    this.account.contactId=0;
    this.account.initiatedBy="SureIT";
    this.account.middleName=customerInfo.middle_Name;
    this.account.nameType="6";
    this.account.parentId=0;
    this.account.planDescription="";
    this.account.userId=12345;
    this.account.loginId=12345;
    this.account.userType="7";
    this.account.email={};
    //Email List
    var primaryEmail=this.getEmailObject();
    primaryEmail.emailAddress=customerInfo.primary_Email;
    primaryEmail.isPreferred=primaryEmailIsPrefd;
    primaryEmail.type='PrimaryEmail';
    var secondaryEmail=this.getEmailObject();
    secondaryEmail.emailAddress=customerInfo.secondary_Email;
    secondaryEmail.isPreferred=secondaryEmailisPrfd;
    secondaryEmail.type='SecondaryEmail';
    var emailAddressArray:Email[]=[];
    emailAddressArray[0]=primaryEmail;
    emailAddressArray[1]=secondaryEmail;
    this.account.emailList=emailAddressArray;


    //Address List
    var addressObject:Address=this.getAddressObject();
    addressObject.line1=customerInfo.address1;
    addressObject.line2=customerInfo.address2;
    addressObject.line3=customerInfo.address2;
    addressObject.city=customerInfo.city_Name;
    addressObject.country=customerInfo.country;
    addressObject.state=customerInfo.selectedstate;
    addressObject.zip1=customerInfo.zip1;
    addressObject.zip2=customerInfo.zip2;
    addressObject.state=customerInfo.selectedstate;
    var addressArray:Address[]=[];
    console.log(" addressObject "+addressObject);
    addressArray[0]=addressObject;
    this.account.addressList=addressArray;

    //KYC List
    var kYCDocumentIdProof:KYCDocument=this.getKYCDocumentObject();
    kYCDocumentIdProof.documentNumber=customerInfo.idProofNo;
    kYCDocumentIdProof.documentType=customerInfo.businessCustomerType;
    kYCDocumentIdProof.description=customerInfo.businessCustomerType;
    if(customerInfo.businessCustomerType=="Business") {
      kYCDocumentIdProof.documentCategory = "IDProofBusiness";
      kYCDocumentIdProof.documentCategoryDesc= "IDProofBusiness";
    }else{
      kYCDocumentIdProof.documentCategory = "IDProof";
      kYCDocumentIdProof.documentCategoryDesc= "Individual";
    }
    var kYCDocumentAddressProof:KYCDocument=this.getKYCDocumentObject();
    kYCDocumentAddressProof.documentType=customerInfo.businessCustomerType;
    kYCDocumentAddressProof.description=customerInfo.businessCustomerType;
    kYCDocumentAddressProof.documentNumber=customerInfo.addressProof;
    if(customerInfo.businessCustomerType=="Business") {
      kYCDocumentAddressProof.documentCategory = "AddressProofBusiness";
      kYCDocumentAddressProof.documentCategoryDesc= "AddressProofBusiness";
    }else{
      kYCDocumentAddressProof.documentCategory = "AddressProof";
      kYCDocumentAddressProof.documentCategoryDesc= "AddressProof";
    }
    kYCDocumentIdProof.documentPath=this.idProofFullPath;
    kYCDocumentAddressProof.documentPath=this.addressProofFullPath;
    var KYCDocumentArray:KYCDocument[]=[];
    KYCDocumentArray[0]=kYCDocumentIdProof;
    KYCDocumentArray[1]=kYCDocumentAddressProof;
    this.account.addKYCDocument=KYCDocumentArray;


    //Phone List
    var dayPhone:Phone=this.getPhoneObject();
    dayPhone.phoneNumber=$("#day_Phone_Number").val();
    dayPhone.type="DayPhone";
    dayPhone.isCommunication=dayPhoneIsPrfd;
    var eveningPhone:Phone=this.getPhoneObject();
    eveningPhone.phoneNumber=$("#eveningPhone").val();
    eveningPhone.isCommunication=eveningPhoneIsPrfd;
    eveningPhone.type="EveningPhone";
    var mobile_Phone_Number:Phone=this.getPhoneObject();
    mobile_Phone_Number.phoneNumber=$("#mobile_Phone_Number").val();
    mobile_Phone_Number.isCommunication=mobilePhoneIsPrfd;
    mobile_Phone_Number.type="MobileNo";
    var workPhone:Phone=this.getPhoneObject();
    workPhone.phoneNumber=$("#workPhone").val();
    workPhone.isCommunication=workPhoneIsPrfd;
    workPhone.type="WorkPhone";
    var phoneFax:Phone=this.getPhoneObject();
    phoneFax.phoneNumber=$("#fax").val();
    phoneFax.isCommunication=false;
    phoneFax.type="Fax";
    var phoneArray:Phone[]=[];
    phoneArray[0]=dayPhone;
    phoneArray[1]=eveningPhone;
    phoneArray[2]=mobile_Phone_Number;
    phoneArray[3]=workPhone;
    phoneArray[4]=phoneFax;
    this.account.phoneList=phoneArray;





    var tempInputObj=JSON.stringify(this.account);
    tempInputObj=tempInputObj.replace("EmailList","Request Email List");
    tempInputObj=tempInputObj.replace("PhoneList","Request Phone List");
    tempInputObj=tempInputObj.replace("AddressList","Request Address List");
    tempInputObj=tempInputObj.replace("AddKYCDocument","KYC Document List");
    console.log(tempInputObj);
    this.utilityService.saveCustomer("PostCreateCustomer",tempInputObj).subscribe(res=>{

      var resObj=JSON.parse(res._body);
      console.log(resObj.ResultValue);
      if(resObj.Result==false){
        this.userNameValidationResult=resObj.ResultValue;
        alert(resObj.ResultValue);

      }else{
        alert(" Customer  Successfully Registered ");
      }


    })

    /*this.newService.savePersonal(customerPersonal).subscribe(res=>
     {
     var resObj=JSON.parse(res._body);
     console.log("response "+resObj);

     });*/
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
      this.addressProofs= resObj.ResultValue;


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
      this.idProofs = resObj.ResultValue;


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

  suffixOther=function () {

    var suff=$("#suffix").val();
    if(suff=="Other") {
      $("#suffix_other_row").show();
    }else{
      $("#suffix_other_row").hide();
    }
  }


  idProofOther=function () {

    var idProofOthr=$("#idProof_other").val();
    if(idProofOthr=="Other") {
      $("#idProof_other_row").show();
    }else{
      $("#idProof_other_row").hide();
    }
  }
  addressProofOther=function () {

    var addrProofOthr=$("#addressProof_other").val();
    if(addrProofOthr=="Other") {
      $("#addressProof_other_row").show();
    }else{
      $("#addressProof_other_row").hide();
    }
  }




  changeIdProofAndAddressProofDropDown=function () {

    //alert($("#businessCustomerType").val());
    var accType=$("#businessCustomerType").val();
    if(accType=='Business'){
      this.getAddressProofBusiness();
      this.getIdProofBusiness();
    }else{
      this.getIdProof();
      this.getAddressProof();
    }

  }


  getEmailObject=function () {
    let  email=new Email();
    email.emailId=0;
    email.customerId=0;
    email.userName='SureIT';
    email.isActive=true;
    email.paging={};
    email.subSystem='1';
    email.activitySource='0';
    email.isActivityRequired =true;
    email.userId=0;
    email.loginId=0;
    email.checkBlockList=false;
    email.isValid=true;
    return email;
  }
  getAddressObject=function () {
    var addrObj=new Address();
    addrObj.addressId=0;
    addrObj.customerId=0;
    addrObj.type='Primary';
    addrObj.isPreferred=true;
    addrObj.fullAddress="";
    addrObj.userName="SureIT";
    addrObj.isActive=true;
    addrObj.paging={};
    addrObj.subSystem="1";
    addrObj.activitySource ="0";
    addrObj.isActivityRequired=true;
    addrObj.userId=0;
    addrObj.loginId=0;
    addrObj.countryName="";
    addrObj.stateName="";
    addrObj.checkBlockList=false;
    addrObj.isInvalidAddress=true;
    addrObj.reasonCode="";
    addrObj.isShipmentupdateAddress=false;

    return addrObj;
  }



  getKYCDocumentObject=function () {
    var kYCDocument=new KYCDocument();
    kYCDocument.customerId=0;
    kYCDocument.documentTypeId=0;
    kYCDocument.documentTypeName="";
    kYCDocument.documentStatusID=0;
    kYCDocument.documentStatus="Received";
    kYCDocument.isVerified=true;
    kYCDocument.uploadedBy=12345;
    kYCDocument.createdUser="SureIT";
    kYCDocument.updatedUser="SureIT";
    kYCDocument.userId=1232131;
    kYCDocument.loginId=1232131;
    kYCDocument.user="SureIT";
    kYCDocument.activitySource="Internal";
    kYCDocument.subSystem="CSC";
    kYCDocument.documentId=0;
    kYCDocument.documentPreviousStatus=false;
    kYCDocument.moduleName="";
    kYCDocument.isDocumentProofChanged=true;
    kYCDocument.documentStatusDate=this.getCurrentDate();
    kYCDocument.receivedDate=this.getCurrentDate();
    kYCDocument.uploadedDate=this.getCurrentDate();
    kYCDocument.verifiedDate=this.getCurrentDate();
    kYCDocument.isUploaded=true;
    kYCDocument.isReceived=true;
    return kYCDocument;
  }

  getPhoneObject=function () {
    var phone=new Phone();
    phone.phoneId=0;
    phone.customerId =0;
    phone.extension="";
    phone.userName="SureIT";
    phone.paging={};
    phone.subSystem="1";
    phone.activitySource="0";
    phone.isActive=true;
    phone.isActivityRequired=true;
    phone.userId=0;
    phone.loginId=0;
    phone.checkBlockList=false;
    phone.isPhoneNumberChanged=false;
    phone.checkBlockList=false;
    phone.isCreateAccount=true;
    return phone;
  }

  getCurrentDate=function () {
    return "\/Date(1245398693390)\/";

  }
  validateUserName=function () {
    var userName=$("#userName").val();

    if(userName.length>5) {
      var inputObj = {
        "strUsername": userName
      };
      this.utilityService.valiateUserName("PostIsExist/?enumActivityType=Username",inputObj).subscribe(res=>
      {
        var resObj=JSON.parse(res._body);
        console.log("response "+resObj.Result);
        if(resObj.Result==false){
          this.userNameValidationResult=resObj.ResultValue;
          $("#userNameAlreadyExistMessage").fadeTo(1000, 500).slideUp(2000, function(){
            $("#userNameAlreadyExistMessage").hide();
          });
        }
        /*$("#userNameAlreadyExistMessage").fadeTo(1000, 500).slideUp(500, function(){
         $("#userNameAlreadyExistMessage").hide();
         });*/


      });
    }
  }




  static emailValidator(control) {
    // RFC 2822 compliant regex
    ///[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (control.value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static validateNumber(control){
    if(control.value.match("^[0-9]*$")){
      return null;
    }else {
      return {'invalidNumber': true};
    }
  }

  static validatePhoneNumber(control) {

    /* if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
     return null;
     } else {
     return { 'invalidEmailAddress': true };
     }*/
    //validate phone numbers of format "1234567890"
    if (control.value.match("\\d{10}")){return null;}
    //validating phone number with -, . or spaces
    else if(control.value.match("\\d{3}[-\\.\\s]\\d{3}[-\\.\\s]\\d{4}")){return null;}
    //validating phone number with extension length from 3 to 5
    else if(control.value.match("\\d{3}-\\d{3}-\\d{4}\\s(x|(ext))\\d{3,5}")) {return null;}
    //validating phone number where area code is in braces ()
    else if(control.value.match("\\(\\d{3}\\) \\d{3}-\\d{4}")) {return null;}
    //return false if nothing matches the input
    else {
      return {'invalidPhoneNumber': true};
    }

  }

//vehicle dropdown functions starts here
  getVehicleClassDropdown=function () {

  }

  getVehicleYearDropdown=function () {

  }

  getVehicleColorDropdown=function () {

  }

  getVehicleMakeDropdown=function () {

  }

  getVehicleModelsDropdown=function () {

  }

//vehicle dropdown functions ends here

  //additional information functions starts here
  getHowDidYouHearDropdown=function () {

  }
  getStatementDeliveryOptionsDropdown=function () {

  }
  getAccountCategories=function () {

  }


  getHearAboutUs=function(){

    this.utilityService.getHearAboutUs("GetLookups/?Type=SourceOfChannel").subscribe(res=>
    {
      var resObj=JSON.parse(res._body);
      this.hearAboutUs = resObj.ResultValue;
    });

  }
  getStatementDelivOption=function(){
    this.utilityService.getStatementDelivOption("GetLookups/?Type=StatementDelivery").subscribe(res=>
    {
      var resObj=JSON.parse(res._body);
      this.statementDelivOption = resObj.ResultValue;
    });
  }
  getRevenueCategory=function(){
    this.utilityService.getRevenueCategory("GetLookups/?Type=RevenueCategory").subscribe(res=>
    {
      var resObj=JSON.parse(res._body);
      this.revenueCategory = resObj.ResultValue;
    });
  }

  validateAllFields=function (control) {
    debugger;
    //this.user_Form.controls['idProofFileDrop'].
    if(this.user_Form.valid){
      return null;
    }else {
      alert('Required Fields are not Entered/Selected. Please verify');
      return {'Mandatory Fields are not Entered/Selected. ':true};
    }
  }

  convertNumbertoUSFormat=function (idVal) {
    debugger;
    var tempPhone="";
    if($("#"+idVal+"").val().length==10){
       tempPhone="(";
      tempPhone=tempPhone+$("#"+idVal+"").val().substring(0,3)+") "+$("#"+idVal+"").val().substring(3,6)+"-"+$("#"+idVal+"").val().substring(6,11);


      if(idVal=="day_Phone_Number"){
        this.user_Form.value.day_Phone_Number = tempPhone;
        this.user_Form.controls.day_Phone_Number.setValue = tempPhone;
      }
      if(idVal=="eveningPhone"){
        this.user_Form.value.eveningPhone = tempPhone;
      }
      if(idVal=="workPhone"){
        this.user_Form.value.workPhone = tempPhone;
      }
      if(idVal=="mobile_Phone_Number"){
        this.user_Form.value.mobile_Phone_Number = tempPhone;
      }
      if(idVal=="fax"){
        this.user_Form.value.fax = tempPhone;
      }
      $("#"+idVal+"").val(tempPhone);

    }else{
      tempPhone=$("#"+idVal+"").val();
      $("#"+idVal+"").val(tempPhone);
    }


  }





}
