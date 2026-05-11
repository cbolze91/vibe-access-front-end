// src/context/useUser.js
import { useContext } from "react";
import { UserContext } from "./userContext";

// Changed: custom hook lives in its own file for cleaner imports.
export function useUser() {
  return useContext(UserContext);
}
