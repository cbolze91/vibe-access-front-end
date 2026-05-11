const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/events`;

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

const index = async () => {
  const response = await fetch(BASE_URL);
  return handleResponse(response);
};

const show = async (eventId) => {
  const response = await fetch(`${BASE_URL}/${eventId}`);
  return handleResponse(response);
};

const create = async (eventData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(eventData),
  });

  return handleResponse(response);
};

const update = async (eventId, eventData) => {
  const response = await fetch(`${BASE_URL}/${eventId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(eventData),
  });

  return handleResponse(response);
};

const deleteEvent = async (eventId) => {
  const response = await fetch(`${BASE_URL}/${eventId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

export {
  index,
  show,
  create,
  update,
  deleteEvent,
};