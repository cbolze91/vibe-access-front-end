// src/components/Navbar/Navbar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Closes the mobile menu after a user clicks a link.
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        {/* Brand/logo links users back to the Browse Events page. */}
        <Link
          to="/"
          className="brand"
          aria-label="VibeAccess home"
          onClick={closeMenu}
        >
          <img
            src="/vibe-access-logo.png"
            alt="VibeAccess"
            className="brand-logo"
          />
        </Link>

        {/* Desktop navigation stays visible on larger screens. */}
        <div className="desktop-nav">
          <NavLink to="/" className="nav-link">
            Browse Events
          </NavLink>
          <NavLink to="/my-events" className="nav-link">
            My Events
          </NavLink>
          <NavLink to="/create" className="nav-link">
            Create Event
          </NavLink>
        </div>

        {/* Desktop auth actions stay on the right side. */}
        <div className="desktop-auth">
          <NavLink to="/sign-in" className="nav-button nav-button-secondary">
            Log in
          </NavLink>
          <NavLink to="/sign-up" className="nav-button nav-button-primary">
            Sign up
          </NavLink>
        </div>

        {/* Mobile menu button appears only on smaller screens. */}
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu opens below the navbar. */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <NavLink to="/" className="mobile-nav-link" onClick={closeMenu}>
            Browse Events
          </NavLink>
          <NavLink
            to="/my-events"
            className="mobile-nav-link"
            onClick={closeMenu}
          >
            My Events
          </NavLink>
          <NavLink to="/create" className="mobile-nav-link" onClick={closeMenu}>
            Create Event
          </NavLink>
          <NavLink
            to="/sign-in"
            className="mobile-nav-link"
            onClick={closeMenu}
          >
            Log in
          </NavLink>
          <NavLink
            to="/sign-up"
            className="mobile-nav-link mobile-nav-link-primary"
            onClick={closeMenu}
          >
            Sign up
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Navbar;
