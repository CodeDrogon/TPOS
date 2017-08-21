import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomtestComponent } from './customtest.component';

describe('CustomtestComponent', () => {
  let component: CustomtestComponent;
  let fixture: ComponentFixture<CustomtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
