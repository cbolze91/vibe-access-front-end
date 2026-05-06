import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="navbar">
      {/* Logo image keeps the brand close to the hi-fi design. */}
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

      {/* Desktop navigation helps users move between main pages. */}
      <nav className="navbar__links" aria-label="Main navigation">
        <Link className="active-link" to="/">
          Browse Events
        </Link>
        <Link to="/my-events">My Events</Link>
        <Link to="/create">Create Event</Link>
      </nav>

      {/* Desktop auth actions match the hi-fi header. */}
      <div className="navbar__actions">
        <Link className="btn btn-light" to="/login">
          Log in
        </Link>
        <Link className="btn btn-primary" to="/signup">
          Sign up
        </Link>
      </div>

      {/* Mobile hamburger opens and closes the dropdown menu. */}
      <button
        className="mobile-menu"
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile dropdown gives users the same links as desktop. */}
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
          <Link to="/login" onClick={closeMenu}>
            Log in
          </Link>
          <Link
            className="mobile-dropdown__primary"
            to="/signup"
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
