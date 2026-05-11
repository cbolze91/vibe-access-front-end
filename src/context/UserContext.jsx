import { createContext, useState } from "react";

const UserContext = createContext();

function getUserFromToken(token) {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload.user || null;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

function getInitialUser() {
  const token = localStorage.getItem("token");
  return getUserFromToken(token);
}

function UserProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  function login(token) {
    localStorage.setItem("token", token);
    setUser(getUserFromToken(token));
  }

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

export { UserContext, UserProvider };