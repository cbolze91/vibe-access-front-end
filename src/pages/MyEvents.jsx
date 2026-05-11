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
    <main className="page-shell my-events-page">
      <h1>My Events</h1>

      {message && <p className="my-events-message">{message}</p>}

      {!rsvps.length ? (
        <p className="my-events-empty">You have not RSVP’d to any events yet.</p>
      ) : (
        <section className="my-events-list">
          {rsvps.map((rsvp) => (
            <article className="my-event-card" key={rsvp._id}>
              {rsvp.event?.imageUrl && (
                <img
                  src={rsvp.event.imageUrl}
                  alt={rsvp.event.title}
                  className="my-event-image"
                />
              )}

              <div className="my-event-content">
                <h2>{rsvp.event?.title}</h2>

                <p>
                  {new Date(rsvp.event?.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  · {rsvp.event?.time}
                </p>

                <p>{rsvp.event?.location}</p>

                <div className="my-event-actions">
                  <Link to={`/events/${rsvp.event?._id}`}>View details</Link>

                  <button
                    type="button"
                    onClick={() => handleCancelRsvp(rsvp._id)}
                  >
                    Cancel RSVP
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default MyEvents;