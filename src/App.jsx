import { Route, Routes } from "react-router";

import Navbar from "./components/Navbar/Navbar";

import BrowseEvents from "./pages/BrowseEvents";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";

import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<BrowseEvents />} />

        <Route
          path="/events/:eventId"
          element={<EventDetails />}
        />

        {/* Protected Pages */}
        <Route
          path="/my-events"
          element={<MyEvents />}
        />

        <Route
          path="/create"
          element={<CreateEvent />}
        />

        <Route
          path="/events/:eventId/edit"
          element={<EditEvent />}
        />

        {/* Auth Pages */}
        <Route
          path="/sign-in"
          element={
            <main className="auth-page">
              <section
                className="auth-card"
                aria-label="Sign in form"
              >
                <SignInForm />
              </section>
            </main>
          }
        />

        <Route
          path="/sign-up"
          element={
            <main className="auth-page">
              <section
                className="auth-card"
                aria-label="Sign up form"
              >
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