import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../context/UserContext';
import * as authService from '../../services/authService';

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        VibeAccess
      </Link>

      <nav className="navbar__links" aria-label="Main navigation">
        <Link to="/">Browse Events</Link>

        {user ? (
          <>
            <Link to="/my-events">My Events</Link>
            <Link to="/create">Create Event</Link>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;