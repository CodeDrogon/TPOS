import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import { UtilityService } from './utility.service';
import {TollPlusHttpService} from './tollplus.http.service';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

/*describe('UtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MockBackend, BaseRequestOptions, UtilityService, TollPlusHttpService, {
        provide: Http,
        useFactory: (
          backend: ConnectionBackend,
          defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        },
        deps:  [MockBackend, BaseRequestOptions]
      }, ]
    });
  });


 length = 0;
  it('Get Countries ', inject([UtilityService, MockBackend], fakeAsync((utilityService, mockBackend) => {
    let country;
    debugger;
    expectURL(mockBackend, 'GetCountries');
    utilityService.getCountries('GetCountries').then(_res => {
      console.log(_res.json());
      country = _res.json();
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

});*/
