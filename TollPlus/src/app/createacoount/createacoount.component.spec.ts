import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateacoountComponent } from './createacoount.component';

describe('CreateacoountComponent', () => {
  let component: CreateacoountComponent;
  let fixture: ComponentFixture<CreateacoountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateacoountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateacoountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
