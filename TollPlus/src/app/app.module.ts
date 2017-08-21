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
import { PaginationtestComponent } from './paginationtest/paginationtest.component';
import {Pagination} from "./pagination";
import {Account} from "./pojo/account";
import {Address} from "./pojo/address";
import {Phone} from "./pojo/phone";
import {Email} from "./pojo/email";
import {KYCDocument} from "./pojo/kycdocument";
import { CustDirective } from './custdir/cust.directive';
import { CustomComponent } from './custom/custom.component';
import { CustomtestComponent } from './customtest/customtest.component';
import {SessionService} from "./services/session-service.service";
/* End*/

@NgModule({
  declarations: [

    AppComponent,


    LoginComponent,
    BreadcrumbComponent,

    RootComponent,

    CreateaccountComponent,
    SigninComponent,
    SignupComponent,
    PaginationtestComponent,
    CustDirective,
    CustomComponent,
    CustomtestComponent



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
  providers: [LoginService,CreateaccountService,UtilityService,
    TollPlusHttpService,Pagination,Account,Address,Phone,Email,KYCDocument,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
