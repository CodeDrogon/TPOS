import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {MyDataService} from './my-data.service';
import { LoginComponent } from './login/login.component';
import {LoginService} from './login.service';
import {} from 'ng';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RootComponent } from "./root/root.component";
import { routing } from "./app.routing.module";
import { FileDropModule } from 'ngx-file-drop/lib/ngx-drop';
import { CreateacoountComponent } from './createacoount/createacoount.component';

import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";


@NgModule({
  declarations: [

    AppComponent,


    LoginComponent,
    BreadcrumbComponent,

    RootComponent,

    CreateacoountComponent,
    SigninComponent,
    SignupComponent


  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    FileDropModule,
    ReactiveFormsModule
  ],
  providers: [MyDataService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
