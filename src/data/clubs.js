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
      },
      googleMapsEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.6467214647273!2d-84.6243744!3d9.625655400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa1c70060ee762b%3A0xcd4a6763518825bd!2sPura%20Pickleball!5e0!3m2!1sen!2scr!4v1744039246280!5m2!1sen!2scr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    contactInfo: {
      phone: "+506 6156-4187",
      email: "info@purapickleballcr.com",
      website: "https://purapickleballcr.com",
      instagram: "https://www.instagram.com/purapickleball?igsh=MzRlODBiNWFlZA=="
    },
    courtDetails: {
      indoorCourts: 4,
      outdoorCourts: 0,
      lightingAvailable: true,
      surfaceType: "Hardcourt"
    },
    playInfo: {
      openPlay: true,
      openPlaySchedule: "Daily 7:00am - 9:00pm, Sunday 10:00am - 9:00pm",
      reservationRequired: false,
      courtFees: "$10 per person for open play, $30 per court for private reservation"
    },
    amenities: ["Covered Courts", "Restaurant/Bar", "Pro Shop", "Equipment Rental", "Lessons Available", "Showers"],
    images: ["/clubs/Pura/PuraHero1.jpg", "/clubs/Pura/purapickle1.jpg", "/clubs/Pura/purapickle2.jpg"],
    description: "Jaco's premiere pickleball facility features 4 covered courts with a full-service restaurant and bar. Located in the heart of Jaco Beach, it's the perfect spot for players of all levels to enjoy the game in a tropical setting.",
    listingType: 'featured',
    upcomingEvents: ["Jaco Beach Open 2024", "Weekly Clinic - Jaco"],
    video: "https://www.pbguidecr.com/tours", // Placeholder video from tours page
    laurieReview: "Pura Pickleball is my go-to spot in Jaco! The covered courts are fantastic, especially during rainy season, and the atmosphere is always welcoming. Great food at the restaurant too!"
  },
  {
    id: "jungle-pickleball",
    name: "Jungle Pickleball",
    location: {
      city: "Ojochal",
      province: "Puntarenas",
      address: "Calle Colibri",
      coordinates: {
        lat: 9.0841707,
        lng: -83.6457161
      },
      googleMapsEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.775880265386!2d-83.64571612498045!3d9.084170690979395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa3ffabba8ce26b%3A0x92d34b0dec6fd0fe!2sJungle%20Pickleball!5e0!3m2!1sen!2scr!4v1744817919651!5m2!1sen!2scr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    contactInfo: {
      phone: "+506 8989 3111",
      website: "https://junglepickleball.com/",
      instagram: "https://www.instagram.com/junglepickleball?igsh=MWJxZzFtcW5sYXcwNg=="
    },
    courtDetails: {
      indoorCourts: 4,
      outdoorCourts: 0,
      lightingAvailable: true,
      surfaceType: "Hardcourts"
    },
    playInfo: {
      openPlay: true,
      openPlaySchedule: "11:30am - 1:30pm Daily",
      reservationRequired: true,
      courtFees: "$15 per 90 Minutes/Player"
    },
    amenities: ["Gym", "Showers", "Pro Shop", "Lessons Available"],
    images: ["/clubs/Jungle/JungleHero1.jpg", "/clubs/Jungle/JunglePB1.jpg"],
    description: "Looking for the ultimate pickleball destination in Costa Rica? Jungle Pickleball offers the nicest and most well-maintained courts in the entire country, right here in the heart of Ojochal. Whether you're a seasoned player or new to the game, you'll love our world-class facilities, lush jungle surroundings, and vibrant pickleball community.",
    listingType: 'featured',
    upcomingEvents: [],
    video: {
      vimeoId: "1076138097",
      vimeoEmbed: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1076138097?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Untitled design"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>'
    },
    laurieReview: "Jungle Pickleball offers an incredible indoor playing experience surrounded by lush tropical scenery. The facilities are top-notch with 4 pristine indoor courts that provide perfect protection from the elements."
  },
  // Basic Club Listings Start
  {
    id: "play-pickleball-heredia",
    name: "Playpickleball Heredia",
    listingType: 'basic',
    location: { 
      city: "Heredia", 
      province: "Heredia", 
      coordinates: { lat: 10.0101971, lng: -84.1302582 },
      googleMapsEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.080648691682!2d-84.1302582!3d10.0101971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fb002f988dd7%3A0xeacae5f92687305!2sPickleball%20Heredia!5e0!3m2!1sen!2scr!4v1744817172906!5m2!1sen!2scr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    contactInfo: { 
      phone: "+506 7060-8658 / +506 8386-3681"
    },
    courtDetails: {
      indoorCourts: 0,
      outdoorCourts: 0,
      surfaceType: ""
    }
  }
  // Basic Club Listings End
];