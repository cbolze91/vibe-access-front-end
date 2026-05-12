// src/services/createdEventService.js

// Browser storage key for demo-created events.
const CREATED_EVENTS_KEY = "vibeaccess_created_events";

// Reads created events from the browser.
export function getCreatedEvents() {
  const savedEvents = localStorage.getItem(CREATED_EVENTS_KEY);

  if (!savedEvents) return [];

  try {
    return JSON.parse(savedEvents);
  } catch (error) {
    console.error("Could not read created events:", error);
    return [];
  }
}

// Saves a new event from the Create Event form.
export function saveCreatedEvent(event) {
  const currentEvents = getCreatedEvents();

  const newEvent = {
    ...event,
    id: event.id || `created-${Date.now()}`,
  };

  const updatedEvents = [newEvent, ...currentEvents];
  localStorage.setItem(CREATED_EVENTS_KEY, JSON.stringify(updatedEvents));

  return newEvent;
}

// Removes a created event if we need delete functionality later.
export function deleteCreatedEvent(eventId) {
  const currentEvents = getCreatedEvents();

  const updatedEvents = currentEvents.filter(
    (event) => String(event.id) !== String(eventId)
  );

  localStorage.setItem(CREATED_EVENTS_KEY, JSON.stringify(updatedEvents));

  return updatedEvents;
}
