import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { UserContext } from "../../context/UserContext";
import * as authService from "../../services/authService";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = () => {
    authService.signout();
    setUser(null);
    closeMenu();
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
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

        <div className="desktop-auth">
          {user ? (
            <>
              <span className="nav-user">Hi, {user.username}</span>
              <NavLink
                to="/"
                className="nav-button nav-button-secondary"
                onClick={handleSignOut}
              >
                Sign out
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/sign-in" className="nav-button nav-button-secondary">
                Log in
              </NavLink>
              <NavLink to="/sign-up" className="nav-button nav-button-primary">
                Sign up
              </NavLink>
            </>
          )}
        </div>

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

      {isMenuOpen && (
        <div className="mobile-nav">
          <NavLink to="/" className="mobile-nav-link" onClick={closeMenu}>
            Browse Events
          </NavLink>
          <NavLink to="/my-events" className="mobile-nav-link" onClick={closeMenu}>
            My Events
          </NavLink>
          <NavLink to="/create" className="mobile-nav-link" onClick={closeMenu}>
            Create Event
          </NavLink>

          {user ? (
            <NavLink to="/" className="mobile-nav-link" onClick={handleSignOut}>
              Sign out
            </NavLink>
          ) : (
            <>
              <NavLink to="/sign-in" className="mobile-nav-link" onClick={closeMenu}>
                Log in
              </NavLink>
              <NavLink
                to="/sign-up"
                className="mobile-nav-link mobile-nav-link-primary"
                onClick={closeMenu}
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
