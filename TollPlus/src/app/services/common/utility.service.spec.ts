import { TestBed, inject } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityService]
    });
  });


 length=0;
  /*it('Country Length Should Be 2 ', inject([UtilityService], (utilityService: UtilityService) => {
    this.utilityService.getCountries("GetCountries").subscribe(res=>{
      var resObj=JSON.parse(res._body);
      this.length=resObj.ResultValue.length;
    })
    expect(2).toBe(this.length);
  }));*/
});
