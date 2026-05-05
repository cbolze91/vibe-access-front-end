import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import BrowseEvents from "./pages/BrowseEvents";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* App shell keeps the whole website structure consistent. */}
      <div className="app-shell">
        <Navbar />

        {/* Routes decide which page shows for each URL. */}
        <Routes>
          <Route path="/" element={<BrowseEvents />} />
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
          <Route
            path="/login"
            element={
              <p className="placeholder-page">Log In page coming soon.</p>
            }
          />
          <Route
            path="/signup"
            element={
              <p className="placeholder-page">Sign Up page coming soon.</p>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
