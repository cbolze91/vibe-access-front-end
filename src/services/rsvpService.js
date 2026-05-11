const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL || "http://localhost:3000"}/rsvps`;

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

async function handleResponse(response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.err || data.message || "Request failed");
  }

  return data;
}

export async function getMyRsvps() {
  const response = await fetch(`${BASE_URL}/my-rsvps`, {
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

export async function createRsvp(eventId) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      event: eventId,
      status: "going",
    }),
  });

  return handleResponse(response);
}

export async function cancelRsvp(rsvpId) {
  const response = await fetch(`${BASE_URL}/${rsvpId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}