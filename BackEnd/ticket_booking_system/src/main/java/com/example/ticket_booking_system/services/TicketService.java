package com.example.ticket_booking_system.services;

import com.example.ticket_booking_system.dto.TicketDto;
import com.example.ticket_booking_system.entities.Ticket;
import com.example.ticket_booking_system.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket saveTicket(TicketDto ticketDto) {
        Ticket ticket = new Ticket();
        return ticketRepository.save(ticket);
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id).get();
    }


}
