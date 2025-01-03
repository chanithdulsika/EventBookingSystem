import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl: string = "http://localhost:8080/api/tickets";

  constructor(private http:HttpClient) { }

  getTickets():Observable<any>{
    return this.http.get(this.baseUrl)
  }
}
