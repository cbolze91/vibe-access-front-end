// src/context/userContext.js
import { createContext } from "react";

// Changed: context lives alone here to avoid React Fast Refresh errors.
export const UserContext = createContext(null);
