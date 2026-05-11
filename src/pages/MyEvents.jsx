// src/pages/MyEvents.jsx
import { Link } from "react-router";
import { Calendar, MapPin, Trash2, ArrowRight } from "lucide-react";
import { useUser } from "../context/useUser";
import { getUserRsvps, cancelRsvp } from "../services/rsvpService";

function MyEvents() {
  const { user } = useUser();

  // Only signed-in users can view their RSVP list.
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

  const rsvps = getUserRsvps(user.username);

  const handleCancelRsvp = (eventId) => {
    cancelRsvp(eventId, user.username);
    window.location.reload();
  };

  return (
    <main className="my-events-page">
      <section className="my-events-header">
        <p>My Events</p>
        <h1>Your saved RSVPs</h1>
        <span>{rsvps.length} event{rsvps.length === 1 ? "" : "s"}</span>
      </section>

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
            const image = event.image || event.imageUrl || event.img || event.photo || "";
            const price = String(event.price || "FREE").startsWith("$")
              ? event.price
              : event.price === 0 || String(event.price).toLowerCase() === "free"
              ? "FREE"
              : `$${event.price}`;

            return (
              <article className="my-event-card" key={rsvp.id}>
                {image && <img src={image} alt={event.title} />}

                <div className="my-event-card-content">
                  <span className="my-event-price">{price}</span>
                  <h2>{event.title}</h2>

                  <p>
                    <Calendar size={16} />
                    {event.date} · {event.time}
                  </p>

                  <p>
                    <MapPin size={16} />
                    {event.location}
                  </p>

                  <div className="my-event-actions">
                    <Link to={`/events/${event.id}`}>
                      View details
                      <ArrowRight size={16} />
                    </Link>

                    <button onClick={() => handleCancelRsvp(event.id)}>
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
