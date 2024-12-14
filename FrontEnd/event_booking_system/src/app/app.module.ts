import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {VendorComponent} from "./Vendor/vendor.component";
import {TopNavComponent} from "./top-nav/top-nav.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EventComponent} from "./event/event.component";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import { CustomerComponent } from './customer/customer.component';
import {EventManagementComponent} from "./event-management/event-management.component";

@NgModule({
  declarations: [
    AppComponent,
    VendorComponent,
    TopNavComponent,
    DashboardComponent,
    EventComponent,
    CustomerComponent,
    EventManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
