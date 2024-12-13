package com.example.ticket_booking_system.repositories;

import com.example.ticket_booking_system.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
}

