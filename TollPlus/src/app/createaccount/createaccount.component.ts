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
import {AdditionalInformation} from '../pojo/AdditionalInformation';
import * as toastr from 'toastr';
import {ConstructPaymentObject} from "../pojo/payment/ConstructPaymentObject";
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
  payment_Form: FormGroup;
  text: FormControl;
  tempEncryptedPassword = '';

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
  statesForDialougu= [];
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
  //payment information changes start
  planArray = [];
  isTagRequested = true;
  getCreditCardExpiryMonths = [];
  getCreditCardExpiryYears = [];
  creditCardServiceTax=0;
  serviceTaxAppliedOnTagFee=0;
  calculatedTollTagFee=0;
  calculatedTotalTagDeposit=0;
  calculatedSubTotal= 0;
  calculatedTotalAmount = 0;
  finalAmount= 0;
  calculatedServiceTaxOnTollTagFee = 0;
  calculatedShippingCharges = 0;
  tagShipmentTypes=[];
  noOfTagEntered = 0;
  getEnrollmentFee = 0;
  tempShipmentTypeIndex = 0;
  arrayOfTagsEntered=[];
  selectedPlanId;
  tempPaymentObject;
  enteredCreditCard;
  //payment information changes end
  inputEncryptionObject: Object= {};
  cardTypes= [];
  existingAddressDetails;
  FullAddress;
  payementResponseObject={};
  currentDate;
  prefEmail;
  constructor(private  myApp: AppComponent, private utilityService: UtilityService, private formBuilder: FormBuilder,
              private constructPaymentObject:ConstructPaymentObject) {
    this.idProofFullPath = '/pom.xml';
    this.addressProofFullPath = '/pom.xml';
  }

  public IdProofDropped(event) {
    this.files = event.files;
    debugger;

    var reader = new FileReader();

    var fileExt=this.files[0].relativePath.split(".")[1];
    if(fileExt=="jpeg" ||fileExt=="jpg" || fileExt=="png" ){
      var reader = new FileReader();
      console.log('reader object ' + reader.readAsArrayBuffer(new Blob([this.files[0]])));
      console.log('blob object ' + new Blob([this.files[0]]));
      this.idProofFullPath = this.idProofFileUpload(reader, this.files[0]);

    }else{
      this.idProofFullPath =null;
      $('.idProofFileDropColor').css('border', ' 2px dotted red');
      $('.idProofFileDropColor').css('border-radius', ' 30px');
      toastr.error("Invalid Formate,Supported Formates are JPEG,JPG,PNG")
    }


  }

  idProofFileUpload=function (reader:any, inputFile) {
    this.utilityService.postFileUpload(reader,inputFile.fileEntry.fullPath)
      .subscribe(res => {
        var resObj=JSON.parse(res._body);
        if(resObj.Result==true){
          $('.idProofFileDropColor').css('border', ' 2px dotted green');
          $('.idProofFileDropColor').css('border-radius', ' 30px');
          toastr.success(inputFile.fileEntry.name+" File Uploaded Successfully.." );
          return res.ResultValue;
        }
      });
  }
  addressProofFileUpload=function (reader:any, inputFile) {
    this.utilityService.postFileUpload(reader,inputFile.fileEntry.fullPath)
      .subscribe(res => {
        var resObj=JSON.parse(res._body);
        if(resObj.Result==true){
          $('.addressProofFileDropColor').css('border', ' 2px dotted green');
          $('.addressProofFileDropColor').css('border-radius', ' 30px');
          toastr.success(inputFile.fileEntry.name+" File Uploaded Successfully..");
          return res.ResultValue;
        }
      });
  }
  public IdProofFileOver(event){
  }

  public IdProofFileLeave(event){
  }
  public AddressProofDropped(event) {
    this.files = event.files;
    debugger;
    var fileExt=this.files[0].relativePath.split(".")[1];
    if(fileExt=="jpeg" ||fileExt=="jpg" || fileExt=="png" ){
      var reader = new FileReader();
      console.log('reader object ' + reader.readAsArrayBuffer(new Blob([this.files[0]])));
      console.log('blob object ' + new Blob([this.files[0]]));
      this.addressProofFullPath = this.addressProofFileUpload(reader, this.files[0]);

    }else{
      this.addressProofFullPath =null;
      $('.addressProofFileDropColor').css('border', ' 2px dotted red');
      $('.addressProofFileDropColor').css('border-radius', ' 30px');
toastr.error("Invalid Formate,Supported Formates are JPEG,JPG,PNG")
    }


  }

  public AddressProofFileOver(event){
  }

  public AddressProofFileLeave(event){
  }



  ngOnInit() {
    /*sessionStorage.setItem("CustomerId","10002878");*/
    this.creditCardExpiryYears();
    this.getAllActiveTagConfiguration();
    /*this.existingAddressDetails="Address:-Addres1,Addres2, City:Hyderabadsd, Country:IND, State:AN, Zip1:212112, Zip2:2121";*/
    toastr.options = {
      'closeButton': true,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-top-right',
      'preventDuplicates': false,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }
    $('#businessName').prop('disabled', true);
    this.getHearAboutUs();
    this.getStatementDelivOption();
    this.getRevenueCategory();

    const emailPattern = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    const emailPattern1 = '/[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)';

    this.userFormInitialValue();
    this.paymentFormInitialValues();
    this.getTagShipmentTypeMethod();
    //this.tagDeliveryMethodSelected();
    this.getCreditCardServiceTax();
    this.getServiceTaxAppliedOnTagFee();
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
        $('.nav-tabs > .active .badge').text('✔');
        $('.nav-tabs > .active .badge').css('color', 'lightgreen');
        $('.nav-tabs > .active .badge').css('background-color', 'forestgreen');
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
      $('.innerBtnNext').click(function(){
        $('.inner-nav-tabs > .active').next('li').find('a').click(function() {
          this.click();
        }).click();


      });

      $('.innerBtnPrevious').click(function(){
        $('.inner-nav-tabs > .active').prev('li').find('a').click(function() {
          this.click();
        }).click();
      });



      $('#dyamicpopulate').click('on', function(){
        $('#dynamiccollapsein').toggle();
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
    this.getCardTypes();
    this.getAmountSummaryDetials();

    this.getCreditCardExpiryMonths = [
      {
        id: '01',
        description: 'January'
      }, {
        id: '02',
        description: 'February'
      }, {
        id: '03',
        description: 'March'
      }, {
        id: '04',
        description: 'April'
      }, {
        id: '05',
        description: 'May'
      },
      {
        id: '06',
        description: 'June'
      }, {
        id: '07',
        description: 'July'
      }, {
        id: '08',
        description: 'August'
      }, {
        id: '09',
        description: 'September'
      }, {
        id: '10',
        description: 'October'
      }, {
        id: '11',
        description: 'November'
      }, {
        id: '12',
        description: 'December'
      }];
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
    this.getStatesForDialogue(editableVehicleObj.Country);
    const editVehicleStartDate = new Date(editableVehicleObj.StartEffectiveDate);
    const editVehicleEndDate = new Date(editableVehicleObj.EndEffectiveDate);
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
    let vehicleModelCount = 0;
    for (let i = 0; i < this.vehicleModels.length; i++){
      if (this.vehicleModels[i].Make == editableVehicleObj.Make) {
        console.log(this.vehicleModels[i].Modal);
        this.vehicleModelArrays[vehicleModelCount] = this.vehicleModels[i].Model;
        vehicleModelCount++;
      }
    }
  }
  loadDropDown= function () {

    $('#vehicleClass').val('Class1');
    /*alert($('#vehicleClass').val());*/
  }
  savePersonal= function(customerInfo){
    $('#saveCustomerId').prop('disabled', true);
    let primaryEmailIsPrefd = false;
    let secondaryEmailisPrfd = false;
    if (customerInfo.preferredEmail == 'Primary Email'){
      primaryEmailIsPrefd = true;
      secondaryEmailisPrfd = false;
      this.prefEmail = customerInfo.primary_Email;

    }else{
      primaryEmailIsPrefd = false;
      secondaryEmailisPrfd = true;
      this.prefEmail = customerInfo.secondary_Email;
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
    debugger;
    //CALL FOR PASSWORD ENCRYPTION
    //this.tempEncryptedPassword = this.getEncryptedString(customerInfo.passWord, customerInfo.userName,  'Password');

    this.inputEncryptionObject = {
      'plainText': customerInfo.passWord,

      'saltValue': customerInfo.userName,
      'encryptText': 'null',

      'isEncrypted': 'false',

      'SecurityType': 'Password'
    };

    const tempInpEncryObj = JSON.stringify(this.inputEncryptionObject);
    console.log('password input object  ' + tempInpEncryObj);
    this.utilityService.encryptedString('PostEncrypt', tempInpEncryObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if (resObj.Result === true) {
        this.tempEncryptedPassword = resObj.ResultValue;



        console.log('password value ' + this.tempEncryptedPassword);
        this.account.retypePassword = this.tempEncryptedPassword;
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
        debugger;
        this.account.password = this.tempEncryptedPassword;
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
        debugger;
        console.log(tempInputObj);
        this.utilityService.saveCustomer('PostCreateCustomer', tempInputObj).subscribe(res => {

          const resObj = JSON.parse(res._body);
          console.log(resObj.ResultValue);
          if (resObj.Result == false){
            $('#saveCustomerId').prop('disabled', false);
            this.userNameValidationResult = resObj.ResultValue;
            toastr.error(resObj.ResultValue);
            $('.nav-tabs > .active .badge').text('X');
            $('.nav-tabs > .active .badge').css('color', 'white');
            $('.nav-tabs > .active .badge').css('background-color', 'crimson');
          }else{
            sessionStorage.setItem('CustomerId', resObj.ResultValue);
            debugger;
            $('.nav-tabs > .active .badge').text('✔');
            $('.nav-tabs > .active .badge').css('color', 'lightgreen');
            $('.nav-tabs > .active .badge').css('background-color', 'forestgreen');
            this.userFormInitialValue();
            /*alert(' Customer  Successfully Registered With ID: ' + resObj.ResultValue);*/
            $('.my-link').unbind('click', false);
            $('.nav-tabs > .active').next('li').find('a').click(function () {
// 'this' is not a jQuery object, so it will use
// the default click() function
              this.click();
            }).click();
            $('.my-link').bind('click', false);
            toastr.success('Account Information Saved Successfully...');
            this.getVehicles();
          }


        })
      }else {
        toastr.error('Password Encryption Failed');
        $('.nav-tabs > .active .badge').text('X');
        $('.nav-tabs > .active .badge').css('color', 'white');
        $('.nav-tabs > .active .badge').css('background-color', 'crimson');
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
      'CountryCode' : $('#' + id + '').val()};
    console.log(this.countryObject);
    this.utilityService.getStates('PostGetStatesByCountryCode', JSON.stringify(this.countryObject)).subscribe(res => {

      const resObj = JSON.parse(res._body);
      console.log(resObj.StateCode);
      this.states = resObj.ResultValue;
      this.statesForDialougu = resObj.ResultValue;
    })
  };
  getStatesForDialogue= function(countryCode){
    this.countryObject = {
      'LookUpTypeCode' : 'TollSchedulePriorities',
      'CountryCode' : countryCode};
    console.log(this.countryObject);
    this.utilityService.getStates('PostGetStatesByCountryCode', JSON.stringify(this.countryObject)).subscribe(res => {

      const resObj = JSON.parse(res._body);
      //console.log(resObj.StateCode);
      this.statesForDialougu = resObj.ResultValue;
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
    this.businesses = [{'__type': 'KeyValuePairOfstringstring:#System.Collections.Generic', 'key': 'Individual', 'value': 'Individual Customer'},
      {'__type': 'KeyValuePairOfstringstring:#System.Collections.Generic', 'key': 'Business', 'value': 'Business Customer'}];
  }
  getBusinessCustomer= function () {
    /*  this.utilityService.getDropDownValues('GetLookups/?Type=Business&Customer').subscribe(res => {
        const resObj = JSON.parse(res._body);
        this.businessCustomers = resObj.ResultValue;

      })*/
    this.businessCustomers = [{'__type': 'KeyValuePairOfstringstring:#System.Collections.Generic', 'key': 'Individual', 'value': 'Individual Customer'},
      {'__type': 'KeyValuePairOfstringstring:#System.Collections.Generic', 'key': 'Business', 'value': 'Business Customer'}];
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


    const accType = $('#businessCustomerType').val();
    if (accType == 'Business'){
      this.getAddressProofBusiness();
      this.getIdProofBusiness();
      $('#businessName').prop('disabled', false);
    }else{
      this.user_Form.controls['businessName']._status = 'valid';
      this.getIdProof();
      this.getAddressProof();
      $('#businessName').text('');
      $('#businessName').prop('disabled', true);
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
    if (control.value){
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

    this.states = [];
    return new FormGroup({
      plateNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-z0-9]+([ \'-][a-zA-Z0-9]+)*')])),
      vehicleClass: new FormControl('', Validators.required),
      vehicle_Make: new FormControl('', Validators.required),
      vehicle_Year: new FormControl('', Validators.required),
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
    console.log('vehicle information  ' + JSON.stringify(vehicleInfo));
    const tempJsonObj = JSON.stringify(vehicleInfo);
    let tempVehicleObj = this.setVehicleArrayObject(vehicleInfo);
    tempVehicleObj = this.setVehicleObjectWithDynamicValues(tempVehicleObj, vehicleInfo);
    tempVehicleObj.accountId = sessionStorage.getItem('CustomerId');
    tempVehicleObj.contractType = 'Leased';
    tempVehicleObj.vehicleId = '0';
    tempVehicleObj.FutureClosureDate = null;
    console.log('actual Obj ' + JSON.stringify(tempVehicleObj));
    this.utilityService.vehicleOperation('PostCreate/?enumModuleType=Customer&enumActivityType=Vehicles&longCustomerId=' + sessionStorage.getItem('CustomerId'), tempVehicleObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if (resObj.ResultValue == true){
        this.getVehicles();
        // alert("Vehicle Added Successfully..");

        this.resetVehicleForm();
        toastr.success( 'Vehicle Information Saved Sucessfully...');
      } else {
        $('.nav-tabs > .active .badge').text('X');
        $('.nav-tabs > .active .badge').css('color', 'white');
        $('.nav-tabs > .active .badge').css('background-color', 'crimson');
        toastr.error( resObj.ResultValue);

      }
    })
    //this.vehicleArray[length] = tempVehicle;

  }
  updateVehicle= function (vehicleInfo) {

    const tempJsonObj = JSON.stringify(vehicleInfo);
    let tempVehicleObj = this.setVehicleArrayObject();
    tempVehicleObj = this.setVehicleObjectWithDynamicValuesForUpdateVehicle(tempVehicleObj, vehicleInfo);
    tempVehicleObj.accountId = sessionStorage.getItem('CustomerId');
    tempVehicleObj.vehicleId = this.vehicleFormEdit.value.vehicleId;
    tempVehicleObj.contractType = this.vehicleFormEdit.value.ContractType;
    this.utilityService.vehicleOperation('PostUpdateVehicle/?enumModuleType=Customer&enumActivityType=Vehicles&longCustomerId=' + sessionStorage.getItem('CustomerId'), tempVehicleObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if (resObj.ResultValue == true){
        this.getVehicles();
        $('#dynamiccollapsein').toggle();
        toastr.success( 'Vehicle Information Updated Successfully...');
        $('[data-dismiss=modal]').trigger({ type: 'click' });
      } else {
        toastr.error( resObj.ResultValue);
      }
    })
  }
  deleteVehicle= function (vehicleInfo) {
    const deleteObj = new Vehicle();
    deleteObj.accountId = sessionStorage.getItem('CustomerId');
    deleteObj.checkBlockList = true;
    deleteObj.color = vehicleInfo.Color;
    deleteObj.contractType = vehicleInfo.ContractType;
    deleteObj.country = vehicleInfo.CountryCode;
    deleteObj.currentDateTime = '\/Date(1245398693390)\/';
    deleteObj.deactivatedDate = '\/Date(1245398693390)\/';
    deleteObj.endEffectiveDate = '\/Date(1245398693390)\/';
    deleteObj.filePath = null;
    deleteObj.futureClosureDate = null;
    deleteObj.isExempted = false;
    deleteObj.isProtected = false;
    deleteObj.isTemporaryNumber = false;
    deleteObj.loginId = 610901;
    deleteObj.make = vehicleInfo.Make;
    deleteObj.model = vehicleInfo.Model;
    deleteObj.oldTagType = null;
    deleteObj.oldVehicleNumber = null;
    deleteObj.pageNumber = 0;
    deleteObj.pageSize = 0;
    deleteObj.rCNumber = null;
    deleteObj.searchVehicleActivityInd = false;
    deleteObj.sortColumn = null;
    deleteObj.sortDirection = false;
    deleteObj.source = null;
    deleteObj.startEffectiveDate = '\/Date(1245398693390)\/';
    deleteObj.state = vehicleInfo.State;
    deleteObj.systemUserActivityInd = true;
    deleteObj.tagSerialNum = null;
    deleteObj.tagType = null;
    deleteObj.userId = 10000001;
    deleteObj.userName = 'tpsuperuser';
    deleteObj.vehicleClass = vehicleInfo.VehicleClass;
    deleteObj.vehicleClassDesc = null;
    deleteObj.vehicleHistoryActivity = false;
    deleteObj.vehicleId = vehicleInfo.VehicleId;
    deleteObj.vehicleLoadActivityInd = false;
    deleteObj.vehicleNumber = vehicleInfo.VehicleNumber;
    deleteObj.vehicleSearchActivityInd = vehicleInfo.VehicleSearchActivityInd;
    deleteObj.vehicleStatus = vehicleInfo.VehicleStatus;
    deleteObj.year = vehicleInfo.Year;





    const deleteVehicleObj = JSON.stringify(deleteObj);
    debugger;
    console.log('deleteVehicleObj ' + deleteVehicleObj);
    this.utilityService.vehicleOperation('PostDeleteVehicle/?enumModuleType=Customer&enumActivityType=RemoveVehicle&longCustomerId=' + sessionStorage.getItem('CustomerId'), deleteVehicleObj)
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        if (resObj.ResultValue == true){
          this.getVehicles();
          toastr.success( 'Vehicle Information Deleted Successfully...');
        } else {
          toastr.error(resObj.ResultValue);
        }
      });

  }
  getVehicles= function () {
    const tempVehicleObj = this.setVehicleArrayObject();
    debugger;
    tempVehicleObj.accountId = sessionStorage.getItem('CustomerId');
    tempVehicleObj.contractType = '';
    tempVehicleObj.vehicleId = '0';
    tempVehicleObj.pageNumber = 1;
    tempVehicleObj.pageSize = 10;
    tempVehicleObj.sortColumn = 'VEHICLENUMBER';
    console.log('actual Obj ' + JSON.stringify(tempVehicleObj));
    this.utilityService.vehicleOperation('PostGet/?enumModuleType=Customer&enumActivityType=ActiveVehicles&longCustomerId=' + sessionStorage.getItem('CustomerId'), tempVehicleObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      // alert(resObj.ResultValue[0].VehicleId);
      // alert(resObj.ResultValue[0].VehicleNumber);
      this.vehicleArray = resObj.ResultValue;
      debugger;
      if(resObj.ResultValue!=null)
      for (let i = 0; i < this.vehicleArray.length; i++) {
        if (this.vehicleArray[i].Color != null || this.vehicleArray[i].Color != ''){
          this.vehicleArray[i].ColorValue = this.getDropDownValueBasedOnKey(this.vehicleArray[i].Color, this.vehicleColors);
        }
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
      debugger;
      console.log("before length function ");
      //console.log('this.vehicleArray length ' + this.vehicleArray.length);
      if (resObj.ResultValue!=null){
        this.isVehicleExists = true;
        $('#dynamiccollapsein').toggle();
      } else {
        this.isVehicleExists = false;
        $('#dynamiccollapsein').toggle();
      }
    })
  }




  setVehicleArrayObject= function () {
    const tempVehicle = new Vehicle();
    debugger;
    tempVehicle.checkBlockList = 'true';
    tempVehicle.filePath = 'null';
    tempVehicle.isExempted = 'false';
    tempVehicle.isProtected = 'false';
    tempVehicle.isTemporaryNumber = 'false';
    tempVehicle.loginId = '610901';
    tempVehicle.oldTagType = 'null';
    tempVehicle.oldVehicleNumber = 'null';
    tempVehicle.pageNumber = '0';
    tempVehicle.pageSize = '0';
    tempVehicle.rCNumber = 'null';
    tempVehicle.searchVehicleActivityInd = 'false';
    tempVehicle.sortColumn = 'null';
    tempVehicle.sortDirection = 'false';
    tempVehicle.source = 'null';
    // tempVehicle.startEffectiveDate=this.getCurrentDate();
    tempVehicle.systemUserActivityInd = 'true';
    tempVehicle.tagSerialNum = 'null';
    tempVehicle.tagType = 'null';
    tempVehicle.userId = '10000001';
    tempVehicle.userName = 'tpsuperuser';
    tempVehicle.vehicleClassDesc = 'null';
    tempVehicle.vehicleHistoryActivity = 'false';
    tempVehicle.vehicleLoadActivityInd = 'false';
    tempVehicle.vehicleSearchActivityInd = 'false';
    tempVehicle.vehicleStatus = 'Active';
    return tempVehicle;
  }

  getModels= function (vehicleMakeId) {
    const make = $('#' + vehicleMakeId + '').val();
    let vehicleModelCount = 0;
    for (let i = 0; i < this.vehicleModels.length; i++){
      if (this.vehicleModels[i].Make == make) {
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
    if ($('#startEffectiveDate').val().length != 0) {
      vehicleWholeObject.startEffectiveDate = this.convertStringDateToNumberString($('#startEffectiveDate').val(),
        vehicleFormObj.startDateHours, vehicleFormObj.startDateMins, vehicleFormObj.startDateSecs);
    }else {
      vehicleWholeObject.startEffectiveDate = this.getCurrentDate();
    }
    console.log('passing start date' + this.convertStringDateToNumberString($('#endEffectiveDate').val(),
      vehicleFormObj.endDateHours, vehicleFormObj.endDateMins, vehicleFormObj.endDateSecs));
    if ($('#endEffectiveDate').val().length != 0) {
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
    if ($('#start_Effective_Date').val().length != 0) {
      vehicleWholeObject.startEffectiveDate = this.convertStringDateToNumberString($('#start_Effective_Date').val(),
        vehicleFormObj.startDateHours, vehicleFormObj.startDateMins, vehicleFormObj.startDateSecs);
    }else {
      vehicleWholeObject.startEffectiveDate = this.getCurrentDate();
    }
    console.log('passing start date' + this.convertStringDateToNumberString($('#end_Effective_Date').val(),
      vehicleFormObj.endDateHours, vehicleFormObj.endDateMins, vehicleFormObj.endDateSecs));
    if ($('#end_Effective_Date').val().length != 0) {
      vehicleWholeObject.endEffectiveDate = this.convertStringDateToNumberString($('#end_Effective_Date').val(),
        vehicleFormObj.endDateHours, vehicleFormObj.endDateMins, vehicleFormObj.endDateSecs);
    } else {
      vehicleWholeObject.endEffectiveDate = this.getCurrentDate();
    }
    return vehicleWholeObject;
  }



  saveAdditionalInformation = function(additionalInformationObj){
    $('#saveAddtnlButtonId').prop('disabled', true);
    debugger;
    const  additionalInfoObj = new  AdditionalInformation();
    additionalInfoObj.accountId = sessionStorage.getItem('CustomerId'); //additionalInformationObj.friendshipRewardAccountNo;
    additionalInfoObj.accountType = 'null';
    additionalInfoObj.actionCode = 'null';
    additionalInfoObj.activitySource = 710;
    additionalInfoObj.activityTypeDescription = 'null';
    additionalInfoObj.autoReplenishmentType = 'null';
    additionalInfoObj.autoReplenishmentTypeDesc = 'null';
    additionalInfoObj.calculatedReBillAmount = '0';
    additionalInfoObj.customerStatus = 13;
    additionalInfoObj.checkBlockList = 'true';
    additionalInfoObj.cycleUpdatedDate = '\/Date(1245398693390)\/';
    additionalInfoObj.driverLicenceApprovedState = 'null';
    additionalInfoObj.driverLicenceExpirationDate = '\/Date(1245398693390)\/';
    additionalInfoObj.driverLicenceNumber = 'null';
    additionalInfoObj.enrollmentNumber = 'null';
    additionalInfoObj.featuresCode = 'null';
    additionalInfoObj.invoiceAmount = '0';
    additionalInfoObj.invoiceAmt = 'null';
    additionalInfoObj.invoiceDay = '0';
    additionalInfoObj.invoiceIntervalID = '4';
    additionalInfoObj.isCreateAccountUserActivity = 'true';
    additionalInfoObj.iSFrequentCaller = 'false';
    additionalInfoObj.isHearingImpirement = 'false';
    additionalInfoObj.isManualHold = 'false';
    additionalInfoObj.isNotificationsEnabled = 'false';
    additionalInfoObj.isPostPaidCustomer = 'false';
    additionalInfoObj.isSplitCustomer = 'false';
    additionalInfoObj.isSupervisor = 'false';
    additionalInfoObj.isTagInStatusFile = 'false';
    additionalInfoObj.isTagRequired = 'false';
    additionalInfoObj.keyValue = 'null';
    additionalInfoObj.loginId = '610908';
    additionalInfoObj.membershipType = 82;
    additionalInfoObj.nextRunDate = '\/Date(1245398693390)\/';
    additionalInfoObj.organizationName = 'null';
    additionalInfoObj.parentId = '0';
    additionalInfoObj.performBy = 'null';
    additionalInfoObj.pin = this.tempEncryptedPassword;
    additionalInfoObj.planDescription = 'null';
    additionalInfoObj.planId = '0';
    additionalInfoObj.preferedLanguange = 'English';
    additionalInfoObj.preferredShipment = 339;
    additionalInfoObj.previousRunDate = '\/Date(1245398693390)\/';
    additionalInfoObj.rebill_Hold_EndEffectiveDate = '\/Date(1245398693390)\/';
    additionalInfoObj.rebill_Hold_StartEffectiveDate = '\/Date(1245398693390)\/';
    additionalInfoObj.referalBalance = '0';
    additionalInfoObj.referralCustomerId = '10002865';
    /*if(additionalInformationObj.friendshipRewardAccountNo.length != 0) {
      additionalInfoObj.referralCustomerId = additionalInformationObj.friendshipRewardAccountNo;
    }*/

    additionalInfoObj.refIndicator = '0';
    additionalInfoObj.refPkId = '0';
    additionalInfoObj.requestDate = '\/Date(1245398693390)\/';
    additionalInfoObj.requestStatus = 208;
    additionalInfoObj.revenueCategory = additionalInformationObj.account_Category;
    additionalInfoObj.securityQuestionsAndAnswers = 'null';
    additionalInfoObj.sourceOfChannel = additionalInformationObj.howDidYouHearUs;
    additionalInfoObj.statementCycle = 'null';
    additionalInfoObj.statementDelivery = additionalInformationObj.statement_Delivery_Options;
    additionalInfoObj.subSystem = 803;
    additionalInfoObj.templateType = 'null';
    additionalInfoObj.thresholdAmount = '0';
    additionalInfoObj.tranponderPurchasemethod = 'null';
    additionalInfoObj.updatedUser = 'tpsuperuser';
    additionalInfoObj.user = 'null';
    additionalInfoObj.userId = '10000001';
    additionalInfoObj.userType = 11;
    console.log('additionalInfoObj ' + JSON.stringify(additionalInfoObj));
    this.utilityService.additionalInformationOperation('PostAddInfo/?enumModuleType=Customer&enumActivityType=AdditionalInformation&longCustomerId=' + sessionStorage.getItem('CustomerId'), additionalInfoObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if (resObj.Result == true) {
//alert(resObj.ResultValue);
        $('.nav-tabs > .active .badge').text('✔');
        $('.nav-tabs > .active .badge').css('color', 'lightgreen');
        $('.nav-tabs > .active .badge').css('background-color', 'forestgreen');
        $('.my-link').unbind('click', false);
        $('.nav-tabs > .active').next('li').find('a').click(function () {
// 'this' is not a jQuery object, so it will use
// the default click() function
          this.click();
        }).click();
        $('.my-link').bind('click', false);
        toastr.success( 'Additional Information Saved Successfully...');
        this.getAllPlansWithFees();
        this.getDefaultAddressForCustomer();
      }else{
        $('#saveAddtnlButtonId').prop('disabled', false);
        $('.nav-tabs > .active .badge').text('X');
        $('.nav-tabs > .active .badge').css('color', 'white');
        $('.nav-tabs > .active .badge').css('background-color', 'crimson');
        toastr.error( resObj.ResultValue);
      }
    })
  }


  updateAdditionalInformation = function(additionalInformationObj){
    debugger;
    const  additionalInfoObj = new  AdditionalInformation();
    additionalInfoObj.accountId = sessionStorage.getItem('CustomerId'); //additionalInformationObj.friendshipRewardAccountNo;
    additionalInfoObj.accountType = 'null';
    additionalInfoObj.actionCode = 'null';
    additionalInfoObj.activitySource = 710;
    additionalInfoObj.activityTypeDescription = 'null';
    additionalInfoObj.autoReplenishmentType = 'null';
    additionalInfoObj.autoReplenishmentTypeDesc = 'null';
    additionalInfoObj.calculatedReBillAmount = '0';
    additionalInfoObj.customerStatus = 13;
    additionalInfoObj.checkBlockList = 'true';
    additionalInfoObj.cycleUpdatedDate = '\/Date(1245398693390)\/';
    additionalInfoObj.driverLicenceApprovedState = 'null';
    additionalInfoObj.driverLicenceExpirationDate = '\/Date(1245398693390)\/';
    additionalInfoObj.driverLicenceNumber = 'null';
    additionalInfoObj.enrollmentNumber = 'null';
    additionalInfoObj.featuresCode = 'null';
    additionalInfoObj.invoiceAmount = '0';
    additionalInfoObj.invoiceAmt = 'null';
    additionalInfoObj.invoiceDay = '0';
    additionalInfoObj.invoiceIntervalID = '4';
    additionalInfoObj.isCreateAccountUserActivity = 'true';
    additionalInfoObj.iSFrequentCaller = 'false';
    additionalInfoObj.isHearingImpirement = 'false';
    additionalInfoObj.isManualHold = 'false';
    additionalInfoObj.isNotificationsEnabled = 'false';
    additionalInfoObj.isPostPaidCustomer = 'false';
    additionalInfoObj.isSplitCustomer = 'false';
    additionalInfoObj.isSupervisor = 'false';
    additionalInfoObj.isTagInStatusFile = 'false';
    additionalInfoObj.isTagRequired = 'false';
    additionalInfoObj.keyValue = 'null';
    additionalInfoObj.loginId = '610908';
    additionalInfoObj.membershipType = 82;
    additionalInfoObj.nextRunDate = '\/Date(1245398693390)\/';
    additionalInfoObj.organizationName = 'null';
    additionalInfoObj.parentId = '0';
    additionalInfoObj.performBy = 'null';
    additionalInfoObj.pin = 'jK4EPin4aSyB+4+WlJWMvQ==';
    additionalInfoObj.planDescription = 'null';
    additionalInfoObj.planId = '0';
    additionalInfoObj.preferedLanguange = 'English';
    additionalInfoObj.preferredShipment = 339;
    additionalInfoObj.previousRunDate = '\/Date(1245398693390)\/';
    additionalInfoObj.rebill_Hold_EndEffectiveDate = '\/Date(1245398693390)\/';
    additionalInfoObj.rebill_Hold_StartEffectiveDate = '\/Date(1245398693390)\/';
    additionalInfoObj.referalBalance = '0';
    additionalInfoObj.referralCustomerId = '0';
    additionalInfoObj.refIndicator = '0';
    additionalInfoObj.refPkId = '0';
    additionalInfoObj.requestDate = '\/Date(1245398693390)\/';
    additionalInfoObj.requestStatus = 208;
    additionalInfoObj.revenueCategory = additionalInformationObj.account_Category;
    additionalInfoObj.securityQuestionsAndAnswers = 'null';
    additionalInfoObj.sourceOfChannel = additionalInformationObj.howDidYouHearUs;
    additionalInfoObj.statementCycle = 'null';
    additionalInfoObj.statementDelivery = additionalInformationObj.statement_Delivery_Options;
    additionalInfoObj.subSystem = 803;
    additionalInfoObj.templateType = 'null';
    additionalInfoObj.thresholdAmount = '0';
    additionalInfoObj.tranponderPurchasemethod = 'null';
    additionalInfoObj.updatedUser = 'tpsuperuser';
    additionalInfoObj.user = 'null';
    additionalInfoObj.userId = '10000001';
    additionalInfoObj.userType = 11;
    console.log('additionalInfoObj ' + JSON.stringify(additionalInfoObj));
    this.utilityService.additionalInformationOperation('PostUpdateInfo/?enumModuleType=Customer&enumActivityType=UpdateAdditionalInformation&longCustomerId=' + sessionStorage.getItem('CustomerId'), additionalInfoObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if (resObj.ResultValue == true){
        alert('Additional Information Updated Successfully...')
      }

    })
  }

  clickDate= function(id){
    debugger;
    const parts = id.split('/');
// please put attention to the month (parts[0]), Javascript counts months from 0:
// January - 0, February - 1, etc
    const mydate = new Date(parts[2],  parts[1] - 1, parts[0], 18, 54, 0);
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
    const parts = date.split('/');
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


  userFormInitialValue= function () {
    this.user_Form = new FormGroup({
      first_Name: new FormControl('', Validators.compose([Validators.required,  Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-z]+([ \'-][a-zA-Z]+)*')])),
      last_Name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-z]+([ \'-][a-zA-Z]+)*')])),
      businessCustomerType: new FormControl('', Validators.required),
      title: new FormControl(''),
      businessName: new FormControl('', Validators.required),
      suffix: new FormControl(''),
      middle_Name: new FormControl('', Validators.compose([Validators.pattern('[a-zA-z]+([ \'-][a-zA-Z]+)*'), Validators.maxLength(2)])),
      gender: new FormControl(''),
      date_Of_Birth: new FormControl(''),
      primary_Email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100), CreateaccountComponent.emailValidator])),
      secondary_Email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100), CreateaccountComponent.emailValidator])),
      day_Phone_Number: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      eveningPhone: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      mobile_Phone_Number: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      workPhone: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      fax: new FormControl('', Validators.compose([Validators.required, CustomValidator.validatePhoneNumber])),
      ext: new FormControl('', Validators.compose([Validators.pattern('[0-9]{3}')])),
      country: new FormControl('', Validators.required),
      city_Name: new FormControl('', Validators.compose([Validators.required,  Validators.pattern('[a-zA-Z0-9]+([ \'-][a-zA-Z0-9]+)*')])),
      zip1: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(6)])),
      zip2: new FormControl('', Validators.compose([Validators.pattern('[0-9]{3}'), Validators.maxLength(3)])),
      address1: new FormControl('', Validators.required),
      address2: new FormControl(''),
      idProofType: new FormControl('', Validators.required),
      idProofNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-z0-9]+([ \'-][a-zA-Z0-9]+)*')])),
      idProofFileDrop: new FormControl(''),
      addressProof: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z0-9]+([\'][a-zA-Z0-9]+)*')])),
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
  disableButton= function () {
    $('.nav-tabs > .active .badge').text('✔');
    $('.nav-tabs > .active .badge').css('color', 'lightgreen');
    $('.nav-tabs > .active .badge').css('background-color', 'forestgreen');
    $('#paymentAdditionalInfo').prop('disabled', true);
    $('#paymentSubmit').prop('disabled', true);
    toastr.success( 'Payment Information Submitted Successfully...');
  }

  getCardTypes= function () {
    this.utilityService.paymentInformationOperationWithoutParameters('GetLookups/?Type=CreditCardType').subscribe(res => {
      const resObj = JSON.parse(res._body);
      this.cardTypes = resObj.ResultValue;
      //console.log("countries" + resObj.ResultValue);
      //console.log(typeof  resObj)
    })
  };

  getAmountSummaryDetials= function () {
    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/IsPlanBasedStmt')
      .subscribe(res => {
      const resObj = JSON.parse(res._body);
      const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
      const tempObj = {'description': 'IsPlanBasedStmt', 'amount': tempValue};
      this.amountSummaryDetails.push(tempObj);

    });*/

    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/CCServiceTax')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'CCServiceTax', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/
    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/IsVehicleTags')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'IsVehicleTags', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/
    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/CashReplnAmt')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'CashReplnAmt', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/
    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/CreditCardReplnAmt')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'CreditCardReplnAmt', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/
    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/ACHReplnAmt')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'ACHReplnAmt', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/

    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/MinDaystoProcessPlan')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'MinDaystoProcessPlan', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/
    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/IsServiceTax')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'IsServiceTax', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/
    this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/ServiceTax')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'ServiceTax', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });
    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/IsTagFee')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'Toll Tag Fee', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/
    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/CheckBlockList')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'CheckBlockList', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/
    /*this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/CCServiceTaxInd')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        const tempValue = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
        const tempObj = {'description': 'CCServiceTaxInd', 'amount': tempValue};
        this.amountSummaryDetails.push(tempObj);

      });*/
  };

  paymentFormInitialValues= function () {
    debugger;
    this.payment_Form = new FormGroup({
      creditType: new FormControl('', Validators.required),
      cardNumBox1: new FormControl('', Validators.required),
      cardNumBox2: new FormControl('', Validators.required),
      cardNumBox3: new FormControl('', Validators.required),
      cardNumBox4: new FormControl('', Validators.required),
      nameOnCard: new FormControl('', Validators.compose([Validators.required,  Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-z]+([ \'-][a-zA-Z]+)*')])),
      expiryMonth: new FormControl('', Validators.required),
      expiryYear: new FormControl('', Validators.required),
      existingAddress: new FormControl(''),
      selectedAddress: new FormControl(''),
      existingAddressForCard: new FormControl(''),
      selectedAddressForCard: new FormControl(''),
      tagShipmentRadioType: new FormControl(''),
      tagDeliveryMethod: new FormControl('ShipmentByPost'),
      totalAmount: new FormControl(this.calculatedTotalAmount)
    });
  }
  getDropDownValueBasedOnKey= function(dropdownKey, dropDownArray): string {
    debugger;
    let tempDropDownValue;
    for (let i = 0; i < dropDownArray.length; i++) {
      if (dropDownArray[i].LookUpTypeCodeId == dropdownKey) {
        tempDropDownValue = dropDownArray[i].LookUpTypeCodeDesc;
        break;
      }
    }
    return tempDropDownValue;
  }

  getEncryptedString= function (inputString, saltValueInput, securityType) {
    let encryptedPassword ;
    this.inputEncryptionObject = {
      'plainText': inputString,

      'saltValue': saltValueInput,
      'encryptText': 'null',

      'isEncrypted': 'false',

      'SecurityType': securityType
    };

    const tempInpEncryObj = JSON.stringify(this.inputEncryptionObject);
    console.log('password input object  ' + tempInpEncryObj);
    this.utilityService.encryptedString('PostEncrypt', tempInpEncryObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if (resObj.Result === true) {
        encryptedPassword = resObj.ResultValue;
      }else {
        toastr.error('Password Encryption Failed');
        $('.nav-tabs > .active .badge').text('X');
        $('.nav-tabs > .active .badge').css('color', 'white');
        $('.nav-tabs > .active .badge').css('background-color', 'crimson');
      }

    })
    console.log('before function return ' + encryptedPassword)
    return encryptedPassword;
  }

  isTagRequired= function(isRequested, indexOfPlanArray){
    this.selectedPlanId = this.planArray[indexOfPlanArray].PlanId;
    this.getFeesBasedOnPlanId(this.planArray[indexOfPlanArray].PlanId);
    this.isTagRequested = isRequested;
    if (isRequested == true){
      $('#TagReqDet').show();
      $('#TagDeliveryCarrier').show();
      $('#TagDeliveryMethodDD').show();
      $('#TagShippingAddressDiv').show();
      $('#TagReqDetReview').show();
    }else{
      $('#TagReqDet').hide();
      $('#TagDeliveryCarrier').hide();
      $('#TagDeliveryMethodDD').hide();
      $('#TagShippingAddressDiv').hide();
      $('#TagReqDetReview').hide();

      this.resetAmountSummaryInfovalues();
    }


  }

  getAllPlansWithFees= function() {
//this method is used to get all plans and corresponding fees
    const inputObject = {
      'PlanId' : '4',
      'StartEffDate': this.getCurrentDate()
    }

    debugger;
    console.log('get all plans' + JSON.stringify(inputObject));
    this.utilityService.getAllPlansWithFees(sessionStorage.getItem('CustomerId'), JSON.stringify(inputObject))
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        console.log(resObj.ResultValue);
        this.planArray = resObj.ResultValue;
        this.isTagRequired(true, 0);
      });
  }

  getDefaultAddressForCustomer= function() {
    //this method is used to get Defualt Address for customer
    debugger;
    this.utilityService.getDefaultAddressForCustomer(sessionStorage.getItem('CustomerId'))
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        if (resObj.Result == true) {
          this.existingAddressDetails = resObj.ResultValue;
          this.FullAddress = resObj.ResultValue.FullAddress;
        }


      });
  }

  getFeesBasedOnPlanId= function(planId){
    //this method is used to get Fees applicable for selected plani
    debugger;
    const inputObject = {
      'PlanId' : planId,
      'StartEffDate' : this.getCurrentDate()
    }
    /*this.utilityService.getFeesBasedOnPlanId(sessionStorage.getItem('CustomerId'), inputObject)*/
    this.utilityService.getFeesBasedOnPlanId(sessionStorage.getItem('CustomerId'), inputObject)
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        if (resObj.Result == true) {
          this.getEnrollmentFee = resObj.ResultValue[0].Amount;
          this.getSubTotalAndTotalAmount();
        }


      });
  }

  tagDeliveryMethodSelected = function(){
//if its requested by courrier then Enable Shipping address.
    let tagDeliveryMethod = $('#tagDeliveryMethodId').val();
    if (tagDeliveryMethod == 'ShipmentByPost' ){
      //this.getTagShipmentTypeMethod();
      this.tempShipmentTypeIndex = 0;
      this.calculateTollTagFeeAndTotalTagDeposit();
      $('#TagDeliveryCarrier').show();
      $('#TagShippingAddressDiv').show();
    }else{
      $('#TagDeliveryCarrier').hide();
      $('#TagShippingAddressDiv').hide();
      this.calculatedShippingCharges = 0;
      this.tempShipmentTypeIndex = 0;
      this.calculatedShippingCharges = 0;
      this.getSubTotalAndTotalAmount();
    }
  }

  creditCardExpiryYears= function () {
    //this will creat credit card year array starting from current year to +10 years
    var getCurrentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++){
      this.getCreditCardExpiryYears[i] = getCurrentYear++;
    }
  }

  getAllActiveTagConfiguration = function(){
    this.utilityService.getAllActiveTagConfigurations()
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        console.log("Tag Required Details "+resObj.ResultValue);
        this.TagDetails=resObj.ResultValue;

      });
  }

  getTagDeliveryMethod= function(){
    this.utilityService.getTagDeliveryMethod()
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        console.log("getTagDeliveryMethod "+resObj.ResultValue);
        resObj.ResultValue;

      });


  }
  getStatementCycleType = function(){
    this.utilityService.getStatementCycleType()
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        console.log("Statement Cycle Type Details "+resObj.ResultValue);
        resObj.ResultValue;

      });


  }
  getInvoiceCycleType = function(){
    this.utilityService.getInvoiceCycleType()
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        console.log("Invoice Cycle Type  Details "+resObj.ResultValue);
        resObj.ResultValue;

      });
  }

  getCreditCardServiceTax= function () {

    this.utilityService.getCreditCardServiceTax()
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        this.creditCardServiceTax = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;


      });
  }

  getServiceTaxAppliedOnTagFee= function () {
    this.utilityService.paymentInformationOperationWithoutParameters('GetApplicationParameterValueByParameterKey/ServiceTax')
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        this.serviceTaxAppliedOnTagFee = resObj.GetApplicationParameterValueByParameterKeyResult.ResultValue;
      });
  }

  getTagShipmentTypeMethod=function () {
    this.utilityService.getTagShipmentTypeMethod()
      .subscribe(res => {
        const resObj = JSON.parse(res._body);
        this.tagShipmentTypes = resObj.GetShipmentTypesResult.ResultValue;
      });
  }


  calculateTollTagFeeAndTotalTagDeposit=function () {

    debugger;
    this.calculatedTollTagFee =0;
    this.calculatedTotalTagDeposit = 0;
    this.noOfTagEntered = 0;
    for(let i = 0; i < this.TagDetails.length; i++){
      let tempString = 'noOfTags' + i;
      this.arrayOfTagsEntered[i]=$("#"+tempString+"").val();
      let tempTollVal =  $("#"+tempString+"").val() * this.TagDetails[i].TagFee;
      if(tempTollVal != 0){
        this.calculatedTollTagFee  = parseInt(this.calculatedTollTagFee, 10) + tempTollVal ;
        this.noOfTagEntered = parseInt(this.noOfTagEntered, 10) + parseInt($("#"+tempString+"").val());
      }
      let tempTagDepositVal =  $("#"+tempString+"").val() * this.TagDetails[i].TagDeposit;
      if(tempTagDepositVal != 0){
        this.calculatedTotalTagDeposit  = parseInt(this.calculatedTotalTagDeposit, 10) + tempTagDepositVal ;
      }

    }
    debugger;
    this.calculatedServiceTaxOnTollTagFee = parseInt(this.calculatedTollTagFee, 10) * (this.serviceTaxAppliedOnTagFee / 100);
    this.calculateShippingCharges(this.tagShipmentTypes[this.tempShipmentTypeIndex], this.tempShipmentTypeIndex);
    // this.getSubTotalAndTotalAmount();
  }

  calculateShippingCharges= function (tagShipmentTypeSelected, index) {
    debugger;
    //this.payment_Form.controls['tagShipmentRadioType'].checked = true;
    /*var tempTagShipmentType = 'tagShipmentType' + index;*/
    //this.payment_Form.controls['tagShipmentRadioType'].value = tagShipmentTypeSelected.ServiceTypeName;
    this.tempShipmentTypeIndex = index;
    this.calculatedShippingCharges = this.noOfTagEntered * (tagShipmentTypeSelected.Cost);
    this.getSubTotalAndTotalAmount();
  }

  getSubTotalAndTotalAmount=function () {
    this.calculatedSubTotal = this.calculatedTotalTagDeposit + parseInt(this.getEnrollmentFee, 10) + this.calculatedTollTagFee + 0.0;
    this.calculatedTotalAmount = this.calculatedSubTotal + this.calculatedServiceTaxOnTollTagFee + this.calculatedShippingCharges;
    this.finalAmount = this.calculatedTotalAmount + (this.calculatedTotalAmount * (this.creditCardServiceTax/100));
  }

  resetAmountSummaryInfovalues=function () {

    this.paymentFormInitialValues();
    this.serviceTaxAppliedOnTagFee=0;
    this.calculatedTollTagFee=0;
    this.calculatedTotalTagDeposit=0;
    this.calculatedServiceTaxOnTollTagFee = 0;
    this.calculatedShippingCharges = 0;
    this.noOfTagEntered = 0;
    this.tempShipmentTypeIndex = 0;
    for(let i = 0; i < this.TagDetails.length; i++){
      let tempString = 'noOfTags' + i;
      $("#"+tempString+"").val("");
      this.arrayOfTagsEntered[i]=$("#"+tempString+"").val();

    }
    this.calculateShippingCharges(this.tagShipmentTypes[this.tempShipmentTypeIndex], this.tempShipmentTypeIndex);

  }

  postMakePayment(paymentInputObject){
    return this.utilityService.postMakePayment(paymentInputObject);
  }

  constructPaymentObj= function (paymentDetails) {
    var tempcardNumber=paymentDetails.cardNumBox1+""+paymentDetails.cardNumBox2+""+paymentDetails.cardNumBox3+""+paymentDetails.cardNumBox4;
    this.enteredCreditCard = "xxxxxxxxxxxx"+paymentDetails.cardNumBox4;
    console.log("paymentDetails "+JSON.stringify(paymentDetails));
    var tempInputEncryptionObject = {
      "plainText":tempcardNumber,
      "saltValue":sessionStorage.getItem("CustomerId")+"~"+paymentDetails.expiryMonth+"~AB",
      "encryptText":"null",
      "isEncrypted":"false",
      "SecurityType":"CREDITCARD"
    }

    const tempInpEncryObj = JSON.stringify(tempInputEncryptionObject);
    console.log('password input object ' + tempInpEncryObj);
    this.utilityService.encryptedString('PostEncrypt', tempInpEncryObj).subscribe(res => {
      const resObj = JSON.parse(res._body);
      if (resObj.Result === true) {
        if (this.isTagRequired == true){
          this.tempPaymentObject =
            this.constructPaymentObject.returnPaymentObject(paymentDetails, resObj.ResultValue
              , this.existingAddressDetails, this.TagDetails,
              this.arrayOfTagsEntered, this.selectedPlanId, this.finalAmount);
        }else{
          this.tempPaymentObject =
            this.constructPaymentObject.returnPaymentObjectForVideoToll(paymentDetails, resObj.ResultValue
              , this.existingAddressDetails,
              this.arrayOfTagsEntered, this.selectedPlanId, this.finalAmount);
        }
        $('.my-link').unbind('click', false);
        $('.inner-nav-tabs > .active .badge').text('✔');
        $('.inner-nav-tabs > .active .badge').css('color', 'lightgreen');
        $('.inner-nav-tabs > .active .badge').css('background-color', 'forestgreen');
        $('.my-link').unbind('click', false);
        $('.inner-nav-tabs > .active').next('li').find('a').click(function() {
// 'this' is not a jQuery object, so it will use
// the default click() function
          this.click();
        }).click();
        $('.my-link').bind('click', false);
        console.log("tempPaymentObject "+JSON.stringify(this.tempPaymentObject));

      }else{
        $('.inner-nav-tabs > .active .badge').text('X');
        $('.inner-nav-tabs > .active .badge').css('color', 'white');
        $('.inner-nav-tabs > .active .badge').css('background-color', 'crimson');
        toastr.error("Credit Card Encryption Failed");
      }
    });

  }

  SubmitPayment=function () {
    $('#makePaymentButtonId').prop('disabled', true);

    if (this.finalAmount>0) {

      this.utilityService.postMakePayment(JSON.stringify(this.tempPaymentObject)).subscribe(res => {
        const resObj = JSON.parse(res._body);
        if (resObj.Result === true) {
          $('.my-link').unbind('click', false);
          $('.inner-nav-tabs > .active .badge').text('✔');
          $('.inner-nav-tabs > .active .badge').css('color', 'lightgreen');
          $('.inner-nav-tabs > .active .badge').css('background-color', 'forestgreen');
          $('.my-link').unbind('click', false);
          $('.inner-nav-tabs > .active').next('li').find('a').click(function () {
// 'this' is not a jQuery object, so it will use
// the default click() function
            this.click();
          }).click();
          var tempDate = new Date();
          this.currentDate = tempDate.getDate() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getFullYear() + " " + tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds();
          $('.my-link').bind('click', false);
          this.payementResponseObject = resObj.ResultValue;
          toastr.success("Payment Successful");
        } else {
          $('#makePaymentButtonId').prop('disabled', false);
          $('.inner-nav-tabs > .active .badge').text('X');
          $('.inner-nav-tabs > .active .badge').css('color', 'white');
          $('.inner-nav-tabs > .active .badge').css('background-color', 'crimson');
          toastr.error("Payment UnSuccessful")
        }
      });

    } else {
      this.utilityService.postMakePaymentForZeroPayement(JSON.stringify(this.tempPaymentObject)).subscribe(res => {
        const resObj = JSON.parse(res._body);
        if (resObj.Result === true) {
          $('.my-link').unbind('click', false);
          $('.inner-nav-tabs > .active .badge').text('✔');
          $('.inner-nav-tabs > .active .badge').css('color', 'lightgreen');
          $('.inner-nav-tabs > .active .badge').css('background-color', 'forestgreen');
          $('.my-link').unbind('click', false);
          $('.inner-nav-tabs > .active').next('li').find('a').click(function () {
// 'this' is not a jQuery object, so it will use
// the default click() function
            this.click();
          }).click();
          var tempDate = new Date();
          this.currentDate = tempDate.getDate() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getFullYear() + " " + tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds();
          $('.my-link').bind('click', false);
          //this.payementResponseObject = resObj.ResultValue;
          toastr.success("Payment Successful");
        } else {
          $('.inner-nav-tabs > .active .badge').text('X');
          $('.inner-nav-tabs > .active .badge').css('color', 'white');
          $('.inner-nav-tabs > .active .badge').css('background-color', 'crimson');
          toastr.error("Payment UnSuccessful")
        }
      });
    }
  }


}

