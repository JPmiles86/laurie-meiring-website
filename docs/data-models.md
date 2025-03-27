# Data Models: Costa Rica Pickleball Website

This document outlines the data structure for the primary components of the Costa Rica Pickleball website. All data will be stored in static JavaScript files as there is no database integration required for this project.

## Pickleball Clubs

### Interface: PickleballClub

The `PickleballClub` interface represents a pickleball club listing on the website. The data will be stored in `src/data/clubs.js`.

```typescript
interface PickleballClub {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    province: string;
    coordinates: {
      latitude: number;
      longitude: number;
    }
  };
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
  };
  courtDetails: {
    indoorCourts: number;
    outdoorCourts: number;
    surfaceType: string;
    lightingAvailable: boolean;
  };
  playInfo: {
    openPlay: boolean;
    openPlaySchedule?: string;
    reservationRequired: boolean;
    reservationInfo?: string;
    courtFees?: string;
    equipmentRental?: string;
  };
  amenities: string[];
  images?: string[];
  description: string;
  isFeatured: boolean;
  featuredUntil: string; // ISO date string
  upcomingEvents?: string[]; // Array of event IDs
}
```

### Data Storage

The clubs data will be exported as an array from `src/data/clubs.js`:

```javascript
export const clubs = [
  {
    id: "club-1",
    name: "Costa Rica Pickleball Club",
    // ... other properties
    isFeatured: true,
    featuredUntil: "2023-12-31T23:59:59Z",
    upcomingEvents: ["event-2", "event-5"]
  },
  // ... more clubs
];
```

### Featured Clubs Presentation

Clubs with `isFeatured = true` and a valid `featuredUntil` date (in the future) will be displayed in the featured clubs section. This allows the website to showcase selected pickleball clubs across Costa Rica.

- **Benefits for Players**: Easy access to information about established pickleball facilities across Costa Rica
- **Implementation**: The contact form includes a simple option for club representatives to inquire about inclusion

## Pickleball Events Calendar

### Interface: PickleballEvent

The `PickleballEvent` interface represents an event in the pickleball events calendar. This includes tournaments, leagues, clinics, and social events. The data will be stored in `src/data/events.js`.

```typescript
interface PickleballEvent {
  id: string;
  name: string;
  eventType: "tournament" | "league" | "clinic" | "social" | "other";
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  registrationDeadline?: string; // ISO date string
  location: {
    name: string;
    address: string;
    city: string;
    province: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
  hostedBy: {
    name: string;
    clubId?: string; // Reference to a club ID if hosted by a featured club
  };
  description: string;
  registrationInfo: {
    url?: string;
    email?: string;
    phone?: string;
    price?: string;
    maxParticipants?: number;
  };
  eventDetails: {
    skillLevels: string[];
    format?: string;
    prizes?: string;
    additionalInfo?: string;
  };
  images?: string[];
}
```

### Data Storage

The events data will be exported as an array from `src/data/events.js`:

```javascript
export const events = [
  {
    id: "event-1",
    name: "Costa Rica Open",
    eventType: "tournament",
    startDate: "2023-06-15T08:00:00Z",
    endDate: "2023-06-17T18:00:00Z",
    // ... other properties
    hostedBy: {
      name: "Costa Rica Pickleball Club",
      clubId: "club-1" // Reference to a featured club
    }
  },
  {
    id: "event-2",
    name: "Beginner's Clinic",
    eventType: "clinic",
    // ... other properties
  },
  // ... more events
];
```

### Events Calendar Presentation

The events calendar is designed to show pickleball activities across Costa Rica, helping players find opportunities to play and compete.

- **Implementation**: 
  - All approved events show on the events calendar page
  - Events are linked to clubs when applicable
  - The events page includes a simple way for event organizers to submit their events
  - Past events are automatically removed to keep the calendar current

### Relationship between Events and Clubs

Events can be linked to clubs using the `clubId` property in the `hostedBy` object. This creates a helpful connection:

1. Players viewing event details can easily find information about the hosting club
2. Players viewing club details can see upcoming events at that location

This integration helps players get a complete picture of pickleball activities at various locations.

## Partner Matching Form

### Interface: PartnerMatchingFormData

The `PartnerMatchingFormData` interface represents the data collected in the partner matching form. This will be sent via email using Formspree.

```typescript
interface PartnerMatchingFormData {
  // Personal Information
  name: string;
  email: string;
  phone?: string;
  
  // Playing Information
  skillLevel: "1.0-2.0" | "2.5-3.0" | "3.5-4.0" | "4.5-5.0" | "5.0+";
  yearsPlaying: "< 1 year" | "1-2 years" | "3-5 years" | "5+ years";
  preferredPosition?: "right" | "left" | "either";
  
  // Availability
  availability: {
    weekdayMornings?: boolean;
    weekdayAfternoons?: boolean;
    weekdayEvenings?: boolean;
    weekendMornings?: boolean;
    weekendAfternoons?: boolean;
    weekendEvenings?: boolean;
  };
  
  // Location Preferences
  preferredLocations: string[]; // List of cities/areas
  travelDistance?: "0-5km" | "5-15km" | "15-30km" | "30km+";
  
  // Partner Preferences
  partnerPreferences: {
    skillLevel?: "same" | "higher" | "lower" | "any";
    ageRange?: string;
    gender?: "male" | "female" | "no preference";
    playStyle?: string;
  };
  
  // Additional Information
  message?: string;
  
  // Formspree Metadata
  _subject: string;
  _replyto: string;
  _template?: string;
  _autoresponse?: string;
}
```

### Form Submission

The partner matching form will use Formspree for form submission, following the same pattern as the existing contact form. This will send an email with the form data to a designated recipient.

- The form will be created on Formspree, and the form ID will be integrated into the website
- Metadata fields (`_subject`, `_replyto`, etc.) will be used to configure email behavior
- Custom email templates can be created on Formspree for professional appearance
- Auto-response emails can be configured to confirm receipt to the submitter

## Data Update Process

As this site uses static data files, updates to club and event information will require direct modifications to the source files. The recommended process is:

1. Edit the relevant data file (`clubs.js` or `events.js`)
2. Test the changes locally
3. Commit the changes to the repository
4. Deploy the updated website

For clients with limited technical knowledge, a simple admin interface could be considered in future phases to simplify this process 