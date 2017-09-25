import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
@Injectable()
export class TollPlusHttpService {


  contextRoot="http://192.168.50.41:85/";
  //contextRoot="http://183.82.116.26:85/";
  contextPath="WSCustomerService.svc/";
  url=this.contextRoot+this.contextPath;
  xmlHttp;
  constructor(public http:Http) { }


  getHttpMethodWithoutParams(relativePath){
    console.log("country service ")
    return this.http.get(this.url+relativePath)
  }
  postMethodWithParams(relativePath,inputObject){
    var customHeaders = new Headers({
      'content-type' : 'application/json',
      'Accept': 'application/json'
    });

    var option = new RequestOptions(
      {
        headers: customHeaders
      });
console.log(this.url + relativePath);
console.log('input object ' + inputObject);
    return this.http.post(this.url + relativePath, inputObject,
      {headers: customHeaders});

  }

  postMethodWithoutParams(relativePath) {
    debugger;
    var customHeaders = new Headers({
      'content-type' : 'application/json',
      'Accept': 'application/json'
    });

   /* var option = new RequestOptions(
      {
        headers: customHeaders
      });*/
   console.log(this.url + relativePath);
    return this.http.post(this.url + relativePath , {},
      {headers: customHeaders});

  }
  postMethodForFileUpload(relativePath,inputObject){
    var customHeaders = new Headers({
      'content-type' : 'application/x-www-form-urlencoded'
    });

    var option = new RequestOptions(
      {
        headers: customHeaders
      });
    console.log(this.url + relativePath);
    console.log('input object ' + inputObject);
    return this.http.post(this.url + relativePath, inputObject,
      {headers: customHeaders});

  }
}
