package com.example.ticket_booking_system.repositories;

import com.example.ticket_booking_system.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
