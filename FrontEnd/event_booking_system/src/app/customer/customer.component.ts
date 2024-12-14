import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer-service/customer.service";
import {of, switchMap} from "rxjs";
import {TicketService} from "../services/ticket.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  customers: { name: string, id:number }[] = [];
  newCustomerName: string = '';
  editIndex: number | null = null;

  constructor(private customerService:CustomerService,
              private ticketsService:TicketService) {  }

  ngOnInit(): void {
    this.getCustomers();
  }

  addCustomer() {
    if (this.newCustomerName.trim()) {
      this.customerService.addCustomer(this.newCustomerName)
      .subscribe(result=>{
        this.getCustomers();
        this.newCustomerName = '';
      })
    }
  }

  editCustomer(index: number) {
    this.editIndex = index;
    this.newCustomerName = this.customers[index].name;
  }

  updateCustomer() {
    if (this.editIndex !== null && this.newCustomerName.trim()) {
      this.customers[this.editIndex].name = this.newCustomerName.trim();
      this.editIndex = null;
      this.newCustomerName = '';
    }
  }

  deleteCustomer(id: number) {
    this.customerService.delete(id).pipe(switchMap(result=>{
      return of(this.getCustomers())
    })).subscribe(result=>{

    })
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(result=>{
      console.log(result)
      this.customers = result
    })
  }


  onRowClick(customer) {
    this.getCustomers()
    // this.ticketsService.getTickets().subscribe(result=>{

    // })
  }
}
