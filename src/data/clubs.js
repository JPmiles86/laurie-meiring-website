/**
 * Data file for pickleball clubs.
 * Created by Agent-2 on 2025-03-26
 * Based on example implementation by Agent-1: Atlas on 2023-05-25
 * 
 * This file contains sample data for featured pickleball clubs in Costa Rica.
 */

export const clubs = [
  {
    id: "pura-pickleball",
    name: "Pura Pickleball Sports Club + Kitchen",
    location: {
      city: "Jaco",
      province: "Puntarenas",
      address: "Calle Tucan, Jaco",
      directions: "Street directly across from the Police station on the highway, 100ft on your left",
      coordinates: {
        lat: 9.6256554,
        lng: -84.6243744
      }
    },
    contactInfo: {
      phone: "+506 6156-4187",
      email: "info@purapickleballcr.com",
      website: "https://purapickleballcr.com",
      instagram: "https://www.instagram.com/purapickleball?igsh=MzRlODBiNWFlZA=="
    },
    courtDetails: {
      indoorCourts: 0,
      outdoorCourts: 4,
      lightingAvailable: true,
      surfaceType: "Hardcourt"
    },
    playInfo: {
      openPlay: true,
      openPlaySchedule: "Daily 7:00am - 9:00pm, Sunday 10:00am - 9:00pm",
      reservationRequired: false,
      courtFees: "$10 per person for open play, $30 per court for private reservation"
    },
    amenities: ["Covered Courts", "Restaurant/Bar", "Pro Shop", "Equipment Rental", "Lessons Available", "Air Conditioning in Restaurant"],
    images: ["/home/PickleballTours1.jpg", "/tours/PickleballGeneric2.jpg", "/tours/PickleballGeneric3.jpg"],
    description: "Jaco's premiere pickleball facility features 4 covered courts with a full-service restaurant and bar. Located in the heart of Jaco Beach, it's the perfect spot for players of all levels to enjoy the game in a tropical setting.",
//    isFeatured: true,
//    featuredUntil: "2024-12-31T23:59:59Z",
    upcomingEvents: ["jaco-open-2024", "weekly-clinic-jaco"]
  },
  {
    id: "cr-pickleball-academy",
    name: "Costa Rica Pickleball Academy",
    location: {
      city: "San Jose",
      province: "San Jose",
      address: "Avenida Central, San Jose",
      coordinates: {
        lat: 9.9325,
        lng: -84.0795
      }
    },
    contactInfo: {
      phone: "+506 8765-4321",
      email: "info@crpickleballacademy.com",
      website: "https://example.com/crpickleballacademy"
    },
    courtDetails: {
      indoorCourts: 6,
      outdoorCourts: 0,
      lightingAvailable: true,
      surfaceType: "Sport Court"
    },
    playInfo: {
      openPlay: true,
      openPlaySchedule: "Monday-Friday 6:00am - 10:00pm, Weekend 8:00am - 8:00pm",
      reservationRequired: true,
      reservationInfo: "Reservations required during peak hours (4pm-8pm weekdays)",
      courtFees: "$8 per person for open play, $25 per court for private reservation"
    },
    amenities: ["Indoor Air Conditioned Courts", "Pro Shop", "Equipment Rental", "Certified Coaching", "Locker Rooms", "Fitness Center"],
    images: ["/home/TaraGold.jpg", "/home/JPGold.jpg", "/home/LiamGold.jpg"],
    description: "San Jose's premier indoor pickleball facility featuring 6 professional courts, certified coaching staff, and comprehensive training programs for all skill levels. State-of-the-art facilities in the heart of Costa Rica's capital.",
//    isFeatured: true,
//    featuredUntil: "2024-10-15T23:59:59Z"
  },
  {
    id: "beach-pickleball-cr",
    name: "Beach Pickleball Costa Rica",
    location: {
      city: "Tamarindo",
      province: "Guanacaste",
      address: "Playa Tamarindo, Tamarindo",
      coordinates: {
        lat: 10.2992,
        lng: -85.8371
      }
    },
    contactInfo: {
      phone: "+506 7123-4567",
      email: "play@beachpickleballcr.com",
      instagram: "https://www.instagram.com/beachpickleballcr"
    },
    courtDetails: {
      indoorCourts: 0,
      outdoorCourts: 3,
      lightingAvailable: true,
      surfaceType: "Concrete"
    },
    playInfo: {
      openPlay: true,
      openPlaySchedule: "Morning sessions 7am-11am, Evening sessions 3pm-7pm",
      reservationRequired: false,
      courtFees: "$7 daily drop-in fee"
    },
    amenities: ["Beachfront Location", "Equipment Rental", "Cooling Stations", "Lessons Available", "Refreshments"],
    images: ["/beach surf 3x2.jpg", "/beach (portrait 4x5).jpg", "/beachfront.jpeg"],
    description: "Play pickleball with a view! Our beachfront courts offer a unique playing experience with the sound of waves in the background. Morning and evening sessions to avoid the midday heat, with a vibrant community of local and visiting players.",
//    isFeatured: true,
//    featuredUntil: "2024-09-30T23:59:59Z"
  }
];