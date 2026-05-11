const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/rsvps`;

const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (data.err) {
    throw new Error(data.err);
  }

  return data;
};

const create = async (eventId) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      event: eventId,
      status: 'going',
    }),
  });

  return handleResponse(response);
};

const index = async () => {
  const response = await fetch(`${BASE_URL}/my-rsvps`, {
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

const deleteRsvp = async (rsvpId) => {
  const response = await fetch(`${BASE_URL}/${rsvpId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

export {
  create,
  index,
  deleteRsvp,
};