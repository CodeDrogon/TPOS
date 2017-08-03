import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from  './login/login.component';
import { RootComponent } from "./root/root.component";
import {CreateaccountComponent} from "./createaccount/createaccount.component";
import { AppComponent } from './app.component';
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
const routes: Routes = [
  {
    path: "",
    component: RootComponent,
    children: [

      {
        path: 'login',
        component:LoginComponent,
        data: {
          breadcrumb: "Log In Page",
          main:"true"
        }
      },{
        path: "signin",
        component: SigninComponent,
        data: {
          breadcrumb: "Sign In",
          main:"false"
        }
      },
      {
        path: "signup",
        component: SignupComponent,
        data: {
          breadcrumb: "Sign Up",
          main:"false"
        }
      },

      {
        path: 'createaccount',
        component:CreateaccountComponent,
        data: {
          breadcrumb: "CSC > Create Account ",
          main:"true"
        }
      },{ path: '**', redirectTo: '/login', pathMatch: 'full' }
    ],

  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
