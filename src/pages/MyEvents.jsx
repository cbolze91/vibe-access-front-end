import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, Trash2, ArrowRight } from "lucide-react";
import { useUser } from "../context/useUser";
import * as rsvpService from "../services/rsvpService";

function MyEvents() {
  const { user } = useUser();
  const [rsvps, setRsvps] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchRsvps() {
      if (!user) return;

      try {
        const rsvpData = await rsvpService.getMyRsvps();
        setRsvps(rsvpData);
      } catch (error) {
        setMessage(error.message);
      }
    }

    fetchRsvps();
  }, [user]);

  if (!user) {
    return (
      <main className="my-events-page">
        <section className="my-events-empty">
          <h1>Sign in to view your events</h1>
          <p>Your RSVP list is private, so please sign in first.</p>
          <Link to="/sign-in" className="my-events-primary-link">
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  async function handleCancelRsvp(rsvpId) {
    try {
      await rsvpService.cancelRsvp(rsvpId);
      setRsvps(rsvps.filter((rsvp) => rsvp._id !== rsvpId));
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="my-events-page">
      <section className="my-events-header">
        <p>My Events</p>
        <h1>Your saved RSVPs</h1>
        <span>
          {rsvps.length} event{rsvps.length === 1 ? "" : "s"}
        </span>
      </section>

      {message && <p>{message}</p>}

      {rsvps.length === 0 ? (
        <section className="my-events-empty">
          <h2>No RSVPs yet</h2>
          <p>Browse accessible events and RSVP to build your list.</p>
          <Link to="/" className="my-events-primary-link">
            Browse events
          </Link>
        </section>
      ) : (
        <section className="my-events-list">
          {rsvps.map((rsvp) => {
            const event = rsvp.event;

            return (
              <article className="my-event-card" key={rsvp._id}>
                {event?.imageUrl && <img src={event.imageUrl} alt={event.title} />}

                <div className="my-event-card-content">
                  <span className="my-event-price">{event?.price || "FREE"}</span>
                  <h2>{event?.title}</h2>

                  <p>
                    <Calendar size={16} />
                    {event?.date
                      ? new Date(event.date).toLocaleDateString()
                      : "Date unavailable"}{" "}
                    · {event?.time}
                  </p>

                  <p>
                    <MapPin size={16} />
                    {event?.location}
                  </p>

                  <div className="my-event-actions">
                    <Link to={`/events/${event?._id}`}>
                      View details
                      <ArrowRight size={16} />
                    </Link>

                    <button type="button" onClick={() => handleCancelRsvp(rsvp._id)}>
                      <Trash2 size={16} />
                      Cancel RSVP
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default MyEvents;