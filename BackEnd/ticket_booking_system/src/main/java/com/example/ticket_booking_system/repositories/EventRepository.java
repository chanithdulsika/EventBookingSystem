package com.example.ticket_booking_system.repositories;

import com.example.ticket_booking_system.entities.Customer;
import com.example.ticket_booking_system.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EventRepository extends JpaRepository<Event, Long> {

}
