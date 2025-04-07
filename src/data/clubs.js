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
    images: ["/local courts.jpg", "/tours/PickleballGeneric2.jpg", "/tours/PickleballGeneric3.jpg"],
    description: "Jaco's premiere pickleball facility features 4 covered courts with a full-service restaurant and bar. Located in the heart of Jaco Beach, it's the perfect spot for players of all levels to enjoy the game in a tropical setting.",
    listingType: 'featured',
    upcomingEvents: ["jaco-open-2024", "weekly-clinic-jaco"],
    laurieReview: "Pura Pickleball is my go-to spot in Jaco! The covered courts are fantastic, especially during rainy season, and the atmosphere is always welcoming. Great food at the restaurant too!"
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
    images: ["/blog2pic1.jpeg", "/blog1/blog-1-img3.jpeg", "/tours/PickleballGeneric5.jpg"],
    description: "San Jose's premier indoor pickleball facility featuring 6 professional courts, certified coaching staff, and comprehensive training programs for all skill levels. State-of-the-art facilities in the heart of Costa Rica's capital.",
    listingType: 'featured',
    upcomingEvents: ["sanjose-fall-classic", "intermediate-skills-clinic-sj", "san-jose-social-league"],
    laurieReview: "The CR Pickleball Academy is top-notch. Excellent indoor courts, perfect for focused training. The coaching staff is knowledgeable, and they offer great programs for competitive players."
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
    listingType: 'featured',
    upcomingEvents: ["tamarindo-beach-bash", "sunset-social-play-tamarindo", "advanced-strategy-clinic-tamarindo"],
    laurieReview: "You can't beat the location at Beach Pickleball Tamarindo! Playing right by the ocean is incredible. The courts are well-maintained, and it's a fun, relaxed vibe. Perfect for a vacation game."
  },
  // Basic Club Listings Start
  {
    id: "club-alajuela-1",
    name: "Alajuela City Pickleball",
    listingType: 'basic',
    location: { city: "Alajuela", province: "Alajuela", coordinates: { lat: 10.0163, lng: -84.2117 } },
    contactInfo: { 
      website: "https://example.com/alajuela1",
      phone: "+506 24XX-XXXX"
    }
  },
  {
    id: "club-heredia-1",
    name: "Heredia Central Courts",
    listingType: 'basic',
    location: { city: "Heredia", province: "Heredia", coordinates: { lat: 9.9984, lng: -84.1196 } },
    contactInfo: { 
      phone: "+506 22XX-XXXX",
      email: "info@herediacentral.cr"
    }
  },
  {
    id: "club-cartago-1",
    name: "Cartago Pickleball Spot",
    listingType: 'basic',
    location: { city: "Cartago", province: "Cartago", coordinates: { lat: 9.8645, lng: -83.9200 } },
    contactInfo: { email: "info@cartagopickle.cr" }
  },
  {
    id: "club-puntarenas-1",
    name: "Puntarenas Portside Paddles",
    listingType: 'basic',
    location: { city: "Puntarenas", province: "Puntarenas", coordinates: { lat: 9.9763, lng: -84.8314 } },
    contactInfo: {}
  },
  {
    id: "club-guanacaste-1",
    name: "Liberia Pickleball Group",
    listingType: 'basic',
    location: { city: "Liberia", province: "Guanacaste", coordinates: { lat: 10.6329, lng: -85.4438 } },
    contactInfo: { website: "https://example.com/liberia-pb" }
  },
  {
    id: "club-limon-1",
    name: "Limon Caribbean Courts",
    listingType: 'basic',
    location: { city: "Limon", province: "Limon", coordinates: { lat: 9.9914, lng: -83.0417 } },
    contactInfo: { phone: "+506 70XX-XXXX" }
  },
  {
    id: "club-san-jose-2",
    name: "Escazu Hills Pickleball",
    listingType: 'basic',
    location: { city: "Escazu", province: "San Jose", coordinates: { lat: 9.9208, lng: -84.1431 } },
    contactInfo: { email: "play@escazuhills.com" }
  },
  {
    id: "club-alajuela-2",
    name: "Atenas Valley Racquet Club",
    listingType: 'basic',
    location: { city: "Atenas", province: "Alajuela", coordinates: { lat: 9.9768, lng: -84.3784 } },
    contactInfo: {}
  },
  {
    id: "club-guanacaste-2",
    name: "Nosara Beach Paddlers",
    listingType: 'basic',
    location: { city: "Nosara", province: "Guanacaste", coordinates: { lat: 9.9711, lng: -85.6736 } },
    contactInfo: { website: "https://example.com/nosarapb" }
  },
  {
    id: "club-puntarenas-2",
    name: "Uvita Jungle Courts",
    listingType: 'basic',
    location: { city: "Uvita", province: "Puntarenas", coordinates: { lat: 9.1667, lng: -83.7333 } },
    contactInfo: { instagram: "https://instagram.com/uvitajunglecourts" }
  },
  {
    id: "club-heredia-2",
    name: "Belen Community Pickleball",
    listingType: 'basic',
    location: { city: "Belen", province: "Heredia", coordinates: { lat: 9.9803, lng: -84.1818 } },
    contactInfo: {}
  },
  {
    id: "club-san-jose-3",
    name: "Santa Ana Smashers",
    listingType: 'basic',
    location: { city: "Santa Ana", province: "San Jose", coordinates: { lat: 9.9317, lng: -84.1859 } },
    contactInfo: { phone: "+506 88XX-XXXX" }
  },
  {
    id: "club-cartago-2",
    name: "Orosi Valley Pickleball",
    listingType: 'basic',
    location: { city: "Orosi", province: "Cartago", coordinates: { lat: 9.7963, lng: -83.8534 } },
    contactInfo: { website: "https://example.com/orosi-valley" }
  },
  {
    id: "club-limon-2",
    name: "Puerto Viejo Social Play",
    listingType: 'basic',
    location: { city: "Puerto Viejo", province: "Limon", coordinates: { lat: 9.6553, lng: -82.7544 } },
    contactInfo: {}
  },
  {
    id: "club-puntarenas-3",
    name: "Quepos Marina Pickleball",
    listingType: 'basic',
    location: { city: "Quepos", province: "Puntarenas", coordinates: { lat: 9.4333, lng: -84.1667 } },
    contactInfo: { email: "info@quepospickle.com" }
  }
  // Basic Club Listings End
];