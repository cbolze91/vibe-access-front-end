// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Closes the mobile menu after a user clicks a link.
  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="navbar">
      {/* Brand logo links users back to the Browse Events page. */}
      <Link
        to="/"
        className="brand"
        aria-label="VibeAccess home"
        onClick={closeMenu}
      >
        <img
          src="/vibe-access-logo.png"
          alt="VibeAccess logo"
          className="brand-logo"
        />
      </Link>

      {/* Main desktop navigation. */}
      <nav className="navbar__links" aria-label="Main navigation">
        <Link className="active-link" to="/">
          Browse Events
        </Link>
        <Link to="/my-events">My Events</Link>
        <Link to="/create">Create Event</Link>
      </nav>

      {/* Desktop sign-in and sign-up actions. */}
      <div className="navbar__actions">
        <Link className="btn btn-light" to="/sign-in">
          Log in
        </Link>
        <Link className="btn btn-primary" to="/sign-up">
          Sign up
        </Link>
      </div>

      {/* Mobile menu button. */}
      <button
        className="mobile-menu"
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile dropdown uses the same core links as desktop. */}
      {isMenuOpen && (
        <nav className="mobile-dropdown" aria-label="Mobile navigation">
          <Link className="active-link" to="/" onClick={closeMenu}>
            Browse Events
          </Link>
          <Link to="/my-events" onClick={closeMenu}>
            My Events
          </Link>
          <Link to="/create" onClick={closeMenu}>
            Create Event
          </Link>
          <Link to="/sign-in" onClick={closeMenu}>
            Log in
          </Link>
          <Link
            className="mobile-dropdown__primary"
            to="/sign-up"
            onClick={closeMenu}
          >
            Sign up
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
