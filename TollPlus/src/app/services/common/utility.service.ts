import { Injectable } from '@angular/core';
import {TollPlusHttpService} from "./tollplus.http.service";

@Injectable()
export class UtilityService {

  constructor(public httpService:TollPlusHttpService) { }


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
    console.log(vehicleClassRelativePath);
    return this.httpService.postMethodWithoutParams(vehicleClassRelativePath);
  }

  vehicleColorDropdown= function (vehicleColorRelativePath, inputObject) {
    debugger;
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
}
