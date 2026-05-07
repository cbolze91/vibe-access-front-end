// src/services/eventService.js
// This file will hold event API helper functions.
// In simple terms: pages will use this file to ask the backend for event data.

// We are keeping this as a placeholder until the exact backend event route is created.
// Once the event backend route exists, we can add functions like:
// getEvents()
// getEventById()
// createEvent()
// updateEvent()
// deleteEvent()

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// This helper checks if the backend response worked.
// If something goes wrong, it gives us a clear error message.
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.message || "Something went wrong with the event request.";
    throw new Error(message);
  }

  return response.json();
}

// This helper adds JSON headers so the backend understands our request.
// Later, we can add an auth token here if protected event routes need it.
function getHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

// Get all events from the backend.
// Example use: BrowseEvents page can call this to show all events.
export async function getEvents() {
  const response = await fetch(`${API_BASE_URL}/events`);
  return handleResponse(response);
}

// Get one event by its id.
// Example use: EventDetails page can call this for one selected event.
export async function getEventById(eventId) {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
  return handleResponse(response);
}

// Create a new event.
// Example use: Create Event form can send new event data to the backend.
export async function createEvent(eventData) {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(eventData),
  });

  return handleResponse(response);
}

// Update an existing event.
// Example use: Edit Event form can update the selected event.
export async function updateEvent(eventId, eventData) {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(eventData),
  });

  return handleResponse(response);
}

// Delete an event.
// Example use: Delete button can remove an event from the backend.
export async function deleteEvent(eventId) {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse(response);
}
