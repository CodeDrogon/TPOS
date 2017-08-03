import {TestBed, inject, tick, fakeAsync} from '@angular/core/testing';

import { TollPlusHttpService } from './tollplus.http.service';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import 'rxjs/Rx';
import Any = jasmine.Any;

describe('TollPlusHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [TollPlusHttpService, BaseRequestOptions, MockBackend,
        {
          provide: Http,
          useFactory: (
          backend: ConnectionBackend,
          defaultOptions: BaseRequestOptions)=>{
          return new Http(backend,defaultOptions);
          },
          deps:  [MockBackend, BaseRequestOptions]
        },
      ]
    }).compileComponents();
  });




  it('Http Service check', inject([TollPlusHttpService,MockBackend],fakeAsync((myService,mockBackend)=>{
    let arrayObject:any = {};
    let title;
    let idProof;
    let addressProof;
    let addressProofBusiness;
    let country;
    let business;
    let businessCustomer;
    let iDProofBusiness;
    let suffix;
    /*let contextRoot:string="http://192.168.50.41:85/";
    let contextPath:string="WSCustomerService.svc/";
    let actualUrl:string=this.contextRoot+this.contextPath;*/
    mockBackend.connections.subscribe(c=>{
      //console.log('asdfaf ' + this.actualUrl + 'GetCountries');
      //expect(c.request.url).toBe('http://192.168.50.41:85/WSCustomerService.svc/GetCountries' );
      //expectURL(mockBackend,'GetCountries');
      c.mockRespond(new Response(new ResponseOptions({body: '{"name": "suseel"}'})));
    });
     /* myService.getHttpMethodWithoutParams('GetCountries').subscribe((_res:Response)=>{
        arrayObject = _res.json();
        console.log("sdfsdfsdf  "+arrayObject.name);
      })
      */
    testGetService('GetCountries',myService).subscribe((_res:Response)=>{
      country=_res.json().name;
    })

    testGetService('GetLookups/?Type=idProof',myService).subscribe((_res:Response)=>{
      idProof=_res.json().name;
    });
    testGetService('GetLookups/?Type=addressProof',myService).subscribe((_res:Response)=>{
      addressProof=_res.json().name;
    });

    testGetService('GetLookups/?Type=Business',myService).subscribe((_res:Response)=>{
      business=_res.json().name;
    });
    testGetService('GetLookups/?Type=Business&Customer',myService).subscribe((_res:Response)=>{
      businessCustomer=_res.json().name;
    });
    testGetService('GetLookups/?Type=IDProofBusiness',myService).subscribe((_res:Response)=>{
      iDProofBusiness=_res.json().name;
    });
    testGetService('GetLookups/?Type=IDProofBusiness',myService).subscribe((_res:Response)=>{
      idProof=_res.json().name;
    });
    testGetService('GetLookups/?Type=AddressProofBusiness',myService).subscribe((_res:Response)=>{
      addressProofBusiness=_res.json().name;
    });
    testGetService('GetLookups/?Type=Title',myService).subscribe((_res:Response)=>{
      title=_res.json().name;
    });
    testGetService('GetLookups/?Type=Suffix',myService).subscribe((_res:Response)=>{
      suffix=_res.json().name;
    });
    tick();

    expect(title).toBe('suseel');
    expect(idProof).toBe('suseel');
    expect(business).toBe('suseel');
    expect(addressProof).toBe('suseel');
    expect(businessCustomer).toBe('suseel');
    expect(idProof).toBe('suseel');
    expect(iDProofBusiness).toBe('suseel');
    expect(addressProofBusiness).toBe('suseel');
    expect(suffix).toBe('suseel');
  })));

  //console.log("end");

  function expectURL(backend: MockBackend, url: string) {
    backend.connections.subscribe(c => {
      expect(c.request.url).toBe(url);
       const response = new ResponseOptions({body: '{"name": "felipe"}'});
        c.mockRespond(new Response(response));  });
  }
  function testGetService(relativepath,myservice:TollPlusHttpService):any{
    console.log("path "+relativepath)
    return myservice.getHttpMethodWithoutParams(relativepath);
  }

});
