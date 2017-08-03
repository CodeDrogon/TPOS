import { Injectable } from '@angular/core';
import {TollPlusHttpService} from "./tollplus.http.service";

@Injectable()
export class UtilityService {

  constructor(public httpService:TollPlusHttpService) { }


  getCountries=function (getCountryRelativePath) {
    console.log("country service ")
    return this.httpService.getHttpMethodWithoutParams(getCountryRelativePath);
  }

  getStates=function (getStateRelativePath,CountryObject) {
    return this.httpService.postMethodWithParams(getStateRelativePath,CountryObject);
  }

  getDropDownValues(realtivePathWithQueryParam){
    return this.httpService.getHttpMethodWithoutParams(realtivePathWithQueryParam);

  }
}
