import { Component, OnInit } from '@angular/core';

import {Vendor} from "../../models/Vendor";
import {VendorService} from "../services/vendor.service";
import {Router} from "@angular/router";
import {EventService} from "../services/event-service/event.service";


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.html',
  styleUrls: ['./vendor.css']
})
export class VendorComponent implements OnInit {
  editedVendor: Vendor  | null = null;
  events: any[] = [];
  public selectedVendor: any;

  constructor(private vendorService: VendorService,
              private eventService:EventService,
              private router:Router) { }

  ngOnInit(): void {
    this.getVendors();
  }

  vendors: Vendor[] = [];
  newVendorName: string = '';
  editId: number | null = null;

  addVendor() {
    if (this.newVendorName.trim()) {
      let data = {
        name: this.newVendorName
      }
      this.vendorService.createVendor(data).subscribe(result=>{
        this.getVendors()
        this.newVendorName = '';
      })
    }
  }

  editVendor(index: number) {
    this.editId = index;
    this.newVendorName = this.vendors[index].name;
  }

  updateVendor() {
    if (this.editId !== null && this.newVendorName.trim()) {
      this.vendors[this.editId].name = this.newVendorName.trim();
      this.editId = null;
      this.newVendorName = '';
    }
  }

  deleteVendor(id: number) {
    console.log(id)
    this.vendorService.deleteVendor(id).subscribe(result=>{
      this.getVendors()
    })
  }

  openEvent(event) {
    this.router.navigate(['/event'],{
      queryParams: { id: event.id }
    })
  }

  getVendors(){
    this.vendorService.getAllVendors().subscribe(result=>{
      console.log(result)
      this.vendors = result
    })
  }

  // loadVendor(): void {
  //   this.vendorService.getAllVendors().subscribe(data => {
  //     this.Vendor = data;
  //   });
  // }
  //
  // addVendor(): void {
  //   this.vendorService.createVendor(this.newVendor).subscribe(data => {
  //     this.Vendor.push(data);
  //     this.newVendor = { id: 0, name: '', date: new Date(), location: '', description: '' }; // Reset form
  //   });
  // }
  //
  // editVendor(Vendor: Vendor): void {
  //   this.editedVendor = { ...Vendor }; // Clone event data
  // }
  //
  // saveVendor(): void {
  //   if (this.editedVendor) {
  //     this.vendorService.updateVendor(this.editedVendor).subscribe(data => {
  //       const index = this.Vendor.findIndex(e => e.id === data.id);
  //       if (index !== -1) {
  //         this.Vendor[index] = data;
  //       }
  //       this.editedVendor = null; // Clear edit form
  //     });
  //   }
  // }
  //
  // cancelEdit(): void {
  //   this.editedVendor = null; // Clear edit form
  // }
  //
  // deleteVendor(id: number): void {
  //   this.vendorService.deleteVendor(id).subscribe(() => {
  //     this.Vendor = this.Vendor.filter(vendor => vendor.id !== id);
  //   });
  // }
  onRowClick(vendor) {
    this.selectedVendor = vendor;
    console.log(this.selectedVendor)
    this.getEvents();
  }

  getEvents(){
    this.eventService.getEvents().subscribe((data) =>{
      console.log(data)
      this.events = data.filter(event => event.vendor.id==this.selectedVendor.id);
    })
  }
}
