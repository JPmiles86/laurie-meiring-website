# Maintenance Guide

## Regular Maintenance Tasks

### Daily
- Monitor form submissions
- Check for error logs
- Review analytics data
- Verify all API endpoints

### Weekly
- Update tournament calendar
- Review and update club information
- Check for broken links
- Monitor performance metrics

### Monthly
- Security updates
- Dependency updates
- Backup data
- Review analytics reports

## Adding New Content

### Adding a New Club

1. Open `src/data/clubs.js`
2. Add new club object following this template:
```javascript
{
  id: "unique-club-id",
  name: "Club Name",
  location: {
    city: "City Name",
    province: "Province",
    address: "Full Address",
    coordinates: {
      lat: 0.0000,
      lng: 0.0000
    }
  },
  facilities: {
    indoorCourts: 0,
    outdoorCourts: 4,
    hasLighting: true,
    surfaceType: "Concrete",
    amenities: ["Restrooms", "Water", "Parking"]
  },
  schedule: {
    regularPlay: "Daily schedule",
    openPlay: "Open play times",
    lessons: "Lesson availability"
  },
  skillLevels: ["Beginner", "Intermediate", "Advanced"],
  contact: {
    phone: "+506 XXXX-XXXX",
    email: "contact@example.com",
    website: "https://example.com"
  },
  photos: ["/clubs/club-photo-1.jpg", "/clubs/club-photo-2.jpg"],
  description: "Club description"
}
```

3. Add club photos to `/public/clubs/` directory
4. Test club display in development
5. Deploy changes

### Adding a New Tournament

1. Open `src/data/tournaments.js`
2. Add new tournament object following this template:
```javascript
{
  id: "unique-tournament-id",
  name: "Tournament Name",
  date: {
    start: "2024-01-01",
    end: "2024-01-03"
  },
  location: {
    venue: "Venue Name",
    city: "City Name",
    province: "Province",
    address: "Full Address",
    coordinates: {
      lat: 0.0000,
      lng: 0.0000
    }
  },
  details: {
    format: "Tournament Format",
    divisions: ["3.0", "3.5", "4.0"],
    fees: "Entry Fee",
    prizes: "Prize Information"
  },
  registration: {
    deadline: "2023-12-15",
    link: "https://registration-link.com",
    contact: "contact@example.com"
  },
  description: "Tournament description",
  featured: false,
  image: "/tournaments/tournament-image.jpg"
}
```

3. Add tournament image to `/public/tournaments/` directory
4. Test tournament display in development
5. Deploy changes

### Adding a New Featured Club

1. Open `src/data/clubs.js`
2. Add new club object following this template, making sure to set `isFeatured` to `true` and set the appropriate `featuredUntil` date:
```javascript
{
  id: "unique-club-id",
  name: "Club Name",
  location: {
    city: "City Name",
    province: "Province",
    address: "Full Address",
    coordinates: {
      lat: 0.0000,
      lng: 0.0000
    }
  },
  facilities: {
    indoorCourts: 0,
    outdoorCourts: 4,
    hasLighting: true,
    surfaceType: "Concrete",
    amenities: ["Restrooms", "Water", "Parking"]
  },
  schedule: {
    regularPlay: "Daily schedule",
    openPlay: "Open play times",
    lessons: "Lesson availability"
  },
  skillLevels: ["Beginner", "Intermediate", "Advanced"],
  contact: {
    phone: "+506 XXXX-XXXX",
    email: "contact@example.com",
    website: "https://example.com"
  },
  photos: ["/clubs/club-photo-1.jpg", "/clubs/club-photo-2.jpg"],
  description: "Club description",
  isFeatured: true,
  featuredUntil: "2024-12-31T23:59:59Z" // ISO date format
}
```

3. Add club photos to `/public/clubs/` directory
4. Test club display in development
5. Deploy changes

### Adding a New Event

1. Open `src/data/events.js`
2. Add new event object following this template:
```javascript
{
  id: "unique-event-id",
  name: "Event Name",
  eventType: "tournament", // or "league", "clinic", "social", "other"
  startDate: "2024-01-01T09:00:00Z", // ISO date format
  endDate: "2024-01-03T18:00:00Z", // ISO date format
  location: {
    venue: "Venue Name",
    city: "City Name",
    province: "Province",
    address: "Full Address",
    coordinates: {
      lat: 0.0000,
      lng: 0.0000
    }
  },
  hostedBy: {
    name: "Host Organization Name",
    clubId: "club-id" // Optional: Reference to a featured club if applicable
  },
  details: {
    format: "Event Format",
    divisions: ["3.0", "3.5", "4.0"],
    fees: "Entry Fee",
    prizes: "Prize Information"
  },
  registration: {
    deadline: "2023-12-15T23:59:59Z", // ISO date format
    link: "https://registration-link.com",
    contact: "contact@example.com"
  },
  description: "Event description",
  images: ["/events/event-image.jpg"]
}
```

3. Add event images to `/public/events/` directory
4. Test event display in development
5. Deploy changes

### Removing Expired Content

#### Managing Featured Club Expirations

1. Weekly check of `featuredUntil` dates for all clubs
2. For expired listings, either:
   - Update the `featuredUntil` date if the club has renewed
   - Set `isFeatured` to `false` if the club has not renewed
3. Deploy changes after updates

#### Removing Past Events

1. Weekly check of event dates
2. Remove events where `endDate` has passed
3. Alternatively, you can add an `isArchived: true` property to events you want to keep in the data but not display
4. Deploy changes after updates

## Content Management Schedule

### Weekly Tasks
- Remove past events
- Update featured club status
- Add new events
- Respond to new inquiries about listings

### Monthly Tasks
- Check for upcoming featured club expirations
- Contact clubs about renewals
- Review and update event information
- Optimize any new images

### Quarterly Tasks
- Full audit of all content
- Clean up archived data
- Back up data files
- Review and update business model

## Troubleshooting

### Form Submission Issues
1. Check email service configuration
2. Verify form validation
3. Review error logs
4. Test form in development

### Map Display Issues
1. Verify Google Maps API key
2. Check coordinates
3. Test map loading
4. Review console errors

### Performance Issues
1. Check image sizes
2. Review API response times
3. Monitor server logs
4. Test on multiple devices

## Security

### API Keys
1. Rotate keys monthly
2. Store in environment variables
3. Monitor for unauthorized usage
4. Keep backup copies secure

### Form Security
1. Maintain rate limiting
2. Monitor for spam
3. Update CAPTCHA if needed
4. Review submission logs

## Backup Procedures

### Data Backup
1. Export club data weekly
2. Export tournament data weekly
3. Store backups securely
4. Test restore procedures

### Image Backup
1. Backup all club photos
2. Backup tournament images
3. Maintain organized structure
4. Verify image quality

## Updates

### Dependencies
1. Review package.json monthly
2. Test updates in development
3. Update documentation
4. Deploy updates carefully

### Content Updates
1. Review club information quarterly
2. Update tournament calendar weekly
3. Check all links monthly
4. Update contact information as needed

## Monitoring

### Performance Monitoring
1. Track page load times
2. Monitor API response times
3. Check mobile performance
4. Review error rates

### Usage Analytics
1. Track page views
2. Monitor form submissions
3. Analyze user behavior
4. Generate monthly reports

## Emergency Procedures

### Site Down
1. Check hosting status
2. Review error logs
3. Contact hosting provider
4. Implement backup plan

### Data Issues
1. Stop form submissions
2. Review recent changes
3. Restore from backup
4. Test thoroughly

### Security Breach
1. Disable affected features
2. Change all passwords
3. Review access logs
4. Update security measures 