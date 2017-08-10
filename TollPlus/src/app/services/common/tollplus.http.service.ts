import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
@Injectable()
export class TollPlusHttpService {


  contextRoot="http://192.168.50.41:85/";
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
    return this.http.post('http://192.168.50.41:85/WSCustomerService.svc/'+relativePath,inputObject,
      {headers: customHeaders});

/*    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });*/
/*let header = new Headers();

//header.append('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
header.append("Access-Control-Allow-Origin", "*");
    header.append("content-type", "application/json; charset=utf-8");
header.append("dataType","json");

const opts:RequestOptions = new RequestOptions({ headers: header } );
opts.headers = header;
    opts.method="POST";
    //opts.params=inputObject;
    console.log("Test "+JSON.stringify(inputObject));
    //return this.http.post('http://192.168.50.42:8080/testPostMethod',inputObject,opts);
    return  this.http.post( 'http://192.168.50.41:85/WSCustomerService.svc/PostGetStatesByCountryCode',
      JSON.stringify(inputObject),opts);*/

    /*this.xmlHttp = new XMLHttpRequest(); //returns a XMLHttpRequest object
    this.xmlHttp.open('POST', "http://192.168.50.41:85/WSCustomerService.svc/PostGetStatesByCountryCode", true);
    this.xmlHttp.setRequestHeader('Content-Type', "application/json");
    this.xmlHttp.send(JSON.stringify(inputObject));*/


/*alert(0);
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "http://192.168.50.41:85/WSCustomerService.svc/PostGetStatesByCountryCode",
      dataType: "json",
      headers: {
        'Content-Type': 'application/json', /!*or whatever type is relevant *!/
        'Accept': 'application/json' /!* ditto *!/
      },
      data: JSON.stringify ({
        LookUpTypeCode : "TollSchedulePriorities",
        CountryCode : ""
      }),

      success: function (data) {
        console.log("result "+data);
      },
      error: function (result) {
        alert("Error");
      }
    });*/

    /*var data = JSON.stringify({
      "LookUpTypeCode": "TollSchedulePriorities",
      "CountryCode": "IND"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "http://192.168.50.41:85/WSCustomerService.svc/PostGetStatesByCountryCode");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
*/

  }
}
