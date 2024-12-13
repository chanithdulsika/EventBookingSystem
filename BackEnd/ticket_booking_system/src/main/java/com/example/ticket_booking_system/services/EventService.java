package com.example.ticket_booking_system.services;

import com.example.ticket_booking_system.dto.EventDto;
import com.example.ticket_booking_system.entities.Customer;
import com.example.ticket_booking_system.entities.Event;
import com.example.ticket_booking_system.entities.Ticket;
import com.example.ticket_booking_system.entities.Vendor;
import com.example.ticket_booking_system.repositories.CustomerRepository;
import com.example.ticket_booking_system.repositories.EventRepository;
import com.example.ticket_booking_system.repositories.TicketRepository;
import com.example.ticket_booking_system.repositories.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ProblemDetail;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private TicketRepository ticketRepository;


    public void createEvent(EventDto eventDTO, MultipartFile image) throws IOException, SQLException {
        // Create Event entity and set values from EventDTO
        Vendor vendor = vendorRepository.findById(eventDTO.getVendorId()).get();
        Event event = Event.builder()
                .name(eventDTO.getName())
                .vendor(vendor)
                .date(eventDTO.getDate())
                .time(eventDTO.getTime())
                .venue(eventDTO.getVenue())
                .availableTicketCount(eventDTO.getAvailableTicketCount())
                .ticketCapacity(eventDTO.getTicketCapacity())
                .ticketPrice(eventDTO.getTicketPrice())
                .build();

        // Convert the image to a Blob and set it in the Event entity
        if (image != null && !image.isEmpty()) {
            Blob imageBlob = new SerialBlob(image.getBytes());
            event.setImage(imageBlob);
        }

        // Save the Event entity to the database
        eventRepository.save(event);
    }

    public void removeEvent(Long eventId) throws Exception {
        eventRepository.deleteById(eventId);
    }

    public void purchaseTicket(Long eventId, Long customerId, int quantity) throws Exception {
        Event event = eventRepository.findById(eventId)
                .get();
        int availableQuantity = event.getAvailableTicketCount();

        int remain = availableQuantity - quantity;
        if (remain < 0) {
            throw new Exception();
        }
        event.setAvailableTicketCount(remain);
        eventRepository.save(event);

        Customer customer = customerRepository.findById(customerId).get();

        Ticket ticket = Ticket.builder().
                customer(customer)
                .event(event)
                .build();
        ticketRepository.save(ticket);

    }

    public Optional<Event> getEvent(Long id) {
        return eventRepository.findById(id);
    }

    @GetMapping("/{id}/image")
    public byte[] getEventImage(Long id) throws RuntimeException {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        try {
            Blob imageBlob = event.getImage();
            return imageBlob.getBytes(1, (int) imageBlob.length());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving image", e);
        }
    }

    public List<Event> getAllEvent() {
        return eventRepository.findAll();
    }
}
