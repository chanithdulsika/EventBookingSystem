package com.example.ticket_booking_system.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {
    private String name;
    private String date;
    private String time;
    private String venue;
    private int ticketCapacity;
    private int availableTicketCount;
    private int TicketPrice;
    private Long vendorId;
}
