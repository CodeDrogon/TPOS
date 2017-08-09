import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationtestComponent } from './paginationtest.component';

describe('PaginationtestComponent', () => {
  let component: PaginationtestComponent;
  let fixture: ComponentFixture<PaginationtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
