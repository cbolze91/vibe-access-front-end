// src/App.jsx
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import BrowseEvents from "./pages/BrowseEvents";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        {/* Public pages: anyone can browse and view event details. */}
        <Route path="/" element={<BrowseEvents />} />
        <Route path="/events/:eventId" element={<EventDetails />} />

        {/* Private pages: user must sign in first. */}
        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        {/* Auth pages. */}
        <Route
          path="/sign-in"
          element={
            <main className="auth-page">
              <section className="auth-card" aria-label="Sign in form">
                <SignInForm />
              </section>
            </main>
          }
        />

        <Route
          path="/sign-up"
          element={
            <main className="auth-page">
              <section className="auth-card" aria-label="Sign up form">
                <SignUpForm />
              </section>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
