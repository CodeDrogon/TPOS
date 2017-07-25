import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import "rxjs/add/operator/filter";
import { routing } from ".././app.routing.module";
import {MyDataService} from './../my-data.service';

@Component({
  selector: "breadcrumb",
  templateUrl:"./breadcrumb.component.html",
  styleUrls: ['./breadcrumb.component.css']

})
export class  BreadcrumbComponent implements OnInit {



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private myDataService:MyDataService,

  ) {

    this.breadcrumb= [];
    console.log("this.breadcrumb.length  "+this.breadcrumb.length);
  }
  breadcrumb=[];

  ngOnInit() {


    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //subscribe to the NavigationEnd event
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {

      //set breadcrumbs
      let root: ActivatedRoute = this.activatedRoute.root;
      this.getBreadcrumbs(root);

    });

  }

  private getBreadcrumbs(route: ActivatedRoute, url: string="") {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children




    //iterate over each children
    for (let child of children) {
      //verify primary route

      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      //append route URL to URL
      url += `/${routeURL}`;
      console.log("breadcrumb ts "+child.snapshot.data[ROUTE_DATA_BREADCRUMB]);


      var data={
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      var addBreadCrum=true;
      for(var i=0;i<this.breadcrumb.length;i++){

        //for remvoing previous breadcrumb and it should not be main breadcrumb
        if(child.snapshot.data[ROUTE_DATA_BREADCRUMB]==this.breadcrumb[i].label&& child.snapshot.data["main"]!="true"){
          console.log("===== "+this.breadcrumb[i].label);
          this.breadcrumb.splice(i+1,1);
          addBreadCrum=false;
        }
      }

      if(child.snapshot.data["main"]=="true"){
        this.breadcrumb=[];
      }
      if(addBreadCrum==true) {
        this.breadcrumb.push(
          data
        );
      }

      return this.getBreadcrumbs(child, url);
    }


  }

}
