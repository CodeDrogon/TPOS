import { Injectable } from '@angular/core';
import {TollPlusHttpService} from "./tollplus.http.service";

@Injectable()
export class UtilityService {

  constructor(public httpService:TollPlusHttpService) { }


  readonly servicePath = 'PostGet/?enumModuleType=Customer&enumActivityType=';
  getCountries=function (getCountryRelativePath) {
    return this.httpService.getHttpMethodWithoutParams(getCountryRelativePath);
  }

  getStates=function (getStateRelativePath,countryObject) {
    return this.httpService.postMethodWithParams(getStateRelativePath,countryObject);
  }

  getDropDownValues(realtivePathWithQueryParam){
    return this.httpService.getHttpMethodWithoutParams(realtivePathWithQueryParam);

  }

  saveCustomer(saveCustomerRelativePath,customer){
    return this.httpService.postMethodWithParams(saveCustomerRelativePath,customer);
  }
  valiateUserName(relativePath,inputObject){
    return this.httpService.postMethodWithParams(relativePath,inputObject);
  }


  getHearAboutUs=function (hearAboutUs) {
    return this.httpService.getHttpMethodWithoutParams(hearAboutUs);
  }
  getStatementDelivOption=function (statementDelivOption) {
    return this.httpService.getHttpMethodWithoutParams(statementDelivOption);
  }
  getRevenueCategory=function (revenueCategory) {
    return this.httpService.getHttpMethodWithoutParams(revenueCategory);
  }

  vehicleClassDropdown= function (vehicleClassRelativePath) {
    return this.httpService.postMethodWithoutParams(vehicleClassRelativePath);
  }

  vehicleColorDropdown= function (vehicleColorRelativePath, inputObject) {
    return this.httpService.postMethodWithParams(vehicleColorRelativePath, inputObject);
  }


  vehicleOperation=function (saveVehicleRelativePath,vehicleObj) {
    return this.httpService.postMethodWithParams(saveVehicleRelativePath, vehicleObj);
  }

  additionalInformationOperation(additionalInformationObj,relativePath){
    return this.httpService.postMethodWithParams(additionalInformationObj, relativePath);

  }
  paymentInformationOperationWithoutParameters(relativePath){
    return this.httpService.getHttpMethodWithoutParams(relativePath);
  }

  encryptedString(relativepath, jsonObject ){
    return this.httpService.postMethodWithParams(relativepath, jsonObject);
  }

  getAllActiveTagConfigurations() {
    return this.httpService.getHttpMethodWithoutParams('GetAllActiveTagConfigurations');
  }

  getTollType(){
    return this.httpService.getHttpMethodWithoutParams('GetLookups/?Type=TollType');
  }

  getTagDeliveryMethod(){
    return this.httpService.getHttpMethodWithoutParams('GetLookups/?Type=TransponderPurchasemethod');
  }

  getStatementCycleType(){
    return this.httpService.getHttpMethodWithoutParams('GetStatementCycleType');
  }

  getInvoiceCycleType(){
    return this.httpService.getHttpMethodWithoutParams('GetInvoiceCycleType');
  }

  getAllPlansWithFees(customerId, inputObject){

    return this.httpService.postMethodWithParams('PostGetPlansWithFees/?enumModuleType=Customer&enumActivityType=GetAllPlansWithFees&longCustomerId=' + customerId, inputObject);
  }

  getDefaultAddressForCustomer(customerId){
    return this.httpService.postMethodWithoutParams(this.servicePath + 'GetDefaultAddress&longCustomerId=' + customerId);
  }

  getRequestedTags(customerId){
    return this.httpService.postMethodWithoutParams(this.servicePath + 'GetRequestedTags&longCustomerId=' + customerId);
  }

  getFeesBasedOnPlanId(customerId, inputObject){
    return this.httpService.postMethodWithParams(this.servicePath + 'GetFeesBasedonPlanID&longCustomerId=' + customerId, inputObject);
  }

  isCardInBlockList(inputObject){
    return this.httpService.postMethodWithParams('PostIsExistBlockList/?enumActivityType=BlockList', inputObject);
  }

  isCreditCardAlreadyLinkedToAccount(inputObject){
    return this.httpService.postMethodWithParams('PostIsExistBlockList/?enumActivityType=IsCreditCardExist', inputObject);
  }

  getCreditCardServiceTax(){
    return this.httpService.getHttpMethodWithoutParams('GetApplicationParameterValueByParameterKey/CCServiceTax');
  }

  getTagShipmentTypeMethod(){
    return this.httpService.getHttpMethodWithoutParams('GetShipmentTypes');
  }

  postMakePayment(paymentInputObject){
    return this.httpService.postMethodWithParams('PostMakePayment', paymentInputObject);
  }

  postMakePaymentForZeroPayement (paymentInputObject){
    return this.httpService.postMethodWithParams('PostCreateZeroMakePaymentAccount', paymentInputObject);
  }

  postFileUpload(streamObj:any, inputFile){
    return this.httpService.postMethodForFileUpload('UploadFile?fileName=' + inputFile, streamObj);
  }
}
