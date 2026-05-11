import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Headphones,
  MapPin,
  Accessibility,
  Languages,
  Bus,
  Tag,
  Heart,
} from "lucide-react";

import { UserContext } from "../context/UserContext";
import * as eventService from "../services/eventService";
import * as rsvpService from "../services/rsvpService";

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [rsvpMessage, setRsvpMessage] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await eventService.show(eventId);
        setEvent(eventData);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  async function handleRsvp() {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    try {
      await rsvpService.createRsvp(eventId);
      setRsvpMessage("You are RSVP’d! View it in My Events.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDelete() {
    try {
      await eventService.deleteEvent(eventId);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  }

  if (loading) {
    return (
      <main className="event-details-page">
        <p>Loading event...</p>
      </main>
    );
  }

  if (message) {
    return (
      <main className="event-details-page">
        <p>{message}</p>

        <Link to="/" className="event-details-back-link">
          <ArrowLeft size={18} />
          Back to Browse Events
        </Link>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="event-details-page">
        <p>Event not found.</p>
      </main>
    );
  }

  return (
    <main className="event-details-page">
      <Link to="/" className="event-details-back-link">
        <ArrowLeft size={18} />
        Back to Browse Events
      </Link>

      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="event-details-image"
        />
      )}

      <div className="event-details-header">
        <h1>{event.title}</h1>

        {event.price && (
          <span className="event-details-price">{event.price}</span>
        )}
      </div>

      <div className="event-details-meta">
        <p>
          <Calendar size={18} />
          {new Date(event.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}{" "}
          · {event.time}
        </p>

        <p>
          <MapPin size={18} />
          {event.location}
        </p>

        <p>
          <Tag size={18} />
          {event.category}
        </p>
      </div>

      <section className="event-details-section">
        <h2>About This Event</h2>
        <p>{event.description}</p>
      </section>

      <section className="event-details-section">
        <h2>Accessibility Features</h2>

        {event.accessibilityFeatures?.length ? (
          <div className="event-accessibility-grid">
            {event.accessibilityFeatures.map((feature) => {
              let icon = <Accessibility size={18} />;

              if (feature.toLowerCase().includes("asl")) {
                icon = <Languages size={18} />;
              }

              if (feature.toLowerCase().includes("low sensory")) {
                icon = <Headphones size={18} />;
              }

              if (feature.toLowerCase().includes("transit")) {
                icon = <Bus size={18} />;
              }

              return (
                <div className="event-feature-card" key={feature}>
                  {icon}
                  <span>{feature}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No accessibility features listed.</p>
        )}
      </section>

      <div className="event-details-actions">
        {event.rsvpEnabled && (
          <button type="button" onClick={handleRsvp}>
            <Heart size={18} />
            RSVP
          </button>
        )}

        {user &&
          String(event.creator?._id || event.creator) === String(user._id) && (
          <>
            <Link
              to={`/events/${event._id}/edit`}
              className="event-edit-button"
            >
              Edit Event
            </Link>

            <button
              type="button"
              className="event-delete-button"
              onClick={handleDelete}
            >
              Delete Event
            </button>
          </>
        )}
      </div>

      {rsvpMessage && (
        <p className="event-details-rsvp-message">
          {rsvpMessage}
        </p>
      )}
    </main>
  );
}

export default EventDetails;