// src/context/useUser.js
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

// Simple helper so pages can read the signed-in user.
export function useUser() {
  return useContext(UserContext);
}

export default useUser;
