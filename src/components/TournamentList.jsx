/**
 * EXAMPLE IMPLEMENTATION FILE
 * Created by Agent-1: Atlas on 2023-05-25
 * 
 * This is an example component for displaying pickleball tournaments.
 * It is intended as a reference for implementation and should be
 * considered a draft, not production-ready code.
 */

import React from 'react';
import { format } from 'date-fns';
import { tournaments } from '../data/tournaments';

const TournamentList = () => {
  // Sort tournaments by start date
  const sortedTournaments = [...tournaments].sort((a, b) => 
    new Date(a.date.start) - new Date(b.date.start)
  );

  return (
    <div className="tournament-list">
      {sortedTournaments.map(tournament => (
        <div 
          key={tournament.id} 
          className={`tournament-card ${tournament.featured ? 'featured' : ''}`}
        >
          <div className="tournament-header">
            <h3>{tournament.name}</h3>
            <span className={`status ${tournament.registration.status}`}>
              {tournament.registration.status}
            </span>
          </div>

          <div className="tournament-dates">
            <strong>When:</strong> {format(new Date(tournament.date.start), 'MMM d')}
            {tournament.date.end && ` - ${format(new Date(tournament.date.end), 'MMM d, yyyy')}`}
          </div>

          <div className="tournament-location">
            <strong>Where:</strong> {tournament.location.venue}, {tournament.location.city}
          </div>

          <div className="tournament-divisions">
            <strong>Divisions:</strong>
            <ul>
              {tournament.details.divisions.map(div => (
                <li key={div.name}>
                  {div.name} ({div.levels.join(', ')})
                </li>
              ))}
            </ul>
          </div>

          <div className="tournament-fees">
            <strong>Entry Fee:</strong> {tournament.details.fees.perEvent} per event
            {tournament.details.fees.maxEvents && 
              ` (max ${tournament.details.fees.maxEvents} events)`}
          </div>

          <div className="tournament-registration">
            <strong>Registration Deadline:</strong>{' '}
            {format(new Date(tournament.registration.deadline), 'MMM d, yyyy')}
          </div>

          <div className="tournament-contact">
            <strong>Contact:</strong>{' '}
            <a href={`mailto:${tournament.registration.contact.email}`}>
              {tournament.registration.contact.email}
            </a>
            {' or '}
            <a href={`tel:${tournament.registration.contact.phone}`}>
              {tournament.registration.contact.phone}
            </a>
          </div>

          <p className="tournament-description">{tournament.description}</p>

          {tournament.registration.status === 'upcoming' && (
            <button className="register-button">
              Register Now
            </button>
          )}
        </div>
      ))}

      {sortedTournaments.length === 0 && (
        <p className="no-tournaments">
          No upcoming tournaments scheduled at this time.
        </p>
      )}
    </div>
  );
};

export default TournamentList; 