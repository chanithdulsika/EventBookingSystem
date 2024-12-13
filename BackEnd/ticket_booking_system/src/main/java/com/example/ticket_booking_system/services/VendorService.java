package com.example.ticket_booking_system.services;

import com.example.ticket_booking_system.dto.VendorDto;
import com.example.ticket_booking_system.entities.Vendor;
import com.example.ticket_booking_system.repositories.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorService {
    @Autowired
    private VendorRepository vendorRepository;

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public Vendor saveVendor(VendorDto vendorDto) {
        Vendor vendor = Vendor.builder()
                .name(vendorDto.getName())
                .build();
        vendorRepository.save(vendor);
        return vendor;
    }

    public void deleteVendor(Long id) {
        vendorRepository.deleteById(id);
    }


}

