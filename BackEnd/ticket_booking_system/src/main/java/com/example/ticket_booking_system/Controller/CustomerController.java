package com.example.ticket_booking_system.Controller;

import com.example.ticket_booking_system.entities.Customer;
import com.example.ticket_booking_system.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerService CService;

    @GetMapping
    public List<Customer> getCustomer() {
        return CService.getAllCustomers();
    }

    @PostMapping
    public Customer CCustomer(@RequestBody Customer customer) {
        return CService.saveCustomer(customer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity DCustomer(@PathVariable Long id) {
        CService.deleteCustomer(id);
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

}

