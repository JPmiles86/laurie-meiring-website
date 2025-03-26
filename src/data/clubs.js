/**
 * EXAMPLE IMPLEMENTATION FILE
 * Created by Agent-1: Atlas on 2023-05-25
 * 
 * This is an example data structure for pickleball clubs.
 * It is intended as a reference for implementation and should be
 * considered a draft, not production-ready code.
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
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31469.17377171782!2d-84.6243744!3d9.6256554!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa1c70060ee762b%3A0xcd4a6763518825bd!2sPura%20Pickleball!5e0!3m2!1sen!2sus!4v1743000830321!5m2!1sen!2sus"
    },
    facilities: {
      indoorCourts: 0,
      outdoorCourts: 4,
      hasLighting: true,
      surfaceType: "Hardcourt",
      courtType: "Dedicated Pickleball",
      amenities: ["Covered Courts", "Kitchen/Restaurant"]
    },
    schedule: {
      regularHours: {
        monday: "7:00am - 9:00pm",
        tuesday: "7:00am - 9:00pm",
        wednesday: "7:00am - 9:00pm",
        thursday: "7:00am - 9:00pm",
        friday: "7:00am - 9:00pm",
        saturday: "7:00am - 9:00pm",
        sunday: "10:00am - 9:00pm"
      }
    },
    contact: {
      phone: "+506 6156-4187",
      email: ["info@purapickleballcr.com", "rick@purapickleballcr.com"],
      website: "purapickleballcr.com",
      social: {
        instagram: "https://www.instagram.com/purapickleball?igsh=MzRlODBiNWFlZA=="
      }
    },
    description: "Jaco's Premiere Pickelball Courts. With 4 covered courts, we offer a variety of pickleball options for all skill levels."
  }
]; 