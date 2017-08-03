import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {LoginService} from './services/login.service';
import {} from 'ng';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RootComponent } from "./root/root.component";
import { routing } from "./app.routing.module";
import { FileDropModule } from 'ngx-file-drop/lib/ngx-drop';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import {CreateaccountService} from "app/services/createaccount/createaccount.service";
import {UtilityService} from "app/services/common/utility.service";
import {TollPlusHttpService} from "app/services/common/tollplus.http.service";

/* Need To Delete after demo */
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
/* End*/

@NgModule({
  declarations: [

    AppComponent,


    LoginComponent,
    BreadcrumbComponent,

    RootComponent,

    CreateaccountComponent,
    SigninComponent,
    SignupComponent


  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    FileDropModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [LoginService,CreateaccountService,UtilityService,TollPlusHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
