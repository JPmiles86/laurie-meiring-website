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
    images: [
      "/clubs/Pura/purapickle1.jpg",
      "/clubs/Pura/purapickle2.jpg",
      "/clubs/Pura/PuraHero1.jpg",
    ],
    description: "Jaco's premiere pickleball facility features 4 covered courts with a full-service restaurant and bar. Located in the heart of Jaco Beach, it's the perfect spot for players of all levels to enjoy the game in a tropical setting.",
    listingType: 'featured',
    upcomingEvents: ["Jaco Beach Open 2024", "Weekly Clinic - Jaco"],
    video: "https://www.pbguidecr.com/tours", // Placeholder video from tours page
    laurieReview: "Pura Pickleball will always be close to my heart, the local community at this club is amazing, the courts are of an incredibly high quality and I love the lighting and high visibility, there are regular super fun tourneys here and numerous fun events like glow in the dark Pickleball"
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
    images: [
      "/clubs/Jungle/JunglePB1.jpg", 
      "/clubs/Jungle/JungleHero1.jpg",
    ],
    description: "Looking for the ultimate pickleball destination in Costa Rica? Jungle Pickleball offers the nicest and most well-maintained courts in the entire country, right here in the heart of Ojochal. Whether you're a seasoned player or new to the game, you'll love our world-class facilities, lush jungle surroundings, and vibrant pickleball community.",
    listingType: 'featured',
    upcomingEvents: [],
    video: {
      vimeoId: "1076138097",
      vimeoEmbed: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1076138097?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Untitled design"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>'
    },
    laurieReview: "I love how these courts are enclosed, so no interruptions from flying balls and lots of space to hit ATP's. The location of these courts is particularly cool in that you really are in the jungle. There are gym facilities and fun tourneys, I coach and play here regularly"
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
      phone: "+506 7060-8658/+506 8386-3681",
      instagram: "https://www.instagram.com/play_pickleball_heredia/"
    },
    courtDetails: {
      indoorCourts: 0,
      outdoorCourts: 0,
      surfaceType: ""
    }
  },
  {
    id: "maria-moya-pickleball",
    name: "Maria Moya Tennis and Pickleball Academy",
    listingType: 'basic',
    location: { 
      city: "Nosara", 
      province: "Guanacaste", 
      coordinates: { lat: 9.936189874128186, lng: -85.65512932434481 },
      googleMapsEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9731747131373!2d-85.65512932434481!3d9.936189874128186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9e5594d768bb55%3A0xbb5e2c372a227219!2sMaria%20Moya%20Tennis%20Academy%20at%20506%20Tennis%20Center!5e0!3m2!1sen!2scr!4v1745332856874!5m2!1sen!2scr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    contactInfo: { 
      phone: "+506 8797-5335",
      instagram: "https://www.instagram.com/mta_nosara/"
    },
    courtDetails: {
      indoorCourts: 0,
      outdoorCourts: 0,
      surfaceType: ""
    }
  },
  {
    id: "club-coco-bay",
    name: "The Club at Coco Bay",
    listingType: 'basic',
    location: { 
      city: "Playas del Coco", 
      province: "Guanacaste", 
      coordinates: { lat: 10.542717889592229, lng: -85.70703482430042 },
      googleMapsEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.465261070279!2d-85.70703482430042!3d10.542717889592229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9e2974d8da2149%3A0x46e1f28eccf33cd9!2sThe%20Club%20at%20Coco%20Bay!5e0!3m2!1sen!2scr!4v1745525572951!5m2!1sen!2scr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    contactInfo: { 
      phone: "+506 8886-9123",
      website: "www.theclubatcocobay.com"
    },
    courtDetails: {
      indoorCourts: 0,
      outdoorCourts: 0,
      surfaceType: ""
    }
  },
  {
    id: "solis-pcibleball",
    name: "Solis Pickelball",
    listingType: 'basic',
    location: { 
      city: "Quesada, San Carlos", 
      province: "Alajuela", 
      coordinates: { lat: 10.336730967149533, lng: -84.43473912470482 },
      googleMapsEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.064406460446!2d-84.43473912470482!3d10.336730967149533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa065001a9b7803%3A0x3314e0d04859fc99!2sCancha%20de%20pickleball%20Solis%20Pickleball!5e0!3m2!1sen!2scr!4v1745852534852!5m2!1sen!2scr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    contactInfo: { 
      phone: "+506 8780-4855",
      instagram: "https://www.instagram.com/solis_pickleball"
    },
    courtDetails: {
      indoorCourts: 0,
      outdoorCourts: 0,
      surfaceType: ""
    }
  }
  // Basic Club Listings End
];