import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {AppComponent} from '../app.component';
import * as $ from 'jquery';
import {UtilityService} from '../services/common/utility.service';
import {Account} from '../pojo/account';
import {Email} from '../pojo/email';
import {Address} from '../pojo/address';
import {KYCDocument} from '../pojo/kycdocument';
import {Phone} from '../pojo/phone';
import {Vehicle} from '../pojo/Vehicle';
import {CustomValidator} from 'app/services/common/custom-validator';
import {AdditionalInformation} from "../pojo/AdditionalInformation";
declare var populateCountries: any;
declare var businessCustomerTooltip: any;
@Component({

  selector: 'app-createacoount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  account= new Account();
  vehicle_Modal= new Vehicle();
  vehicleArray= [];
  vehicleModelArrays = [];
  isVehicleExists= false;
  businessCustomerTooltip = 'Please Select Business Type';

  user_Form: FormGroup;
  vehicleForm: FormGroup;
  addtnl_Info_Form: FormGroup;
  form1;
  text: FormControl;
  constructor(private  myApp: AppComponent, private utilityService: UtilityService, private formBuilder: FormBuilder) {
    this.idProofFullPath = '/pom.xml';
    this.addressProofFullPath = '/pom.xml';
  }



  vehicleFormEdit: FormGroup;

  isLogin: boolean;
  Selections = [];
  TagDetails = [];
  ServiceType = [];
  shippingAddress = [];
  addressSelection = [];
  amountSummaryDetails = [];
  billingAddress = [];
  paymentMethods = [];
  Options = [];

  businesses= [];
  businessCustomers= [];
  countries= [];
  countryObject: Object= {};
  states= [];
  suffixs= [];
  titles= [];
  genders= [];
  addressProofs= [];
  addressProofBusinesses= [];
  idProofs= [];
  idProofBusinesses= [];
  files = [];
  idProofFullPath;
  addressProofFullPath;
  userNameValidationResult;

  hearAboutUs= [];
  statementDelivOption= [];
  revenueCategory= [];

//vehicle dropdowns
  vehicleClassDropdown= [];
  vehicleYearDropdown= [];
  vehicleColors= [];
  vehicleMake= [];
  vehicleModels= [];

  //additional information dropdowns
  howDidYouHearUsOptions= [];
  statementDeliveryOptions= [];
  accountCategories= [];


  public IdProofDropped(event) {
    this.files = event.files;

    //this.idProofFullPath=event.files[0].fileEntry.fullPath;
    this.idProofFullPath = '/pom.xml';
    $(".idProofFileDropColor").css("border"," 2px dotted green");
    $(".idProofFileDropColor").css("border-radius"," 30px");
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
    this.addressProofFullPath = event.files[0].fileEntry.fullPath;
    this.idProofFullPath = '/pom.xml';
    $(".addressProofFileDropColor").css("border"," 2px dotted green");
    $(".addressProofFileDropColor").css("border-radius"," 30px");
    console.log(this.addressProofFullPath);
  }


  public AddressProofFileOver(event){
  }

  public AddressProofFileLeave(event){
  }



  ngOnInit() {
    this.getHearAboutUs();
    this.getStatementDelivOption();
    this.getRevenueCategory();

    const emailPattern = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    const emailPattern1 = '/[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)';

    this.userFormInitialValue();

    this.addtnl_Info_Form = new FormGroup({
      friendshipRewardAccountNo: new FormControl(''),
      howDidYouHearUs: new FormControl(''),
      statement_Delivery_Options: new FormControl('', Validators.required),
      account_Category: new FormControl('')
    });



    $(document).ready(function() {
      $('.my-link').bind('click', false);

      $('<link>').appendTo('head').attr({type: 'text/css', rel: 'stylesheet', href: './../../assets/datepicker/datepicker.min.css'});
      $.getScript( './../../assets/datepicker/datepicker.min.js' );
      $.getScript( './../../assets/datepicker/datepicker.en.js' );



      $('.collapse').on('shown.bs.collapse', function(){
        $(this).parent().find('.glyphicon-plus').removeClass('glyphicon-plus').addClass('glyphicon-minus');
      }).on('hidden.bs.collapse', function(){
        $(this).parent().find('.glyphicon-minus').removeClass('glyphicon-minus').addClass('glyphicon-plus');
      });


      $('.btnNext').click(function(){

        $('.my-link').unbind('click', false);
        $(".nav-tabs > .active .badge").text('✔');
        $(".nav-tabs > .active .badge").css("color","lightgreen");
        $(".nav-tabs > .active .badge").css("background-color","forestgreen");
        //alert("next "+$('.nav-tabs > .active').next('li').find('a').getAttribute("href"));
        $('.nav-tabs > .active').next('li').find('a').click(function() {
          // 'this' is not a jQuery object, so it will use
          // the default click() function
          this.click();
        }).click();

        $('.my-link').bind('click', false);
      });

      $('.btnPrevious').click(function(){
        $('.my-link').unbind('click', false);
        //alert("previous "+$('.nav-tabs > .active').prev('li').find('a'));
        $('.nav-tabs > .active').prev('li').find('a').click(function() {
          // 'this' is not a jQuery object, so it will use
          // the default click() function
          this.click();
        }).click();
        $('.my-link').bind('click', false);
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
    this.myApp.isLogin = true;
    console.log('model driven result ' + this.isLogin);
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

    /*this.vehicleClassDropdown = [
     {
     key: 1,
     value: 'Class1'
     },
     {
     key: 2,
     value: 'Class2'
     },
     {
     key: 3,
     value: 'Class3'
     }
     ]*/

    this.vehicleForm = this.vehicleFormInitialValues();
    this.vehicleFormEdit = this.vehicleFormInitialValues();

    console.log('model driven result ' + this.isLogin);
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
    this.getVehicleClassDropdown();
    this.getVehicleYearDropdown();
    this.getVehicleColorDropdown();
    this.getVehicleModelsDropdown();
  }


  testValidations(control){
    if (control.value.length < 3){

      return {'lastName': true};
    }
    else{
      return {'lastName': false};
    }
  }


  editVehicle= function(editableVehicleObj) {
    debugger;
    this.getStatesForDialogue(editableVehicleObj.Country);
    const editVehicleStartDate = new Date(editableVehicleObj.StartEffectiveDate);
    /*alert('editableVehicleObj.StartEffectiveDate ' + editVehicleStartDate.toLocaleDateString());
    alert('editableVehicleObj.StartEffectiveDate ' + editVehicleStartDate.getHours());*/
    const editVehicleEndDate = new Date(editableVehicleObj.EndEffectiveDate);
    /*alert('editableVehicleObj.StartEffectiveDate ' + editVehicleEndDate.toLocaleDateString());
    alert('editableVehicleObj.StartEffectiveDate ' + editVehicleEndDate.getHours());*/
    this.vehicleFormEdit = new FormGroup({
      plateNumber: new FormControl(editableVehicleObj.VehicleNumber, Validators.compose([Validators.required, Validators.pattern('[a-zA-z0-9]+([ \'-][a-zA-Z0-9]+)*')])),
      vehicleClass: new FormControl(editableVehicleObj.VehicleClass, Validators.required),
      vehicle_Make: new FormControl(editableVehicleObj.Make),
      vehicle_Year: new FormControl(editableVehicleObj.Year),
      vehicle_Model: new FormControl(editableVehicleObj.Model),
      vehicle_Color: new FormControl(editableVehicleObj.Color),
      registered_Country: new FormControl(editableVehicleObj.Country),
      vehicleId: new FormControl(editableVehicleObj.VehicleId),
      ContractType: new FormControl(editableVehicleObj.ContractType),
      registeredState: new FormControl(editableVehicleObj.State, Validators.required),
      startEffectiveDate: new FormControl(editVehicleStartDate.toLocaleDateString()),
      startDateHours: new FormControl(editVehicleStartDate.getHours()),
      startDateMins: new FormControl(editVehicleStartDate.getMinutes()),
      startDateSecs: new FormControl(editVehicleStartDate.getSeconds()),
      endEffectiveDate: new FormControl(editVehicleEndDate.toLocaleDateString()),
      endDateHours: new FormControl(editVehicleEndDate.getHours()),
      endDateMins: new FormControl(editVehicleEndDate.getMinutes()),
      endDateSecs: new FormControl(editVehicleEndDate.getSeconds()),
      description: new FormControl(editableVehicleObj.Description),
      isTemporaryLicencePlateNumber: new FormControl(editableVehicleObj._isTemporaryLicencePlateNumber),
    });

 /*   const startDate = this.vehicleFormEdit.controls['startEffectiveDate'].value;

    $('#startEffectiveDate').val(startDate);*/
    /*$("#vehicleClass").val(this.vehicleClassDropdowns[1].value);


     this.vehicleClassSelection=this.vehicleClassDropdowns[1].value;
     alert(this.vehicleClassSelection);*/


  }
  loadDropDown= function () {

    $('#vehicleClass').val('Class1');
    /*alert($('#vehicleClass').val());*/
  }
  savePersonal= function(customerInfo){
    let primaryEmailIsPrefd = false;
    let secondaryEmailisPrfd = false;
    if (customerInfo.preferredEmail == 'Primary Email'){
      primaryEmailIsPrefd = true;
      secondaryEmailisPrfd = false;
    }else{
      primaryEmailIsPrefd = false;
      secondaryEmailisPrfd = true;
    }
    let dayPhoneIsPrfd = false;
    let eveningPhoneIsPrfd = false;
    let workPhoneIsPrfd = false;
    let mobilePhoneIsPrfd = false;
    if (customerInfo.preferredPhone == 'Day Phone'){
      dayPhoneIsPrfd = true;
      eveningPhoneIsPrfd = false;
      workPhoneIsPrfd = false;
      mobilePhoneIsPrfd = false;
    }
    if (customerInfo.preferredPhone == 'Evening Phone'){
      dayPhoneIsPrfd = false;
      eveningPhoneIsPrfd = true;
      workPhoneIsPrfd = false;
      mobilePhoneIsPrfd = false;
    }
    if (customerInfo.preferredPhone == 'Work Phone'){
      dayPhoneIsPrfd = false;
      eveningPhoneIsPrfd = false;
      workPhoneIsPrfd = true;
      mobilePhoneIsPrfd = false;
    }
    if (customerInfo.preferredPhone == 'Mobile Phone'){
      dayPhoneIsPrfd = false;
      eveningPhoneIsPrfd = false;
      workPhoneIsPrfd = false;
      mobilePhoneIsPrfd = true;
    }

    this.account.accountId = 0;
    this.account.sourcePkId = 0;
    this.account.accountStatus = '9';
    this.account.revenueCategory = 'Revenue';
    this.account.customerStatus = '0';
    this.account.sourceOfEntry = '0';
    this.account.accountType = '';
    this.account.isNotificationsEnabled = false;
    this.account.retypePassword = customerInfo.passWord;
    this.account.addressType = '6';
    this.account.line1 = '';
    this.account.line2 = '';
    this.account.line3 = '';
    this.account.city = '';
    this.account.state = '';
    this.account.country = '';
    this.account.isCommunication = false;
    this.account.pin = '';
    this.account.currentPasswordExpiryDate = this.getCurrentDate();
    this.account.address = null;
    let OrganizationName = '';
    if (customerInfo.businessCustomerType == 'Business') {
      OrganizationName = 'Business';
    }else{
      OrganizationName = 'Individual';
    }
    this.account.organizationName = OrganizationName;
    this.account.webType = '';
    this.account.subSystem = '1';
    this.account.isSplitCustomer = false;
    this.account.BoolActivityRequired = true;
    this.account.ConvertToCustomer = false;
    this.account.actionCode = '';
    this.account.featuresCode = '';
    this.account.keyValue = '';
    this.account.user = 'SureIT'; // Logged in user User Name
    this.account.loginId = 0;
    this.account.activityTypeDescription = '';
    this.account.checkBlockList = true;
    this.account.kYCStatus = 'Received';
    this.account.kYCDate = this.getCurrentDate();
    this.account.kYCRequired = true // false : If it's optional
    this.account.loginStatus = '';
    this.account.unPaidAmount = 0;
    this.account.planCode = ''
    this.account.planDescription = '';
    this.account.parentPlanId = 0;
    this.account.parentPlanCode = '';
    this.account.parentPlanDescription = '';
    this.account.enrollmentNumber = '';
    this.account.isRegistered = false;
    this.account.preloadedAccountId = 0;
    this.account.isCreateAccount = true;
    this.account.isPrimary = false;
    this.account.userName = customerInfo.userName;
    this.account.password = customerInfo.passWord;
    this.account.firstName = customerInfo.first_Name;
    this.account.lastName = customerInfo.last_Name;
    debugger;
    if ($('#date_Of_Birth').val().length != 0) {
      this.account.dOB = this.convertStringDateToNumberString($('#date_Of_Birth').val(), 0, 0, 0);
    } else {
      this.account.dOB = this.getCurrentDate();
    }
     // $("#date_Of_Birth").val();
    this.account.gender = customerInfo.gender;
    this.account.suffix = customerInfo.suffix;
    this.account.title = customerInfo.title;
    //this.account.city=customerInfo.city;
    //this.account.country=customerInfo.country;
    this.account.zip1 = customerInfo.zip1;
    this.account.zip2 = customerInfo.zip2;
    this.account.activitySource = '0';
    this.account.contactId = 0;
    this.account.initiatedBy = 'SureIT';
    this.account.middleName = customerInfo.middle_Name;
    this.account.nameType = '6';
    this.account.parentId = 0;
    this.account.planDescription = '';
    this.account.userId = 12345;
    this.account.loginId = 12345;
    this.account.userType = '7';
    this.account.email = {};
    //Email List
    const primaryEmail = this.getEmailObject();
    primaryEmail.emailAddress = customerInfo.primary_Email;
    primaryEmail.isPreferred = primaryEmailIsPrefd;
    primaryEmail.type = 'PrimaryEmail';
    const secondaryEmail = this.getEmailObject();
    secondaryEmail.emailAddress = customerInfo.secondary_Email;
    secondaryEmail.isPreferred = secondaryEmailisPrfd;
    secondaryEmail.type = 'SecondaryEmail';
    const emailAddressArray: Email[] = [];
    emailAddressArray[0] = primaryEmail;
    emailAddressArray[1] = secondaryEmail;
    this.account.emailList = emailAddressArray;


    //Address List
    const addressObject: Address = this.getAddressObject();
    addressObject.line1 = customerInfo.address1;
    addressObject.line2 = customerInfo.address2;
    addressObject.line3 = customerInfo.address2;
    addressObject.city = customerInfo.city_Name;
    addressObject.country = customerInfo.country;
    addressObject.state = customerInfo.selectedstate;
    addressObject.zip1 = customerInfo.zip1;
    addressObject.zip2 = customerInfo.zip2;
    addressObject.state = customerInfo.selectedstate;
    const addressArray: Address[] = [];
    console.log(' addressObject ' + addressObject);
    addressArray[0] = addressObject;
    this.account.addressList = addressArray;

    //KYC List
    const kYCDocumentIdProof: KYCDocument = this.getKYCDocumentObject();
    kYCDocumentIdProof.documentNumber = customerInfo.idProofNo;
    kYCDocumentIdProof.documentType = customerInfo.businessCustomerType;
    kYCDocumentIdProof.description = customerInfo.businessCustomerType;
    if (customerInfo.businessCustomerType == 'Business') {
      kYCDocumentIdProof.documentCategory = 'IDProofBusiness';
      kYCDocumentIdProof.documentCategoryDesc = 'IDProofBusiness';
    }else{
      kYCDocumentIdProof.documentCategory = 'IDProof';
      kYCDocumentIdProof.documentCategoryDesc = 'Individual';
    }
    const kYCDocumentAddressProof: KYCDocument = this.getKYCDocumentObject();
    kYCDocumentAddressProof.documentType = customerInfo.businessCustomerType;
    kYCDocumentAddressProof.description = customerInfo.businessCustomerType;
    kYCDocumentAddressProof.documentNumber = customerInfo.addressProof;
    if (customerInfo.businessCustomerType == 'Business') {
      kYCDocumentAddressProof.documentCategory = 'AddressProofBusiness';
      kYCDocumentAddressProof.documentCategoryDesc = 'AddressProofBusiness';
    }else{
      kYCDocumentAddressProof.documentCategory = 'AddressProof';
      kYCDocumentAddressProof.documentCategoryDesc = 'AddressProof';
    }
    kYCDocumentIdProof.documentPath = this.idProofFullPath;
    kYCDocumentAddressProof.documentPath = this.addressProofFullPath;
    const KYCDocumentArray: KYCDocument[] = [];
    KYCDocumentArray[0] = kYCDocumentIdProof;
    KYCDocumentArray[1] = kYCDocumentAddressProof;
    this.account.addKYCDocument = KYCDocumentArray;


    //Phone List
    const dayPhone: Phone = this.getPhoneObject();
    dayPhone.phoneNumber = $('#day_Phone_Number').val();
    dayPhone.type = 'DayPhone';
    dayPhone.isCommunication = dayPhoneIsPrfd;
    const eveningPhone: Phone = this.getPhoneObject();
    eveningPhone.phoneNumber = $('#eveningPhone').val();
    eveningPhone.isCommunication = eveningPhoneIsPrfd;
    eveningPhone.type = 'EveningPhone';
    const mobile_Phone_Number: Phone = this.getPhoneObject();
    mobile_Phone_Number.phoneNumber = $('#mobile_Phone_Number').val();
    mobile_Phone_Number.isCommunication = mobilePhoneIsPrfd;
    mobile_Phone_Number.type = 'MobileNo';
    const workPhone: Phone = this.getPhoneObject();
    workPhone.phoneNumber = $('#workPhone').val();
    workPhone.isCommunication = workPhoneIsPrfd;
    workPhone.type = 'WorkPhone';
    const phoneFax: Phone = this.getPhoneObject();
    phoneFax.phoneNumber = $('#fax').val();
    phoneFax.isCommunication = false;
    phoneFax.type = 'Fax';
    const phoneArray: Phone[] = [];
    phoneArray[0] = dayPhone;
    phoneArray[1] = eveningPhone;
    phoneArray[2] = mobile_Phone_Number;
    phoneArray[3] = workPhone;
    phoneArray[4] = phoneFax;
    this.account.phoneList = phoneArray;





    let tempInputObj = JSON.stringify(this.account);
    tempInputObj = tempInputObj.replace('EmailList', 'Request Email List');
    tempInputObj = tempInputObj.replace('PhoneList', 'Request Phone List');
    tempInputObj = tempInputObj.replace('AddressList', 'Request Address List');
    tempInputObj = tempInputObj.replace('AddKYCDocument', 'KYC Document List');
    console.log(tempInputObj);
    this.utilityService.saveCustomer('PostCreateCustomer', tempInputObj).subscribe(res => {

      const resObj = JSON.parse(res._body);
      console.log(resObj.ResultValue);
      if (resObj.Result == false){
        this.userNameValidationResult = resObj.ResultValue;
        $(".nav-tabs > .active .badge").text('X');
        $(".nav-tabs > .active .badge").css("color","white");
        $(".nav-tabs > .active .badge").css("background-color","crimson");
        /*alert(resObj.ResultValue);*/

      }else{
        sessionStorage.setItem('CustomerId', resObj.ResultValue);
        $(".nav-tabs > .active .badge").text('✔');
        $(".nav-tabs > .active .badge").css("color","lightgreen");
        $(".nav-tabs > .active .badge").css("background-color","forestgreen");
        this.userFormInitialValue();
        /*alert(' Customer  Successfully Registered With ID: ' + resObj.ResultValue);*/
        $('.my-link').unbind('click', false);
        $('.nav-tabs > .active').next('li').find('a').click(function () {
// 'this' is not a jQuery object, so it will use
// the default click() function
          this.click();
        }).click();
        $('.my-link').bind('click', false);
        this.getVehicles();
      }


    })

    /*this.newService.savePersonal(customerPersonal).subscribe(res=>
     {
     var resObj=JSON.parse(res._body);
     console.log("response "+resObj);

     });*/
  }
  saveAddress= function(customerPersonal){
    //console.log(userInfo);
    this.newService.saveAddress(customerPersonal).subscribe(res =>
    {
      const resObj = JSON.parse(res._body);
      console.log('response ' + resObj);

    });
  }
  updateUser= function(updatedUserInfo){
    console.log('userinfor ' + JSON.stringify(updatedUserInfo));
    this.lengthForVehiclePagination = updatedUserInfo.indexNumber;
    this.saveVehicle(updatedUserInfo);

  }


  getCountries= function () {
    this.utilityService.getCountries('GetCountries').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.countries = resObj.ResultValue;
      //console.log("countries" + resObj.ResultValue);
      //console.log(typeof  resObj)
    })
  };

  getStates= function(id){
    this.countryObject = {
      'LookUpTypeCode' : 'TollSchedulePriorities',
      'CountryCode' : $("#"+id+"").val()};
    console.log(this.countryObject);
    this.utilityService.getStates('PostGetStatesByCountryCode', JSON.stringify(this.countryObject)).subscribe(res => {

      const resObj = JSON.parse(res._body);
      console.log(resObj.StateCode);
      this.states = resObj.ResultValue;
    })
  };
  getStatesForDialogue= function(countryCode){
    this.countryObject = {
      'LookUpTypeCode' : 'TollSchedulePriorities',
      'CountryCode' : countryCode};
    console.log(this.countryObject);
    this.utilityService.getStates('PostGetStatesByCountryCode', JSON.stringify(this.countryObject)).subscribe(res => {

      const resObj = JSON.parse(res._body);
      console.log(resObj.StateCode);
      this.states = resObj.ResultValue;
    })
  };

  getSuffix= function () {
    this.utilityService.getDropDownValues('GetLookups/?Type=Suffix').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.suffixs = resObj.ResultValue;


    })

  }
  getTitle= function () {
    this.utilityService.getDropDownValues('GetLookups/?Type=Title').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.titles = resObj.ResultValue;


    })

  }
  getGender= function () {
    this.utilityService.getDropDownValues('GetLookups/?Type=Gender').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.genders = resObj.ResultValue;


    })

  }


  getAddressProof= function () {
    this.utilityService.getDropDownValues('GetLookups/?Type=AddressProof').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.addressProofs = resObj.ResultValue;


    })

  }
  getAddressProofBusiness= function () {
    this.utilityService.getDropDownValues('GetLookups/?Type=AddressProofBusiness').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.addressProofs = resObj.ResultValue;


    })

  }
  getIdProof= function () {
    this.utilityService.getDropDownValues('GetLookups/?Type=IDProof').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.idProofs = resObj.ResultValue;


    })

  }
  getIdProofBusiness= function () {
    this.utilityService.getDropDownValues('GetLookups/?Type=IDProofBusiness').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.idProofs = resObj.ResultValue;


    })

  }


  getBusiness= function () {
   /* this.utilityService.getDropDownValues('GetLookups/?Type=Business').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.businesses = resObj.ResultValue;

    })*/
    this.businesses=[{"__type":"KeyValuePairOfstringstring:#System.Collections.Generic","key":"Individual","value":"Individual Customer"},
      {"__type":"KeyValuePairOfstringstring:#System.Collections.Generic","key":"Business","value":"Business Customer"}];
  }
  getBusinessCustomer= function () {
  /*  this.utilityService.getDropDownValues('GetLookups/?Type=Business&Customer').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.businessCustomers = resObj.ResultValue;

    })*/
    this.businessCustomers=[{"__type":"KeyValuePairOfstringstring:#System.Collections.Generic","key":"Individual","value":"Individual Customer"},
      {"__type":"KeyValuePairOfstringstring:#System.Collections.Generic","key":"Business","value":"Business Customer"}];
  }

  suffixOther= function () {

    const suff = $('#suffix').val();
    if (suff == 'Other') {
      $('#suffix_other_row').show();
    }else{
      $('#suffix_other_row').hide();
    }
  }


  idProofOther= function () {

    const idProofOthr = $('#idProof_other').val();
    if (idProofOthr == 'Other') {
      $('#idProof_other_row').show();
    }else{
      $('#idProof_other_row').hide();
    }
  }
  addressProofOther= function () {

    const addrProofOthr = $('#addressProof_other').val();
    if (addrProofOthr == 'Other') {
      $('#addressProof_other_row').show();
    }else{
      $('#addressProof_other_row').hide();
    }
  }




  changeIdProofAndAddressProofDropDown= function () {

    //alert($("#businessCustomerType").val());
    const accType = $('#businessCustomerType').val();
    if (accType == 'Business'){
      this.getAddressProofBusiness();
      this.getIdProofBusiness();
    }else{
      this.getIdProof();
      this.getAddressProof();
    }

  }


  getEmailObject= function () {
    const  email = new Email();
    email.emailId = 0;
    email.customerId = 0;
    email.userName = 'SureIT';
    email.isActive = true;
    email.paging = {};
    email.subSystem = '1';
    email.activitySource = '0';
    email.isActivityRequired = true;
    email.userId = 0;
    email.loginId = 0;
    email.checkBlockList = false;
    email.isValid = true;
    return email;
  }
  getAddressObject= function () {
    const addrObj = new Address();
    addrObj.addressId = 0;
    addrObj.customerId = 0;
    addrObj.type = 'Primary';
    addrObj.isPreferred = true;
    addrObj.fullAddress = '';
    addrObj.userName = 'SureIT';
    addrObj.isActive = true;
    addrObj.paging = {};
    addrObj.subSystem = '1';
    addrObj.activitySource = '0';
    addrObj.isActivityRequired = true;
    addrObj.userId = 0;
    addrObj.loginId = 0;
    addrObj.countryName = '';
    addrObj.stateName = '';
    addrObj.checkBlockList = false;
    addrObj.isInvalidAddress = true;
    addrObj.reasonCode = '';
    addrObj.isShipmentupdateAddress = false;

    return addrObj;
  }



  getKYCDocumentObject= function () {
    const kYCDocument = new KYCDocument();
    kYCDocument.customerId = 0;
    kYCDocument.documentTypeId = 0;
    kYCDocument.documentTypeName = '';
    kYCDocument.documentStatusID = 0;
    kYCDocument.documentStatus = 'Received';
    kYCDocument.isVerified = true;
    kYCDocument.uploadedBy = 12345;
    kYCDocument.createdUser = 'SureIT';
    kYCDocument.updatedUser = 'SureIT';
    kYCDocument.userId = 1232131;
    kYCDocument.loginId = 1232131;
    kYCDocument.user = 'SureIT';
    kYCDocument.activitySource = 'Internal';
    kYCDocument.subSystem = 'CSC';
    kYCDocument.documentId = 0;
    kYCDocument.documentPreviousStatus = false;
    kYCDocument.moduleName = '';
    kYCDocument.isDocumentProofChanged = true;
    kYCDocument.documentStatusDate = this.getCurrentDate();
    kYCDocument.receivedDate = this.getCurrentDate();
    kYCDocument.uploadedDate = this.getCurrentDate();
    kYCDocument.verifiedDate = this.getCurrentDate();
    kYCDocument.isUploaded = true;
    kYCDocument.isReceived = true;
    return kYCDocument;
  }

  getPhoneObject= function () {
    const phone = new Phone();
    phone.phoneId = 0;
    phone.customerId = 0;
    phone.extension = '';
    phone.userName = 'SureIT';
    phone.paging = {};
    phone.subSystem = '1';
    phone.activitySource = '0';
    phone.isActive = true;
    phone.isActivityRequired = true;
    phone.userId = 0;
    phone.loginId = 0;
    phone.checkBlockList = false;
    phone.isPhoneNumberChanged = false;
    phone.checkBlockList = false;
    phone.isCreateAccount = true;
    return phone;
  }

  getCurrentDate= function () {
    console.log('Date   ' + '\/Date(' + Date.now() + ')\/');
    return '\/Date(' + Date.now() + ')\/';

  }
  validateUserName= function () {
    const userName = $('#userName').val();

    if (userName.length > 5) {
      const inputObj = {
        'strUsername': userName
      };
      this.utilityService.valiateUserName('PostIsExist/?enumActivityType=Username', inputObj).subscribe(res =>
      {
        const resObj = JSON.parse(res._body);
        console.log('response ' + resObj.Result);
        if (resObj.Result == false){
          this.userNameValidationResult = resObj.ResultValue;
          $('#userNameAlreadyExistMessage').fadeTo(1000, 500).slideUp(2000, function(){
            $('#userNameAlreadyExistMessage').hide();
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
    if(control.value){
    if (control.value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
    }
  }

  static validateNumber(control){
    if (control.value.match('^[0-9]*$')){
      return null;
    }else {
      return {'invalidNumber': true};
    }
  }



//vehicle dropdown functions starts here
  getVehicleClassDropdown= function () {
    debugger;
    this.utilityService.vehicleClassDropdown('PostGet/?enumModuleType=Customer&enumActivityType=VehicleClasses&longCustomerId=0').subscribe(res => {
      const resObj = JSON.parse(res._body);

      this.vehicleClassDropdown = resObj.ResultValue;
    })
  }

  getVehicleYearDropdown= function () {
    const currentYear = (new Date()).getFullYear();
    let count = 1900;
    for (let i = 0; i <= currentYear; i++) {
      this.vehicleYearDropdown[i] = count;
      count++;
      if (count > currentYear) {
        break;
      }
    }

  }

  getVehicleColorDropdown= function () {
    const inputObj = {
      'LookUpTypeCode': 'VehicleColors'
    };
    this.utilityService.vehicleColorDropdown('PostGetLookUpByParentLookupTypeCode', JSON.stringify(inputObj)).subscribe(res => {
      const resObj = JSON.parse(res._body);

      this.vehicleColors = resObj.ResultValue;
    })
  }

  getVehicleModelsDropdown= function () {
    this.utilityService.vehicleClassDropdown('PostGet/?enumModuleType=Customer&enumActivityType=VehicleModels&longCustomerId=0', '').subscribe(res => {
      const resObj = JSON.parse(res._body);

      this.vehicleModels = resObj.ResultValue;
    })
  }

//vehicle dropdown functions ends here

  //additional information functions starts here
  getHowDidYouHearDropdown= function () {

  }
  getStatementDeliveryOptionsDropdown= function () {

  }
  getAccountCategories= function () {

  }


  getHearAboutUs= function(){

    this.utilityService.getHearAboutUs('GetLookups/?Type=SourceOfChannel').subscribe(res =>
    {
      const resObj = JSON.parse(res._body);
      this.hearAboutUs = resObj.ResultValue;
    });

  }
  getStatementDelivOption= function(){
    this.utilityService.getStatementDelivOption('GetLookups/?Type=StatementDelivery').subscribe(res =>
    {
      const resObj = JSON.parse(res._body);
      this.statementDelivOption = resObj.ResultValue;
    });
  }
  getRevenueCategory= function(){
    this.utilityService.getRevenueCategory('GetLookups/?Type=RevenueCategory').subscribe(res =>
    {
      const resObj = JSON.parse(res._body);
      this.revenueCategory = resObj.ResultValue;
    });
  }

  validateAllFields= function (control) {
    debugger;
    if (this.user_Form.valid) {
      return null;
    }else {
      alert('Required Fields are not Entered/Selected. Please verify');
      return {'Mandatory Fields are not Entered/Selected. ': true};
    }
  }

  convertNumbertoUSFormat= function (idVal) {
    let tempPhone = '';
    if ($('#' + idVal + '').val().length == 10){
      tempPhone = '(';
      tempPhone = tempPhone + $('#' + idVal + '').val().substring(0, 3) + ') ' + $('#' + idVal + '').val().substring(3, 6) + '-' + $('#' + idVal + '').val().substring(6, 11);


      if (idVal == 'day_Phone_Number'){
        this.user_Form.value.day_Phone_Number = tempPhone;
        this.user_Form.controls.day_Phone_Number.setValue = tempPhone;
      }
      if (idVal == 'eveningPhone'){
        this.user_Form.value.eveningPhone = tempPhone;
      }
      if (idVal == 'workPhone'){
        this.user_Form.value.workPhone = tempPhone;
      }
      if (idVal == 'mobile_Phone_Number'){
        this.user_Form.value.mobile_Phone_Number = tempPhone;
      }
      if (idVal == 'fax'){
        this.user_Form.value.fax = tempPhone;
      }
      $('#' + idVal + '').val(tempPhone);

    }else{
      tempPhone = $('#' + idVal + '').val();
      $('#' + idVal + '').val(tempPhone);
    }


  }

  resetVehicleForm= function () {
    this.vehicleForm =  this.vehicleFormInitialValues();

  }

  resetVehicleFormEdit= function () {
    this.vehicleFormEdit =  this.vehicleFormInitialValues();

  }



  vehicleFormInitialValues= function () {

    return new FormGroup({
      plateNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-z0-9]+([ \'-][a-zA-Z0-9]+)*')])),
      vehicleClass: new FormControl('', Validators.required),
      vehicle_Make: new FormControl(''),
      vehicle_Year: new FormControl(''),
      vehicle_Model: new FormControl(''),
      vehicle_Color: new FormControl(''),
      registered_Country: new FormControl('', Validators.required),
      registeredState: new FormControl('', Validators.required),
      startEffectiveDate: new FormControl(''),
      startDateHours: new FormControl(''),
      startDateMins: new FormControl(''),
      startDateSecs: new FormControl(''),
      endEffectiveDate: new FormControl(''),
      endDateHours: new FormControl(''),
      endDateMins: new FormControl(''),
      endDateSecs: new FormControl(''),
      isTemporaryLicencePlateNumber: new FormControl('')

    });
  }

  saveVehicle= function (vehicleInfo) {
    debugger
    console.log('vehicle information  '+JSON.stringify(vehicleInfo));
    const tempJsonObj = JSON.stringify(vehicleInfo);
    let tempVehicleObj = this.setVehicleArrayObject(vehicleInfo);
    tempVehicleObj=this.setVehicleObjectWithDynamicValues(tempVehicleObj,vehicleInfo);
    tempVehicleObj.accountId=sessionStorage.getItem('CustomerId');
    tempVehicleObj.contractType="Leased";
    tempVehicleObj.vehicleId="0";
    tempVehicleObj.FutureClosureDate=null;
    console.log('actual Obj '+JSON.stringify(tempVehicleObj));
    this.utilityService.vehicleOperation('PostCreate/?enumModuleType=Customer&enumActivityType=Vehicles&longCustomerId=' + sessionStorage.getItem('CustomerId'), tempVehicleObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if(resObj.ResultValue==true){
        this.getVehicles();
        // alert("Vehicle Added Successfully..");

        this.resetVehicleForm();
      } else {
        $(".nav-tabs > .active .badge").text('X');
        $(".nav-tabs > .active .badge").css("color","white");
        $(".nav-tabs > .active .badge").css("background-color","crimson");

      }
    })
    //this.vehicleArray[length] = tempVehicle;

  }
  updateVehicle=function (vehicleInfo) {

    const tempJsonObj = JSON.stringify(vehicleInfo);
    let tempVehicleObj = this.setVehicleArrayObject();
    tempVehicleObj=this.setVehicleObjectWithDynamicValuesForUpdateVehicle(tempVehicleObj,vehicleInfo);
    tempVehicleObj.accountId=sessionStorage.getItem('CustomerId');
      tempVehicleObj.vehicleId=this.vehicleFormEdit.value.vehicleId;
      tempVehicleObj.contractType=this.vehicleFormEdit.value.ContractType;
    this.utilityService.vehicleOperation('PostUpdateVehicle/?enumModuleType=Customer&enumActivityType=Vehicles&longCustomerId='+sessionStorage.getItem('CustomerId'), tempVehicleObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if(resObj.ResultValue==true){
        this.getVehicles();
        alert("Vehicle Updated Successfully...");
      }
    })
  }
  deleteVehicle=function (vehicleInfo) {
    let deleteObj=new Vehicle();
    deleteObj.accountId=sessionStorage.getItem('CustomerId');
    deleteObj.checkBlockList=true;
    deleteObj.color=vehicleInfo.Color;
    deleteObj.contractType=vehicleInfo.ContractType;
    deleteObj.country=vehicleInfo.CountryCode;
    deleteObj.currentDateTime="\/Date(1245398693390)\/";
    deleteObj.deactivatedDate="\/Date(1245398693390)\/";
    deleteObj.endEffectiveDate="\/Date(1245398693390)\/";
    deleteObj.filePath=null;
    deleteObj.futureClosureDate=null;
    deleteObj.isExempted=false;
    deleteObj.isProtected=false;
    deleteObj.isTemporaryNumber=false;
    deleteObj.loginId=610901;
    deleteObj.make=vehicleInfo.Make;
    deleteObj.model=vehicleInfo.Model;
    deleteObj.oldTagType=null;
    deleteObj.oldVehicleNumber=null;
    deleteObj.pageNumber=0;
    deleteObj.pageSize=0;
    deleteObj.rCNumber=null;
    deleteObj.searchVehicleActivityInd=false;
    deleteObj.sortColumn=null;
    deleteObj.sortDirection=false;
    deleteObj.source=null;
    deleteObj.startEffectiveDate="\/Date(1245398693390)\/";
    deleteObj.state=vehicleInfo.State;
    deleteObj.systemUserActivityInd=true;
    deleteObj.tagSerialNum=null;
    deleteObj.tagType=null;
    deleteObj.userId=10000001;
    deleteObj.userName="tpsuperuser";
    deleteObj.vehicleClass=vehicleInfo.VehicleClass;
    deleteObj.vehicleClassDesc=null;
    deleteObj.vehicleHistoryActivity=false;
    deleteObj.vehicleId=vehicleInfo.VehicleId;
    deleteObj.vehicleLoadActivityInd=false;
    deleteObj.vehicleNumber=vehicleInfo.VehicleNumber;
    deleteObj.vehicleSearchActivityInd=vehicleInfo.VehicleSearchActivityInd;
    deleteObj.vehicleStatus=vehicleInfo.VehicleStatus;
    deleteObj.year=vehicleInfo.Year;





    var deleteVehicleObj=JSON.stringify(deleteObj);
    debugger;
    console.log("deleteVehicleObj "+deleteVehicleObj);
    this.utilityService.vehicleOperation('PostDeleteVehicle/?enumModuleType=Customer&enumActivityType=RemoveVehicle&longCustomerId='+ sessionStorage.getItem('CustomerId'), deleteVehicleObj)
      .subscribe(res => {
    const resObj = JSON.parse(res._body);
    if(resObj.ResultValue==true){
      this.getVehicles();
      alert("Vehicle Deleted Successfully...");
    }
  });

  }
  getVehicles=function () {
      let tempVehicleObj = this.setVehicleArrayObject();
      debugger;
    tempVehicleObj.accountId=sessionStorage.getItem('CustomerId');
    tempVehicleObj.contractType="";
    tempVehicleObj.vehicleId="0";
    tempVehicleObj.pageNumber=1;
    tempVehicleObj.pageSize=10;
    tempVehicleObj.sortColumn= "VEHICLENUMBER";
    console.log('actual Obj '+JSON.stringify(tempVehicleObj));
    this.utilityService.vehicleOperation('PostGet/?enumModuleType=Customer&enumActivityType=ActiveVehicles&longCustomerId=' + sessionStorage.getItem('CustomerId'), tempVehicleObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      // alert(resObj.ResultValue[0].VehicleId);
      // alert(resObj.ResultValue[0].VehicleNumber);
      this.vehicleArray = resObj.ResultValue;
      for (let i = 0; i < this.vehicleArray.length; i++) {
        if (this.vehicleArray[i].StartEffectiveDate != null){
//          alert(this.vehicleArray[i].StartEffectiveDate);
          this.vehicleArray[i].StartEffectiveDate = this.convertNumberOfMilliSecsToDate(this.vehicleArray[i].StartEffectiveDate.split('+')[0].replace('/Date(', ''));
        }
        if (this.vehicleArray[i].EndEffectiveDate != null) {
         // alert(this.vehicleArray[i].EndEffectiveDate);
          this.vehicleArray[i].EndEffectiveDate = this.convertNumberOfMilliSecsToDate(this.vehicleArray[i].EndEffectiveDate.split('+')[0].replace('/Date(', ''));
         // alert(this.vehicleArray[i].EndEffectiveDate);
        }
      }
      console.log("this.vehicleArray length " + this.vehicleArray.length)
      if(this.vehicleArray.length > 0){
        this.isVehicleExists = true;
      }
    })
  }




  setVehicleArrayObject= function () {
    const tempVehicle = new Vehicle();
    debugger;
    tempVehicle.checkBlockList="true";
    tempVehicle.filePath="null";
    tempVehicle.isExempted="false";
    tempVehicle.isProtected="false";
    tempVehicle.isTemporaryNumber="false";
    tempVehicle.loginId="610901";
    tempVehicle.oldTagType="null";
    tempVehicle.oldVehicleNumber="null";
    tempVehicle.pageNumber="0";
    tempVehicle.pageSize="0";
    tempVehicle.rCNumber="null";
    tempVehicle.searchVehicleActivityInd="false";
    tempVehicle.sortColumn="null";
    tempVehicle.sortDirection="false";
    tempVehicle.source="null";
    // tempVehicle.startEffectiveDate=this.getCurrentDate();
    tempVehicle.systemUserActivityInd="true";
    tempVehicle.tagSerialNum="null";
    tempVehicle.tagType="null";
    tempVehicle.userId="10000001";
    tempVehicle.userName="tpsuperuser";
    tempVehicle.vehicleClassDesc="null";
    tempVehicle.vehicleHistoryActivity="false";
    tempVehicle.vehicleLoadActivityInd="false";
    tempVehicle.vehicleSearchActivityInd="false";
    tempVehicle.vehicleStatus="Active";
    return tempVehicle;
  }

  getModels=function (vehicleMakeId) {
    let make=$("#"+vehicleMakeId+"").val();
    var vehicleModelCount=0;
    for(var i=0;i<this.vehicleModels.length;i++){
      if(this.vehicleModels[i].Make==make) {
        console.log(this.vehicleModels[i].Modal);
        this.vehicleModelArrays[vehicleModelCount] = this.vehicleModels[i].Model;
        vehicleModelCount++;
      }
    }
  }

  setVehicleObjectWithDynamicValues= function (vehicleWholeObject, vehicleFormObj) {
    debugger;
    vehicleWholeObject.color = vehicleFormObj.vehicle_Color;
    vehicleWholeObject.country = vehicleFormObj.registered_Country;
    vehicleWholeObject.make = vehicleFormObj.vehicle_Make;
    vehicleWholeObject.model = vehicleFormObj.vehicle_Model;
    vehicleWholeObject.state = vehicleFormObj.registeredState;
    vehicleWholeObject.vehicleClass = vehicleFormObj.vehicleClass;
    vehicleWholeObject.vehicleNumber = vehicleFormObj.plateNumber;
    vehicleWholeObject.year = vehicleFormObj.vehicle_Year;
    debugger;
    console.log('start date value ' + $('#startEffectiveDate').val());
    console.log('passing start date' + this.convertStringDateToNumberString($('#startEffectiveDate').val(),
        vehicleFormObj.startDateHours, vehicleFormObj.startDateMins, vehicleFormObj.startDateSecs));
    if($('#startEffectiveDate').val().length != 0) {
      vehicleWholeObject.startEffectiveDate = this.convertStringDateToNumberString($('#startEffectiveDate').val(),
        vehicleFormObj.startDateHours, vehicleFormObj.startDateMins, vehicleFormObj.startDateSecs);
    }else {
      vehicleWholeObject.startEffectiveDate = this.getCurrentDate();
    }
    console.log('passing start date' + this.convertStringDateToNumberString($('#endEffectiveDate').val(),
        vehicleFormObj.endDateHours, vehicleFormObj.endDateMins, vehicleFormObj.endDateSecs));
    if($('#endEffectiveDate').val().length != 0) {
      vehicleWholeObject.endEffectiveDate = this.convertStringDateToNumberString($('#endEffectiveDate').val(),
        vehicleFormObj.endDateHours, vehicleFormObj.endDateMins, vehicleFormObj.endDateSecs);
    } else {
      vehicleWholeObject.endEffectiveDate = this.getCurrentDate();
    }
    return vehicleWholeObject;
  }

  setVehicleObjectWithDynamicValuesForUpdateVehicle= function (vehicleWholeObject, vehicleFormObj) {
    debugger;
    vehicleWholeObject.color = vehicleFormObj.vehicle_Color;
    vehicleWholeObject.country = vehicleFormObj.registered_Country;
    vehicleWholeObject.make = vehicleFormObj.vehicle_Make;
    vehicleWholeObject.model = vehicleFormObj.vehicle_Model;
    vehicleWholeObject.state = vehicleFormObj.registeredState;
    vehicleWholeObject.vehicleClass = vehicleFormObj.vehicleClass;
    vehicleWholeObject.vehicleNumber = vehicleFormObj.plateNumber;
    vehicleWholeObject.year = vehicleFormObj.vehicle_Year;
    debugger;
    console.log('start date value ' + $('#start_Effective_Date').val());
    console.log('passing start date' + this.convertStringDateToNumberString($('#start_Effective_Date').val(),
        vehicleFormObj.startDateHours, vehicleFormObj.startDateMins, vehicleFormObj.startDateSecs));
    if($('#start_Effective_Date').val().length != 0) {
      vehicleWholeObject.startEffectiveDate = this.convertStringDateToNumberString($('#start_Effective_Date').val(),
        vehicleFormObj.startDateHours, vehicleFormObj.startDateMins, vehicleFormObj.startDateSecs);
    }else {
      vehicleWholeObject.startEffectiveDate = this.getCurrentDate();
    }
    console.log('passing start date' + this.convertStringDateToNumberString($('#end_Effective_Date').val(),
        vehicleFormObj.endDateHours, vehicleFormObj.endDateMins, vehicleFormObj.endDateSecs));
    if($('#end_Effective_Date').val().length != 0) {
      vehicleWholeObject.endEffectiveDate = this.convertStringDateToNumberString($('#end_Effective_Date').val(),
        vehicleFormObj.endDateHours, vehicleFormObj.endDateMins, vehicleFormObj.endDateSecs);
    } else {
      vehicleWholeObject.endEffectiveDate = this.getCurrentDate();
    }
    return vehicleWholeObject;
  }



  saveAdditionalInformation = function(additionalInformationObj){
    debugger;
    const  additionalInfoObj = new  AdditionalInformation();
    additionalInfoObj.accountId=sessionStorage.getItem('CustomerId'); //additionalInformationObj.friendshipRewardAccountNo;
    additionalInfoObj.accountType= "null";
    additionalInfoObj.actionCode= "null";
    additionalInfoObj.activitySource = 710;
    additionalInfoObj.activityTypeDescription= "null";
    additionalInfoObj.autoReplenishmentType= "null";
    additionalInfoObj.autoReplenishmentTypeDesc= "null";
    additionalInfoObj.calculatedReBillAmount="0";
    additionalInfoObj.customerStatus=13;
    additionalInfoObj.checkBlockList="true";
    additionalInfoObj.cycleUpdatedDate= "\/Date(1245398693390)\/";
    additionalInfoObj.driverLicenceApprovedState= "null";
    additionalInfoObj.driverLicenceExpirationDate= "\/Date(1245398693390)\/";
    additionalInfoObj.driverLicenceNumber= "null";
    additionalInfoObj.enrollmentNumber= "null";
    additionalInfoObj.featuresCode= "null";
    additionalInfoObj.invoiceAmount= "0";
    additionalInfoObj.invoiceAmt= "null";
    additionalInfoObj.invoiceDay= "0";
    additionalInfoObj.invoiceIntervalID= "4";
    additionalInfoObj.isCreateAccountUserActivity= "true";
    additionalInfoObj.iSFrequentCaller= "false";
    additionalInfoObj.isHearingImpirement= "false";
    additionalInfoObj.isManualHold= "false";
    additionalInfoObj.isNotificationsEnabled= "false";
    additionalInfoObj.isPostPaidCustomer= "false";
    additionalInfoObj.isSplitCustomer= "false";
    additionalInfoObj.isSupervisor= "false";
    additionalInfoObj.isTagInStatusFile= "false";
    additionalInfoObj.isTagRequired= "false";
    additionalInfoObj.keyValue= "null";
    additionalInfoObj.loginId= "610908";
    additionalInfoObj.membershipType= 82;
    additionalInfoObj.nextRunDate="\/Date(1245398693390)\/";
    additionalInfoObj.organizationName= "null";
    additionalInfoObj.parentId= "0";
    additionalInfoObj.performBy= "null";
    additionalInfoObj.pin= "ceb6c970658f31504a901b89dcd3e461";
    additionalInfoObj.planDescription= "null";
    additionalInfoObj.planId= "0";
    additionalInfoObj.preferedLanguange= "English";
    additionalInfoObj.preferredShipment= 339;
    additionalInfoObj.previousRunDate= "\/Date(1245398693390)\/";
    additionalInfoObj.rebill_Hold_EndEffectiveDate= "\/Date(1245398693390)\/";
    additionalInfoObj.rebill_Hold_StartEffectiveDate= "\/Date(1245398693390)\/";
    additionalInfoObj.referalBalance= "0";
    if(additionalInformationObj.friendshipRewardAccountNo.length != 0) {
      additionalInfoObj.referralCustomerId = additionalInformationObj.friendshipRewardAccountNo;
    } else {
      additionalInfoObj.referralCustomerId = '10002865';
    }

    additionalInfoObj.refIndicator= "0";
    additionalInfoObj.refPkId= "0";
    additionalInfoObj.requestDate= "\/Date(1245398693390)\/";
    additionalInfoObj.requestStatus= 208;
    additionalInfoObj.revenueCategory= additionalInformationObj.account_Category;
    additionalInfoObj.securityQuestionsAndAnswers= "null";
    additionalInfoObj.sourceOfChannel= additionalInformationObj.howDidYouHearUs;
    additionalInfoObj.statementCycle= "null";
    additionalInfoObj.statementDelivery= additionalInformationObj.statement_Delivery_Options;
    additionalInfoObj.subSystem=803;
    additionalInfoObj.templateType= "null";
    additionalInfoObj.thresholdAmount= "0";
    additionalInfoObj.tranponderPurchasemethod= "null";
    additionalInfoObj.updatedUser= "tpsuperuser";
    additionalInfoObj.user= "null";
    additionalInfoObj.userId= "10000001";
    additionalInfoObj.userType = 11;
    console.log('additionalInfoObj '+JSON.stringify(additionalInfoObj));
    this.utilityService.additionalInformationOperation('PostAddInfo/?enumModuleType=Customer&enumActivityType=AdditionalInformation&longCustomerId=' + sessionStorage.getItem('CustomerId'), additionalInfoObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if(resObj.Result==true) {
        /*alert(resObj.ResultValue);*/
        $(".nav-tabs > .active .badge").text('✔');
        $(".nav-tabs > .active .badge").css("color","lightgreen");
        $(".nav-tabs > .active .badge").css("background-color","forestgreen");
        $('.nav-tabs > .active').next('li').find('a').click(function () {
// 'this' is not a jQuery object, so it will use
// the default click() function
          this.click();
        }).click();
      }else{
        $(".nav-tabs > .active .badge").text('X');
        $(".nav-tabs > .active .badge").css("color","white");
        $(".nav-tabs > .active .badge").css("background-color","crimson");
      }
    })
  }


  updateAdditionalInformation = function(additionalInformationObj){
    debugger;
    const  additionalInfoObj = new  AdditionalInformation();
    additionalInfoObj.accountId=sessionStorage.getItem('CustomerId'); //additionalInformationObj.friendshipRewardAccountNo;
    additionalInfoObj.accountType= "null";
    additionalInfoObj.actionCode= "null";
    additionalInfoObj.activitySource = 710;
    additionalInfoObj.activityTypeDescription= "null";
    additionalInfoObj.autoReplenishmentType= "null";
    additionalInfoObj.autoReplenishmentTypeDesc= "null";
    additionalInfoObj.calculatedReBillAmount="0";
    additionalInfoObj.customerStatus=13;
    additionalInfoObj.checkBlockList="true";
    additionalInfoObj.cycleUpdatedDate= "\/Date(1245398693390)\/";
    additionalInfoObj.driverLicenceApprovedState= "null";
    additionalInfoObj.driverLicenceExpirationDate= "\/Date(1245398693390)\/";
    additionalInfoObj.driverLicenceNumber= "null";
    additionalInfoObj.enrollmentNumber= "null";
    additionalInfoObj.featuresCode= "null";
    additionalInfoObj.invoiceAmount= "0";
    additionalInfoObj.invoiceAmt= "null";
    additionalInfoObj.invoiceDay= "0";
    additionalInfoObj.invoiceIntervalID= "4";
    additionalInfoObj.isCreateAccountUserActivity= "true";
    additionalInfoObj.iSFrequentCaller= "false";
    additionalInfoObj.isHearingImpirement= "false";
    additionalInfoObj.isManualHold= "false";
    additionalInfoObj.isNotificationsEnabled= "false";
    additionalInfoObj.isPostPaidCustomer= "false";
    additionalInfoObj.isSplitCustomer= "false";
    additionalInfoObj.isSupervisor= "false";
    additionalInfoObj.isTagInStatusFile= "false";
    additionalInfoObj.isTagRequired= "false";
    additionalInfoObj.keyValue= "null";
    additionalInfoObj.loginId= "610908";
    additionalInfoObj.membershipType= 82;
    additionalInfoObj.nextRunDate="\/Date(1245398693390)\/";
    additionalInfoObj.organizationName= "null";
    additionalInfoObj.parentId= "0";
    additionalInfoObj.performBy= "null";
    additionalInfoObj.pin= "jK4EPin4aSyB+4+WlJWMvQ==";
    additionalInfoObj.planDescription= "null";
    additionalInfoObj.planId= "0";
    additionalInfoObj.preferedLanguange= "English";
    additionalInfoObj.preferredShipment= 339;
    additionalInfoObj.previousRunDate= "\/Date(1245398693390)\/";
    additionalInfoObj.rebill_Hold_EndEffectiveDate= "\/Date(1245398693390)\/";
    additionalInfoObj.rebill_Hold_StartEffectiveDate= "\/Date(1245398693390)\/";
    additionalInfoObj.referalBalance= "0";
    additionalInfoObj.referralCustomerId= "0";
    additionalInfoObj.refIndicator= "0";
    additionalInfoObj.refPkId= "0";
    additionalInfoObj.requestDate= "\/Date(1245398693390)\/";
    additionalInfoObj.requestStatus= 208;
    additionalInfoObj.revenueCategory= additionalInformationObj.account_Category;
    additionalInfoObj.securityQuestionsAndAnswers= "null";
    additionalInfoObj.sourceOfChannel= additionalInformationObj.howDidYouHearUs;
    additionalInfoObj.statementCycle= "null";
    additionalInfoObj.statementDelivery= additionalInformationObj.statement_Delivery_Options;
    additionalInfoObj.subSystem=803;
    additionalInfoObj.templateType= "null";
    additionalInfoObj.thresholdAmount= "0";
    additionalInfoObj.tranponderPurchasemethod= "null";
    additionalInfoObj.updatedUser= "tpsuperuser";
    additionalInfoObj.user= "null";
    additionalInfoObj.userId= "10000001";
    additionalInfoObj.userType = 11;
    console.log('additionalInfoObj '+JSON.stringify(additionalInfoObj));
    this.utilityService.additionalInformationOperation('PostUpdateInfo/?enumModuleType=Customer&enumActivityType=UpdateAdditionalInformation&longCustomerId=' + sessionStorage.getItem('CustomerId'), additionalInfoObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if(resObj.ResultValue==true){
        alert("Additional Information Updated Successfully...")
      }

    })
  }

