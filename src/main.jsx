// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./context/UserContext.jsx";
import "./index.css";
import App from "./App.jsx";

// main.jsx starts the React app.
// BrowserRouter allows page URLs like /sign-in and /sign-up.
// UserProvider stores the logged-in user across the app.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
