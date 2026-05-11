// src/services/rsvpService.js

const STORAGE_KEY = "vibeaccess_rsvps";

// Gets every saved RSVP from localStorage.
function getAllRsvps() {
  const savedRsvps = localStorage.getItem(STORAGE_KEY);
  return savedRsvps ? JSON.parse(savedRsvps) : [];
}

// Saves the updated RSVP list to localStorage.
function saveAllRsvps(rsvps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvps));
}

// Gets only the RSVPs for the signed-in user.
export function getUserRsvps(username) {
  if (!username) return [];

  return getAllRsvps().filter((rsvp) => rsvp.username === username);
}

// Checks if the signed-in user already RSVP'd to this event.
export function isEventRsvped(eventId, username) {
  if (!username) return false;

  return getAllRsvps().some(
    (rsvp) => String(rsvp.eventId) === String(eventId) && rsvp.username === username
  );
}

// Adds one RSVP and prevents duplicates.
export function createRsvp(event, username) {
  if (!event || !username) return null;

  const allRsvps = getAllRsvps();
  const alreadyExists = isEventRsvped(event.id, username);

  if (alreadyExists) {
    return allRsvps.find(
      (rsvp) => String(rsvp.eventId) === String(event.id) && rsvp.username === username
    );
  }

  const newRsvp = {
    id: `${username}-${event.id}`,
    eventId: event.id,
    username,
    event,
    createdAt: new Date().toISOString(),
  };

  saveAllRsvps([...allRsvps, newRsvp]);
  return newRsvp;
}

// Removes one RSVP for the signed-in user.
export function cancelRsvp(eventId, username) {
  if (!username) return;

  const updatedRsvps = getAllRsvps().filter(
    (rsvp) => !(String(rsvp.eventId) === String(eventId) && rsvp.username === username)
  );

  saveAllRsvps(updatedRsvps);
}