clickDate= function(id){
    debugger;
    var parts = id.split('/');
// please put attention to the month (parts[0]), Javascript counts months from 0:
// January - 0, February - 1, etc
    var mydate = new Date(parts[2],  parts[1] - 1, parts[0], 18, 54, 0);
    console.log('parsed date  ' + mydate.getTime());
    console.log('parsed date1  ' + new Date(mydate.getTime()));
    console.log('Date now  ' + Date.now());
    console.log('Date from get time ' + new Date(1504013077297).getDate() );
    console.log('Date from get time1 ' + new Date(1504013077297).getHours() );
    console.log('Date from get time2 ' + new Date(1504013077297).getMinutes() );
    console.log('Date from get time3 ' + new Date(1504013077297).getSeconds() );
  }

  convertStringDateToNumberString= function(date, hours, mins, secs){
    debugger;
    var parts = date.split('/');
// please put attention to the month (parts[0]), Javascript counts months from 0:
// January - 0, February - 1, etc
    console.log('converted string date : ' + new Date(parts[2],  parts[1] - 1, parts[0], hours, mins, secs).getTime());
    return '\/Date(' + new Date(parts[2],  parts[1] - 1, parts[0], hours, mins, secs).getTime() + ')\/';

  }

  // returns the number of milli seconds as Locale Date. Ex: MM/dd/yyyy format
  convertNumberOfMilliSecsToLocaleDateString= function (dateInMilliSecs) {
    debugger;
    console.log(new Date(dateInMilliSecs).toLocaleDateString());
    return new Date(dateInMilliSecs).toLocaleDateString();
  }

  // returns the number of milli seconds as Date object. Ex: Tue Aug 29 2017 18:54:37 GMT+0530 (India Standard Time)
  // this function can be used to convert
  convertNumberOfMilliSecsToDate= function (dateInMilliSecs) {
    debugger;
    console.log('date in method ' +  parseInt(dateInMilliSecs));
    console.log(new Date(Date.parse(dateInMilliSecs)));
    return new Date(parseInt(dateInMilliSecs)).toLocaleString();
  }

  formatDate= function(date): string {
    // const dat = (new Date());
    debugger;
    console.log('date.getTime() ' + '\/Date(' + date.getTime() + ')\/');
    console.log('date.now() ' + '\/Date(' + Date.now() + ')\/');
    return '\/Date(' + date.getTime() + ')\/';
   /* return date.getMilliseconds();*/
  }


  userFormInitialValue=function () {
    this.user_Form = new FormGroup({
      first_Name: new FormControl('', Validators.compose([Validators.required,  Validators.pattern('[a-zA-z]+([ \'-][a-zA-Z]+)*')])),
      last_Name: new FormControl('', Validators.compose([Validators.required,  Validators.pattern('[a-zA-z]+([ \'-][a-zA-Z]+)*')])),
      businessCustomerType: new FormControl('', Validators.required),
      title: new FormControl(''),
      businessName: new FormControl('', Validators.required),
      suffix: new FormControl(''),
      middle_Name: new FormControl('', Validators.compose([Validators.pattern('[a-zA-z]+([ \'-][a-zA-Z]+)*')])),
      gender: new FormControl(''),
      date_Of_Birth: new FormControl(''),
      primary_Email: new FormControl('', Validators.compose([Validators.required, CreateaccountComponent.emailValidator])),
      secondary_Email: new FormControl('', Validators.compose([Validators.required, CreateaccountComponent.emailValidator])),
      day_Phone_Number: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      eveningPhone: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      mobile_Phone_Number: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      workPhone: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      fax: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      ext: new FormControl(''),
      country: new FormControl('', Validators.required),
      city_Name: new FormControl('', Validators.compose([Validators.required,  Validators.pattern('[a-zA-z]+([ \'-][a-zA-Z]+)*')])),
      zip1: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(6)])),
      zip2: new FormControl(''),
      address1: new FormControl('', Validators.required),
      address2: new FormControl(''),
      idProofType: new FormControl('', Validators.required),
      idProofNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-z0-9]+([ \'-][a-zA-Z0-9]+)*')])),
      idProofFileDrop: new FormControl(''),
      addressProof: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-z0-9]+([ \'-][a-zA-Z0-9]+)*')])),
      agreeTermsAndConditions: new FormControl('', Validators.required),
      passWord: new FormControl('', Validators.required),
      selectedstate: new FormControl('', Validators.required),
      idProof_other: new FormControl(''),
      addressProof_other: new FormControl(''),
      addressProofFileDrop: new FormControl(''),
      preferredEmail: new FormControl('Primary Email'),
      preferredPhone: new FormControl('Day Phone'),


    });

  }


}

