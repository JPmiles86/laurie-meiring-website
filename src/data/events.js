/**
 * Data file for pickleball events.
 * Created by Agent-2 on 2025-03-26
 * 
 * This file contains sample data for pickleball events including tournaments, leagues, clinics, and social events.
 */

export const events = [
  {
    id: "jaco-open-2024",
    name: "Jaco Beach Open 2024",
    eventType: "tournament",
    startDate: "2025-05-15T09:00:00Z",
    endDate: "2025-05-17T18:00:00Z",
    registrationDeadline: "2024-05-01T23:59:59Z",
    location: {
      name: "Pura Pickleball Sports Club",
      address: "Calle Tucan, Jaco",
      city: "Jaco",
      province: "Puntarenas",
      coordinates: {
        lat: 9.6256554,
        lng: -84.6243744
      }
    },
    hostedBy: {
      name: "Pura Pickleball Sports Club",
      clubId: "pura-pickleball"
    },
    description: "Join us for the biggest pickleball tournament in Jaco Beach! Three days of competitive play across all skill levels. Limited spots available.",
    registrationInfo: {
      url: "https://example.com/jaco-open-registration",
      email: "tournaments@purapickleballcr.com",
      phone: "+506 6156-4187",
      price: "$30 per event",
      maxParticipants: 64
    },
    eventDetails: {
      skillLevels: ["3.0", "3.5", "4.0+"],
      format: "Round Robin + Single Elimination",
      prizes: "Cash prizes for winners in each division: 1st Place: $200, 2nd Place: $100 per division",
      additionalInfo: "Players can participate in up to 2 events. Mixed Doubles on Day 1, Men's Doubles on Day 2, Women's Doubles on Day 3."
    },
    images: ['/winners.jpg']
  },
  {
    id: "weekly-clinic-jaco",
    name: "Beginner's Pickleball Clinic",
    eventType: "clinic",
    startDate: "2025-04-10T10:00:00Z",
    endDate: "2025-04-10T12:00:00Z",
    registrationDeadline: "2024-04-09T20:00:00Z",
    location: {
      name: "Pura Pickleball Sports Club",
      address: "Calle Tucan, Jaco",
      city: "Jaco",
      province: "Puntarenas",
      coordinates: {
        lat: 9.6256554,
        lng: -84.6243744
      }
    },
    hostedBy: {
      name: "Your Pickleball Guide CR",
      clubId: "pura-pickleball"
    },
    description: "Perfect for beginners! Learn the fundamentals of pickleball in this two-hour clinic. Covers basic strokes, scoring, positioning, and strategy essentials. All equipment provided.",
    registrationInfo: {
      email: "laurie@pbguidecr.com",
      phone: "+506 6200 2747",
      price: "$25 per person",
      maxParticipants: 8
    },
    eventDetails: {
      skillLevels: ["Beginner", "1.0-2.0"],
      format: "Instructional Clinic",
      additionalInfo: "Wear comfortable athletic clothing and shoes. Paddles and balls provided. Water available for purchase."
    },
    images: ['/training/PickleballGeneric6.jpg']
  },
  {
    id: "ojochal-social-play",
    name: "Ojochal Weekend Social Play",
    eventType: "social",
    startDate: "2025-04-20T15:00:00Z",
    endDate: "2025-04-20T18:00:00Z",
    location: {
      name: "Ojochal Community Courts",
      address: "Main Street, Ojochal",
      city: "Ojochal",
      province: "Puntarenas"
    },
    hostedBy: {
      name: "Ojochal Pickleball Community"
    },
    description: "Join us for a friendly afternoon of social play in beautiful Ojochal! All skill levels welcome. This is a great opportunity to meet fellow pickleball enthusiasts in the area.",
    registrationInfo: {
      email: "ojochal.pickleball@example.com",
      price: "$5 suggested donation"
    },
    eventDetails: {
      skillLevels: ["All Levels"],
      format: "Round Robin Social Play",
      additionalInfo: "Bring your own paddle and water. Some loaner paddles available for newcomers."
    },
    images: ['/contact/OjochalWaterfall2.jpg']
  },
  {
    id: "costa-rica-summer-league",
    name: "Costa Rica Summer Pickleball League",
    eventType: "league",
    startDate: "2025-06-01T09:00:00Z",
    endDate: "2025-07-31T18:00:00Z",
    registrationDeadline: "2024-05-20T23:59:59Z",
    location: {
      name: "Multiple Locations",
      city: "Multiple Cities",
      province: "Costa Rica"
    },
    hostedBy: {
      name: "Costa Rica Pickleball Association"
    },
    description: "Join our 8-week summer league with weekly matches at venues across Costa Rica. Team-based competition with divisions for all skill levels. Great way to improve your game and meet players throughout the country.",
    registrationInfo: {
      url: "https://example.com/summer-league-registration",
      email: "league@crpickleball.org",
      price: "$75 per player for full season",
      maxParticipants: 120
    },
    eventDetails: {
      skillLevels: ["2.5-3.0", "3.5-4.0", "4.5+"],
      format: "Team-based weekly matches",
      prizes: "Trophies and prizes for division winners",
      additionalInfo: "Teams of 4-6 players. Weekly matches scheduled at various locations. Season concludes with playoff tournament."
    },
    images: ['/winners.jpg']
  }
];