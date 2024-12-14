import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Route, Router} from "@angular/router";
import {EventDetail} from "../../models/event";
import {eventDetails} from "../../Data/eventDetails";
import {EventService} from "../services/event-service/event.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  events: EventDetail[] ;
  constructor(private router:Router, private http:HttpClient,
              private eventService:EventService) {}

  openEvent(event) {
    this.router.navigate(['/event'],{
      queryParams: { id: event.id }
    })
  }

  ngOnInit(): void {
    //TODO Logic of retrieving Events from backend
    this.eventService.getEvents().subscribe(result=>{
      console.log(result)//TODO Check the data format of retrieved result.
      this.events = result
    })

  }
}
