// src/services/authService.js

// Frontend runs on 5173/5174.
// Backend runs on 3000.
const BASE_URL =
  import.meta.env.VITE_BACK_END_SERVER_URL || "http://localhost:3000";

// Safely reads backend responses.
// This prevents "Unexpected end of JSON input" when the backend sends no body.
async function handleResponse(response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data;
}

// Creates a new user account.
export async function signUp(formData) {
  const data = await fetch(`${BASE_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then(handleResponse);

  // Save token if backend sends one.
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

// Logs in an existing user.
export async function signIn(formData) {
  const data = await fetch(`${BASE_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then(handleResponse);

  // Save token so protected frontend actions can use it later.
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

// Logs out the current user locally.
export function signOut() {
  localStorage.removeItem("token");
}

// Gets the saved token for protected requests.
export function getToken() {
  return localStorage.getItem("token");
}

// Keeps older naming styles available in case old components use lowercase names.
export const signup = signUp;
export const signin = signIn;
export const signout = signOut;
