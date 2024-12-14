import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VendorComponent} from "./Vendor/vendor.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EventComponent} from "./event/event.component";
import {CustomerComponent} from "./customer/customer.component";
import {EventManagementComponent} from "./event-management/event-management.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component:DashboardComponent},
  {path:'vendor', component:VendorComponent},
  {path:'event', component:EventComponent},
  {path:'customer', component:CustomerComponent},
  {path:'event-management', component:EventManagementComponent},
  // {path:'about', component:DashboardComponent},
  // {path:'contact', component:DashboardComponent},
  // { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
