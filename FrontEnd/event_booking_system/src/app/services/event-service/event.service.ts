import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventDetail} from "../../../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {
  }

  createEvent(eventData: EventDetail, image: File): Observable<any> {
    const formData = new FormData();

    // Append JSON data as a string (eventData)
    formData.append('event', JSON.stringify(eventData));

    // Append the image file
    formData.append('image', image, image.name);

    // Send the request using POST
    return this.http.post(this.baseUrl, formData);
  }
  getEvent(eventId: number) {
    const url = this.baseUrl + '/' + eventId
    return this.http.get(url)
  }

  purchaseTicket(params:HttpParams) {
    const url = this.baseUrl + '/purchase'
    return this.http.post(url, '',{params:params})
  }

  getEvents():Observable<any>{
    const url = this.baseUrl
    return this.http.get(url)
  }

  deleteEvent(id: number) {
    const url = this.baseUrl + '/' + id
    return this.http.delete(url)
  }
}
