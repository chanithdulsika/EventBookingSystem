package com.example.ticket_booking_system.Controller;

import com.example.ticket_booking_system.dto.EventDto;
import com.example.ticket_booking_system.entities.Event;
import com.example.ticket_booking_system.services.EventService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    // POST endpoint to create an event along with an image
    @PostMapping("")
    public ResponseEntity<String> createEvent(
            @RequestParam("event") String eventData,
            @RequestParam("image") MultipartFile image) throws IOException {

        // Deserialize the JSON event data into EventDTO
        ObjectMapper objectMapper = new ObjectMapper();
        EventDto eventDTO = objectMapper.readValue(eventData, EventDto.class);
        try {
            eventService.createEvent(eventDTO, image);
            return ResponseEntity.ok("Event created successfully with image.");
        } catch (DataAccessException | SQLException e) {
            return ResponseEntity.status(500).body("Error saving event: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> removeEvent(@PathVariable Long id) {
        try {
            eventService.removeEvent(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(false);
        }
    }

    @PostMapping("/purchase")
    public ResponseEntity<Boolean> purchaseTicket(@RequestParam Long eventId,
                                                  @RequestParam Long customerId,
                                                  @RequestParam int quantity) {
        try {
            eventService.purchaseTicket(eventId, customerId, quantity);
            return ResponseEntity.status(HttpStatus.OK).body(true); // Not enough tickets or ticket not found

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false); // Not enough tickets or ticket not found

        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable Long id) {
        try {
            return ResponseEntity.of(eventService.getEvent(id));
        } catch (Exception e) {
            return null;
        }
    }
    @GetMapping
    public List<Event> getAllEvent() {
        List<Event> events = null;
        try {
            events = eventService.getAllEvent();
        } catch (Exception e) {
            return null;
        }
        return events;
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getEventImage(@PathVariable Long id) {
        try {
            byte[] imageBytes = eventService.getEventImage(id);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Change this if the image type differs
                    .body(imageBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving image", e);
        }
    }
}
