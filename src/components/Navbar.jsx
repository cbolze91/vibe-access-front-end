import { Link } from "react-router";

function Navbar() {
  return (
    <header className="navbar">
      {/* Logo area helps users know what app they are using. */}
      <Link to="/" className="navbar__logo">
        VibeAccess
      </Link>

      {/* Main navigation helps users move through the app. */}
      <nav className="navbar__links" aria-label="Main navigation">
        <Link to="/">Browse Events</Link>
        <Link to="/my-events">My Events</Link>
        <Link to="/create">Create Event</Link>
        <Link to="/login">Log In</Link>
      </nav>
    </header>
  );
}

export default Navbar;
