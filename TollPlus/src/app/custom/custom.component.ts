import {Component, OnInit, Input, SimpleChange, ElementRef, Directive,HostListener} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'two-text-fields',
  template: `<h4 class="ui horizontal divider header">
    OnChanges
  </h4>
  <div class="ui form">
    <div class="field">
      <h1 [style.background-color]="color">This is header {{formName.controls[fieldOneName]}} </h1>
      <div class="row">
        
        <div class="col-lg-5">
          <div class="row">
            <div class="col-lg-11">
      <div class="form-group" [ngClass]="{'has-error': formName.controls[fieldOneName].invalid  && 
      formName.controls[fieldOneName].touched}">
        <div class="left-inner-addon ">
          <i class="icon-user" *ngIf="formName.controls[fieldOneName].hasError('required') && !formName.controls[fieldOneName].touched">*</i>
      <input  type="{{firstFieldType}}" class="form-control" [formControl]="formName.controls[fieldOneName]"  name="{{fieldOneName}}" #namefld1    (keyup)="setValues(namefld1, namefld2)">  </div>  <div class="field">  <label>Comment</label>
    </div>
    </div>
    </div>

            <div class="col-lg-1">
              <div class="tooltip1" [ngClass]="{'has-error':formName.controls[fieldOneName].invalid &&
               formName.controls[fieldOneName].touched && formName.controls[fieldOneName].hasError('required')}">
                <span class="tooltipbadge">?</span>
                <span class="tooltiptext1" [ngClass]="{'has-error':!formName.controls[fieldOneName].valid && 
                formName.controls[fieldOneName].touched}">{{fieldOneDefautMessage}}</span>

                <div *ngIf="formName.controls[fieldOneName].hasError('required') && formName.controls[fieldOneName].touched && 
                formName.controls[fieldOneName].invalid" class="tooltiptext1">{{fieldOneMmandaotryMessage}}</div>
                <div *ngIf="!formName.controls[fieldOneName].hasError('required') && formName.controls[fieldOneName].touched &&
                 formName.controls[fieldOneName].invalid" class="tooltiptext1">{{fieldOneInvalidMessage}}</div>
              
        </div>
        </div>
        </div>
          
        </div>
        
        <div class="col-lg-5">

          <div class="row">
            <div class="col-lg-11">
              <div class="form-group" [ngClass]="{'has-error': formName.controls[fieldTwoName].invalid  && 
      formName.controls[fieldTwoName].touched}">
                <div class="left-inner-addon ">
                  <i class="icon-user" *ngIf="formName.controls[fieldTwoName].hasError('required') && !formName.controls[fieldTwoName].touched">*</i>
                  <input  type="{{secondFieldType}}" class="form-control" [formControl]="formName.controls[fieldTwoName]"  name="{{fieldTwoName}}" #namefld2    (keyup)="setValues(namefld1, namefld2)">  </div>  <div class="field">  <label>Comment</label>
              </div>
              </div>
            </div>

            <div class="col-lg-1">
              <div class="tooltip1" [ngClass]="{'has-error':formName.controls[fieldTwoName].invalid &&
               formName.controls[fieldTwoName].touched && formName.controls[fieldTwoName].hasError('required')}">
                <span class="tooltipbadge">?</span>
                <span class="tooltiptext1" [ngClass]="{'has-error':!formName.controls[fieldTwoName].valid && 
                formName.controls[fieldTwoName].touched}">{{fieldTwoDefautMessage}}</span>

                <div *ngIf="formName.controls[fieldTwoName].hasError('required') && formName.controls[fieldTwoName].touched && 
                formName.controls[fieldTwoName].invalid" class="tooltiptext1">{{fieldTwoMmandaotryMessage}}</div>
                <div *ngIf="!formName.controls[fieldTwoName].hasError('required') && formName.controls[fieldTwoName].touched &&
                 formName.controls[fieldTwoName].invalid" class="tooltiptext1">{{fieldTwoInvalidMessage}}</div>

              </div>
            </div>
          </div>
          
        </div>
        
      </div>
  </div>
  </div>
  `,
  styleUrls: ['./custom.component.css']
})

export class CustomComponent implements OnInit {


  formgroup: string;
  @Input() fieldOneName: string;
  @Input() fieldTwoName: string;
  @Input() formName: FormGroup;
  @Input() color: string;
  @Input() fieldOneDefautMessage: string;
  @Input() fieldOneMmandaotryMessage: string;
  @Input() fieldOneInvalidMessage: string;
  @Input() fieldTwoDefautMessage: string;
  @Input() fieldTwoMmandaotryMessage: string;
  @Input() fieldTwoInvalidMessage: string;
  @Input() firstFieldType: string;
  @Input() secondFieldType: string;
  constructor(private el: ElementRef) {
  }


  setValues(namefld1, namefld2): void {
    console.log(namefld1.name);
    console.log(namefld2.name);
  }

  custom_Form: FormGroup;


  ngOnInit() {
    debugger;
this.formName.controls[this.fieldOneName];
  }
}
