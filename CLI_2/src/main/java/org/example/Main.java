package org.example;

import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    private static AtomicInteger totalTickets = new AtomicInteger(0);
    private static double ticketReleaseRate;
    private static double customerRetrievalRate;
    private static int maxTicketCapacity;
    private static Timer releaseTimer = new Timer();
    private static Timer retrievalTimer = new Timer();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Welcome to the Real-Time Ticket Management System!");
        System.out.print("Enter the total number of tickets: ");
        totalTickets.set(Integer.parseInt(scanner.nextLine()));

        System.out.print("Enter the ticket release rate (tickets/second): ");
        ticketReleaseRate = Double.parseDouble(scanner.nextLine());

        System.out.print("Enter the customer retrieval rate (tickets/second): ");
        customerRetrievalRate = Double.parseDouble(scanner.nextLine());

        System.out.print("Enter the maximum ticket capacity: ");
        maxTicketCapacity = Integer.parseInt(scanner.nextLine());

        if (totalTickets.get() > 0 && ticketReleaseRate > 0 && customerRetrievalRate > 0 && maxTicketCapacity > 0) {
            System.out.println("Configuration saved:");
            System.out.println("Total Tickets: " + totalTickets);
            System.out.println("Ticket Release Rate: " + ticketReleaseRate);
            System.out.println("Customer Retrieval Rate: " + customerRetrievalRate);
            System.out.println("Maximum Ticket Capacity: " + maxTicketCapacity);

            // Start the ticket release and retrieval processes
            startTicketRelease();
            startCustomerRetrieval();

            // Run for a specific period (e.g., 30 seconds)
            try {
                Thread.sleep(30000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // Stop the timers and output the final result
            releaseTimer.cancel();
            retrievalTimer.cancel();
            System.out.println("Final Total Tickets: " + totalTickets);
        } else {
            System.out.println("All values must be positive.");
        }
    }

    private static void startTicketRelease() {
        releaseTimer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                int newTickets = (int) ticketReleaseRate;
                if (totalTickets.get() + newTickets <= maxTicketCapacity) {
                    totalTickets.addAndGet(newTickets);
                    System.out.println("Released " + newTickets + " tickets. Total tickets: " + totalTickets);
                } else {
                    System.out.println("Cannot release tickets. Maximum capacity reached.");
                }
            }
        }, 0, (long) (1000 / ticketReleaseRate));
    }

    private static void startCustomerRetrieval() {
        retrievalTimer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                int ticketsToRetrieve = (int) customerRetrievalRate;
                if (totalTickets.get() >= ticketsToRetrieve) {
                    totalTickets.addAndGet(-ticketsToRetrieve);
                    System.out.println("Retrieved " + ticketsToRetrieve + " tickets. Remaining tickets: " + totalTickets);
                } else {
                    System.out.println("Not enough tickets to retrieve.");
                }
            }
        }, 0, (long) (1000 / customerRetrievalRate));
    }
}
