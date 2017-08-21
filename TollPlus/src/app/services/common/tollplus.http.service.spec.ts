import {TestBed, inject, tick, fakeAsync} from '@angular/core/testing';

import { TollPlusHttpService } from './tollplus.http.service';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
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
          defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
          },
          deps:  [MockBackend, BaseRequestOptions]
        },
      ]
    }).compileComponents();
  });

  it('Get Countries', inject([TollPlusHttpService, MockBackend], fakeAsync((myService, mockBackend) => {
    let country;
    const relativePath = 'GetCountries';
    expectURL(mockBackend, relativePath);
    myService.getHttpMethodWithoutParams(relativePath).subscribe((_res:Response)=> {
      country = _res.json().CountryCode;
      console.log('sdfsdfsdf' + country);
    });
    tick();

    expect(country).toBe('IND');

  })));


  function expectURL(backend: MockBackend, url: string) {
    backend.connections.subscribe(c => {
      // expect(c.request.url).toBe(url);  //  this can be uncommented if we are using absolute url
       const response = new ResponseOptions({body: '{"CountryCode": "IND"}'});
        c.mockRespond(new Response(response));  });
  }

});
