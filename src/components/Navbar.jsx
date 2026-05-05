import { Link } from "react-router";
import { Menu } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      {/* Brand mark keeps the app recognizable. */}
      <Link to="/" className="brand">
        <span className="brand-mark">VA</span>
        <span>VibeAccess</span>
      </Link>

      {/* Desktop navigation helps users move through the main pages. */}
      <nav className="navbar__links" aria-label="Main navigation">
        <Link className="active-link" to="/">
          Browse Events
        </Link>
        <Link to="/my-events">My Events</Link>
        <Link to="/create">Create Event</Link>
      </nav>

      {/* Auth actions to welcome the user. */}
      <div className="navbar__actions">
        <Link className="btn btn-light" to="/login">
          Log in
        </Link>
        <Link className="btn btn-primary" to="/signup">
          Sign up
        </Link>
      </div>

      {/* Mobile menu icon keeps the header simple on small screens. */}
      <button className="mobile-menu" type="button" aria-label="Open menu">
        <Menu size={24} />
      </button>
    </header>
  );
}

export default Navbar;
