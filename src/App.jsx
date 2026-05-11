import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import BrowseEvents from "./pages/BrowseEvents";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import "./App.css";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        {/* Main event discovery page */}
        <Route path="/" element={<BrowseEvents />} />

        {/* Auth pages use a modal-style card for a cleaner user experience. */}
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

       <Route path="/events/:eventId" element={<EventDetails />} />
       <Route path="/my-events" element={<MyEvents />} />
       <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </div>
  );
}

export default App;
