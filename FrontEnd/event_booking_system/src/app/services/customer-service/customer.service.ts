import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl:string="http://localhost:8080/api/customers";

  constructor(private http:HttpClient) { }
  getCustomers():Observable<any>{
    return this.http.get(this.baseUrl)
  }

  delete(id: number):Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id)
  }

  addCustomer(name: string):Observable<any>{
    let data = {
      name:name
    }
    return this.http.post(this.baseUrl,data)
  }
}
