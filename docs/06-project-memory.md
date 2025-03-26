# Project Memory: Costa Rica Pickleball Website

## Project Overview
This document serves as a living record of key decisions, implementation approaches, and progress in the Costa Rica Pickleball website project. It is maintained to ensure continuity of knowledge across different phases of development.

## Project Status
- **Current Phase**: Documentation and Planning
- **Overall Progress**: 25%
- **Last Updated**: 2023-05-25

## Implementation Decisions

### Website Architecture
- **Decision**: The website will be built using React, with a static data approach rather than a dynamic CMS.
- **Rationale**: Simpler implementation, lower maintenance, and sufficient for the project's current scope.
- **Alternatives Considered**: WordPress, Squarespace, or other CMS solutions would require more ongoing maintenance and technical knowledge.
- **Date Made**: 2023-05-20

### Data Management
- **Decision**: All data will be stored in static JSON files rather than a database.
- **Rationale**: Simplifies implementation and deployment, avoids database hosting costs.
- **Alternatives Considered**: Firebase, MongoDB, or other cloud databases would add complexity and cost.
- **Date Made**: 2023-05-22

### Form Submissions
- **Decision**: User forms (contact, partner matching) will use email-based submission via Formspree.
- **Rationale**: Eliminates need for server-side code, leverages existing solution, streamlines implementation.
- **Alternatives Considered**: Custom server endpoints, Firebase functions, or other form handling services.
- **Implementation Pattern**: Forms will follow the approach in the existing ContactPage.jsx, sending data to Formspree.
- **Note**: Client will need to create a new Formspree form for the partner matching feature and provide the form ID.
- **Date Made**: 2023-05-25

### Featured Clubs Business Model
- **Decision**: The clubs directory will only display "featured" clubs that pay for inclusion.
- **Rationale**: Creates a sustainable revenue model for website maintenance while providing value to club owners.
- **Alternatives Considered**: 
  - Free comprehensive directory (no revenue)
  - Tiered listings with premium features (more complex to implement)
  - Advertising-based model (less predictable revenue)
- **Implementation Approach**: 
  - Club listings will be marked as "featured" in the data model
  - Featured status will have an expiration date
  - Contact form will be updated to include "Feature my club" option
- **Pricing Structure**: Recommended monthly fee of $30-50 USD per club based on Costa Rican market
- **Date Made**: 2023-05-25

### Events Calendar Scope
- **Decision**: Broaden the scope from "Tournament Calendar" to "Events Calendar"
- **Rationale**: More inclusive of various pickleball activities (leagues, clinics, social events), providing more value to users
- **Alternatives Considered**: 
  - Separate sections for different event types (increases navigation complexity)
  - Tournament-only focus (limits utility)
- **Implementation Approach**:
  - Single calendar interface with filtering by event type
  - Modal-based detail views rather than separate pages
  - Integration with featured clubs where applicable
- **Date Made**: 2023-05-25

### UI Approach for Detail Views
- **Decision**: Use modal popups for club and event details rather than separate pages
- **Rationale**: Improves user experience by reducing page loads, maintains context, and simplifies implementation
- **Alternatives Considered**: 
  - Separate detail pages (more traditional but requires more navigation)
  - Expandable rows/cards (limited space for content)
- **Implementation Approach**:
  - Responsive modals that work on both desktop and mobile
  - Modals will contain all relevant details, images, and maps
- **Date Made**: 2023-05-25

## Implementation Progress

### Components Implemented
- None yet - in documentation phase

### Data Models Designed
- PickleballClub ✅
- PickleballEvent ✅
- PartnerMatchingForm ✅

### Example Implementation Files
- clubs.js ✅ (example implementation)
- tournaments.js ✅ (needs update to events.js)
- TournamentList.jsx ✅ (example implementation, needs update to EventList)

## Issues and Challenges

### Identified Issues
- Need to update example implementation files to reflect the featured clubs and events model

### Open Questions
- Specific pricing tiers for featured club listings
- Email template design for form submissions
- Final approval on UI design approach

## Next Steps
1. Finalize documentation with the new business model and implementation approach
2. Update example implementation files to reflect new data models
3. Begin implementing components based on the implementation guide 