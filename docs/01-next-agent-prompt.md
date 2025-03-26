# Instructions for Next Agent

## Current Project State
- **Phase**: Documentation & Planning → Implementation
- **Progress**: 25% - Documentation is complete, sample data files created, example component drafted
- **Last Agent**: Agent-1: Atlas - Documentation Engineer
- **Date**: 2023-05-25

## Your Objective
Your task is to begin implementing the core components of the Costa Rica Pickleball website based on the documentation. You should focus on creating functional React components that match the design specifications and work with the sample data provided.

## Project Overview
The Costa Rica Pickleball website is being enhanced with three main features:

1. **Featured Clubs Section** - A section showcasing paid featured pickleball clubs in Costa Rica
2. **Pickleball Events Calendar** - A chronological listing of various pickleball events (tournaments, leagues, etc.)
3. **Partner Matching Form** - A form for users to find pickleball partners

## Implementation Priority
1. Featured Clubs Section (Highest Priority)
2. Pickleball Events Calendar (Medium Priority)
3. Partner Matching Form (Lower Priority)

## Key Implementation Details

### Featured Clubs Section
- Implement as a grid-based layout of featured club cards
- Use modal popups for detailed club information rather than separate pages
- Include map integration for club locations
- Add "Want your club to be featured?" call-to-action with a link to the contact form
- Only display clubs with isFeatured=true and valid featuredUntil dates

### Pickleball Events Calendar
- Create a chronological list of events with filtering capabilities
- Support multiple event types (tournaments, leagues, clinics, etc.)
- Use modal popups for detailed event information
- Link events to featured clubs when applicable
- Implement responsive design for mobile and desktop

### Partner Matching Form
- Create a comprehensive form based on the data model
- Integrate with Formspree following the pattern in ContactPage.jsx
- Implement client-side validation
- Create success and error handling screens
- Note: Client will need to create a new Formspree form and provide the form ID

## Technical Guidelines
- Use React functional components with hooks
- Follow the style guide for consistent styling
- Use the sample data files as a starting point
- Ensure responsive design for all components
- Optimize images and assets for performance
- Write clean, documented code

## Documentation to Reference
- `data-models.md` - For data structure details
- `style-guide.md` - For design guidelines
- `implementation-guide.md` - For step-by-step implementation approach
- `maintenance-guide.md` - For long-term considerations

## Starting Points
- `src/data/clubs.js` - Sample club data
- `src/data/events.js` - Sample event data
- `src/components/TournamentList.jsx` - Example component (will need to be updated to EventList)

## Deliverables
1. React components for the Featured Clubs Section
2. React components for the Pickleball Events Calendar
3. React components for the Partner Matching Form
4. Updated contact form to include "Feature My Club" option
5. Documentation of any implementation decisions or challenges

## Known Constraints
- All data is static (no database)
- Form submissions handled via Formspree
- Must maintain mobile-responsive design

## Additional Notes
- The business model for featured clubs involves paid listings ($30-50/month recommended)
- Updates to the contact form are needed to support club feature requests
- Modal-based designs are preferred for detail views to improve user experience

---

Your implementation should balance functionality, design quality, and code maintainability while adhering to the project's documented approach. 