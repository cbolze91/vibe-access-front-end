// src/App.jsx
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import BrowseEvents from "./pages/BrowseEvents";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      {/* Routes decide which page appears for each URL. */}
      <Routes>
        <Route path="/" element={<BrowseEvents />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        {/* Placeholder pages keep the nav working while we build the MVP. */}
        <Route
          path="/my-events"
          element={
            <p className="placeholder-page">My Events page coming soon.</p>
          }
        />
        <Route
          path="/create"
          element={
            <p className="placeholder-page">Create Event page coming soon.</p>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
