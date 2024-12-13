package com.example.ticket_booking_system.Controller;

import com.example.ticket_booking_system.dto.VendorDto;
import com.example.ticket_booking_system.entities.Vendor;
import com.example.ticket_booking_system.services.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {
    @Autowired
    private VendorService vendorService;

    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @PostMapping
    public Vendor createVendor(@RequestBody VendorDto vendor) {
        return vendorService.saveVendor(vendor);
    }

    @PutMapping
    public Vendor editVendor(@RequestBody VendorDto vendor) {
        return vendorService.saveVendor(vendor);
    }

    @DeleteMapping("/{id}")
    public void deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
    }

}

