import {Component, OnInit} from '@angular/core';
import {VendorService} from "../services/vendor.service";
import {EventService} from "../services/event-service/event.service";
import {Router} from "@angular/router";
import {EventDetail} from "../../models/event";

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css'
})
export class EventManagementComponent implements OnInit{
  event = {
    name: '',
    date: '',
    time: '',
    venue: '',
    ticketCapacity: 30,
    availableTicketCount: 10,
    ticketPrice: 1500,
    vendorId: 1
  };

  vendors = [];
  selectedImage: File | null = null;
  events: any[] = [];

  constructor(
    private vendorService: VendorService,
    private eventService: EventService,
    private router:Router
  ) {}

  ngOnInit(): void {
this.getEvents()

    this.vendorService.getAllVendors().subscribe((data) => {
      this.vendors = data;
    });
  }

  getEvents(){
    this.eventService.getEvents().subscribe((data) =>{
      this.events = data;
    })
  }

  openEvent(event) {
    this.router.navigate(['/event'],{
      queryParams: { id: event.id }
    })
  }

  // Handle form submission
  userType: string="Vendor";
  onSubmit(): void {
    if (this.selectedImage && this.event.vendorId) {
      this.eventService.createEvent(this.event, this.selectedImage).subscribe(
        response => {
          console.log('Event created successfully:', response);
        },
        error => {
          console.error('Error creating event:', error);
        }
      );
    }
  }






  onImageSelect(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  deleteEvent(event:EventDetail) {
    this.eventService.deleteEvent(event.id).subscribe(result=>{
this.getEvents();
    })
  }
}
