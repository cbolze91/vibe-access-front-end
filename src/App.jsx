import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import BrowseEvents from "./pages/BrowseEvents";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar stays visible across the main app pages. */}
      <Navbar />

      {/* Routes control which page appears for each URL. */}
      <Routes>
        <Route path="/" element={<BrowseEvents />} />
        <Route path="/my-events" element={<p>My Events page coming soon.</p>} />
        <Route path="/create" element={<p>Create Event page coming soon.</p>} />
        <Route path="/login" element={<p>Log In page coming soon.</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
