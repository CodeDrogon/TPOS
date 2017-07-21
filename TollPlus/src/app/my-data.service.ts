import { Injectable, } from '@angular/core';
import {Http,Response,RequestOptions,RequestMethod} from '@angular/http';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {  Params} from "@angular/router";
import "rxjs/add/operator/map";

interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}

@Injectable()
export class MyDataService {
  breadcrumbData=[];
  constructor(private http:Http) { }

  public breadcrumbs: IBreadcrumb[];

  setBreadCrumb(breadcrumbs: IBreadcrumb[]){
    this.breadcrumbs=breadcrumbs;
  }
  getBreadCrumb(){
    return this.breadcrumbs;
  }

  fetchFileDataUsingHttp() {
    console.log("calling service ")
    return this.http.get("app/data/data.json");//.map(res => res.json);
  }


  fetchDataFromHttpService(){
    return this.http.get("http://192.168.50.42:8080/getEmployeeList");
  }



  Obj={
    id:"1",
    name:"sagar",
    no:"111"
  }

  sucess(){
    return "success";
  }
  isLogin=false;

  getLogin(){
    return this.isLogin;
  }
  setLogin(isLoginValue:boolean){
    this.isLogin=isLoginValue;
  }


  uploadImage(formData:any) {
    console.log(formData);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Accept', 'application/json');
    //headers.append("files",formData);
    let options = new RequestOptions(headers);
    options.method = RequestMethod.Post;
    return this.http.post("http://192.168.50.41:8080/upload",formData
    );//.map(res => res.json);

  }

  savePersonal(personalInfo:any){
    return this.http.post("http://192.168.50.42:8080/savePersonalDet",personalInfo);
  }


  saveAddress(addressInfo:any){
    return this.http.post("http://192.168.50.42:8080/saveAddress",addressInfo);
  }
}
