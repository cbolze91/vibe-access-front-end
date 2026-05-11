import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import * as rsvpService from '../services/rsvpService';

const MyEvents = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [rsvps, setRsvps] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    const fetchRsvps = async () => {
      try {
        const rsvpData = await rsvpService.index();
        setRsvps(rsvpData);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchRsvps();
  }, [user, navigate]);

  const handleCancelRsvp = async (rsvpId) => {
    try {
      await rsvpService.deleteRsvp(rsvpId);
      setRsvps(rsvps.filter((rsvp) => rsvp._id !== rsvpId));
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="page-shell">
      <h1>My Events</h1>

      {message && <p>{message}</p>}

      {!rsvps.length ? (
        <p>You have not RSVP’d to any events yet.</p>
      ) : (
        <section>
          {rsvps.map((rsvp) => (
            <article key={rsvp._id}>
              <h2>{rsvp.event?.title}</h2>
              <p>
                {rsvp.event?.date?.slice(0, 10)} · {rsvp.event?.time}
              </p>
              <p>{rsvp.event?.location}</p>

              <Link to={`/events/${rsvp.event?._id}`}>View details</Link>

              <button type="button" onClick={() => handleCancelRsvp(rsvp._id)}>
                Cancel RSVP
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default MyEvents;