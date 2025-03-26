/**
 * EXAMPLE IMPLEMENTATION FILE
 * Created by Agent-1: Atlas on 2023-05-25
 * 
 * This is an example data structure for pickleball tournaments.
 * It is intended as a reference for implementation and should be
 * considered a draft, not production-ready code.
 */

export const tournaments = [
  {
    id: "jaco-open-2024",
    name: "Jaco Beach Open 2024",
    date: {
      start: "2024-05-15",
      end: "2024-05-17"
    },
    location: {
      venue: "Pura Pickleball Sports Club",
      city: "Jaco",
      province: "Puntarenas",
      address: "Calle Tucan, Jaco",
      coordinates: {
        lat: 9.6256554,
        lng: -84.6243744
      }
    },
    details: {
      format: "Round Robin + Single Elimination",
      divisions: [
        {
          name: "Mixed Doubles",
          levels: ["3.0", "3.5", "4.0+"]
        },
        {
          name: "Men's Doubles",
          levels: ["3.0", "3.5", "4.0+"]
        },
        {
          name: "Women's Doubles",
          levels: ["3.0", "3.5", "4.0+"]
        }
      ],
      schedule: [
        {
          day: "2024-05-15",
          events: ["Mixed Doubles - All Levels"]
        },
        {
          day: "2024-05-16",
          events: ["Men's Doubles - All Levels"]
        },
        {
          day: "2024-05-17",
          events: ["Women's Doubles - All Levels"]
        }
      ],
      fees: {
        perEvent: "$30",
        maxEvents: 2
      },
      prizes: {
        description: "Cash prizes for winners in each division",
        details: "1st Place: $200, 2nd Place: $100 per division"
      }
    },
    registration: {
      deadline: "2024-05-01",
      contact: {
        email: "tournaments@purapickleballcr.com",
        phone: "+506 6156-4187"
      },
      status: "upcoming" // or "closed" or "in-progress"
    },
    description: "Join us for the biggest pickleball tournament in Jaco Beach! Three days of competitive play across all skill levels. Limited spots available.",
    featured: true
  }
]; 