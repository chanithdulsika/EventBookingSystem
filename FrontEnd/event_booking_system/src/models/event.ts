export interface EventDetail{
  id?:number,
  name:string,
  availableTicketCount?:number,
  ticketCapacity?:number,
  img?:string
  venue?:string,
  date:string,
  time:string,
  ticketPrice:number,
  vendorId?:number
}
