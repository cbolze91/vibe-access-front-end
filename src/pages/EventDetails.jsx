import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { UserContext } from '../context/UserContext';
import * as eventService from '../services/eventService';
import * as rsvpService from '../services/rsvpService';
import { mockEvents } from "../data/mockEvents";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');

useEffect(() => {
  const fetchEvent = async () => {
    try {
      const mockEvent = mockEvents.find(
        (event) => String(event.id) === eventId
      );

      if (mockEvent) {
        setEvent(mockEvent);
        return;
      }

      const eventData = await eventService.show(eventId);
      setEvent(eventData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  fetchEvent();
}, [eventId]);

  const handleRsvp = async () => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    try {
      await rsvpService.create(eventId);
      navigate('/my-events');
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (message) {
    return (
      <main className="page-shell">
        <p>{message}</p>
        <Link to="/">Back to events</Link>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="page-shell">
        <p>Loading event...</p>
      </main>
    );
  }

  return (
    <main className="page-shell event-details-page">
      <Link to="/">← Back to events</Link>

      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className="event-details-image" />
      )}

      <h1>{event.title}</h1>

      <p>
        {new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        })} · {event.time}
      </p>

      <p>{event.location}</p>
      <p>{event.category}</p>
      <p>{event.description}</p>

      <section>
        <h2>Accessibility Features</h2>
        {event.accessibilityFeatures?.length ? (
          <ul>
            {event.accessibilityFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p>No accessibility features listed.</p>
        )}
      </section>

      {event.rsvpEnabled && (
        <button type="button" onClick={handleRsvp}>
          RSVP
        </button>
      )}
    </main>
  );
};

export default EventDetails;