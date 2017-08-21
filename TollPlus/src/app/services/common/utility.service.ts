import { Injectable } from '@angular/core';
import {TollPlusHttpService} from "./tollplus.http.service";

@Injectable()
export class UtilityService {

  constructor(public httpService:TollPlusHttpService) { }


  getCountries= function (getCountryRelativePath) {
    debugger;
    console.log('country service');
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
}
