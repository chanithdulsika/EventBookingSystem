package com.example.ticket_booking_system.Controller;

import com.example.ticket_booking_system.entities.Ticket;
import com.example.ticket_booking_system.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

//    @PostMapping("")
//    public Ticket createTicket(@RequestBody TicketDto ticket) {
//        return ticketService.saveTicket(ticket);
//    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }


}
