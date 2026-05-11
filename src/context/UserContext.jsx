import { useState } from "react";
import { UserContext } from "./UserContext";

// Changed: helper reads the user from the JWT token.
// This lets the navbar show: "Hi, username".
function getUserFromToken(token) {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload.user || null;
  } catch (error) {
    console.error("Could not decode token:", error);
    return null;
  }
}

// Changed: we read the saved token BEFORE useState starts.
// This avoids the useEffect red warning completely.
function getInitialUser() {
  const token = localStorage.getItem("token");
  return getUserFromToken(token);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  // Changed: call this after sign in/sign up so the navbar updates immediately.
  function login(token) {
    localStorage.setItem("token", token);

    const loggedInUser = getUserFromToken(token);
    setUser(loggedInUser);
  }

  // Changed: sign out removes the token and resets the navbar.
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
