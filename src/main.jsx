// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter lets the app understand page routes like /, /sign-in, and /sign-up. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
