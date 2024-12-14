import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vendor} from "../../models/Vendor";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private baseUrl = 'http://localhost:8080/api/vendors';

  constructor(private http: HttpClient) { }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.baseUrl);
  }

  createVendor(vendor: Vendor): Observable<any> {
    return this.http.post<Vendor>(this.baseUrl, vendor);
  }

  updateVendor(vendor: Vendor): Observable<Vendor> { // Corrected method name
    return this.http.put<Vendor>(`${this.baseUrl}/${vendor.id}`, vendor);
  }


  deleteVendor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
