import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {eventDetails} from "../../Data/eventDetails";
import {of, switchMap} from "rxjs";
import {EventService} from "../services/event-service/event.service";
import {EventDetail} from "../../models/event";
import {TicketService} from "../services/ticket.service";
import {CustomerService} from "../services/customer-service/customer.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {
  event: EventDetail =     {name:'star-wars', id:1, ticketPrice:1700, vendorId:1, availableTicketCount:10, date:'2024-12-25', time:'18:00'};

  ticket = {
    customerId: null,
    eventId: null,
    ticketQuantity: 1
  };

  customers = [];
  events = [];

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private eventService: EventService,
              private ticketService: TicketService) {
  }

  // ngOnInit(): void {
    //TODO Logic to retrieve a event from the backend using the eventId



    //TODO Once complete the event retrieve from backend comment this code block
    // this.route.queryParams.subscribe(params => {
    //   const id = params['id'];
    //   console.log(id); // Use the id as needed
    //   this.event = eventDetails.filter(event => event.id == id)[0]
    // });
  // }

  ngOnInit(): void {
    this.route.queryParams.pipe(switchMap((params: any) => {
      const id = params['id'];
      this.ticket.eventId = id;
      console.log(id); // Use the id as needed
      // this.event = eventDetails.filter(event => event.id == id)[0]
      return of(id);
    }), switchMap((eventId) => {
      return this.eventService.getEvent(eventId)
    })).subscribe((event: EventDetail) => {
      this.event = event;
    });

    // Fetch customers and events when the component loads
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });

    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  onSubmit(): void {
    // Submit the form data (only the customerId, eventId, and ticketQuantity)
    const ticketData = {
      customerId: this.ticket.customerId,
      eventId: this.ticket.eventId,
      ticketQuantity: this.ticket.ticketQuantity
    };

    let params:HttpParams = new HttpParams()
      .set('eventId', this.ticket.eventId)
      .set('customerId', this.ticket.customerId)
      .set('quantity', this.ticket.ticketQuantity)

    // Send the ticket order to the backend
    this.eventService.purchaseTicket(params).subscribe(
      (response) => {
        this.eventDetails(this.event.id)
        console.log('Ticket order created successfully:', response);
      },
      (error) => {
        console.error('Error creating ticket order:', error);
      }
    );
  }


  private eventDetails(id: number) {
    this.eventService.getEvent(id).subscribe((result:EventDetail)=>{
      this.event = result
    })
  }
}
