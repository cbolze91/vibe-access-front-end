// src/pages/EventDetails.jsx
import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Tag,
  Heart,
  Accessibility,
  Languages,
  Headphones,
  Bus,
  PawPrint,
  ExternalLink,
  Info,
  Map,
  ClipboardList,
  MoreHorizontal,
} from "lucide-react";
import { mockEvents } from "../data/mockEvents";
import { useUser } from "../context/useUser";
import { createRsvp, isEventRsvped } from "../services/rsvpService";

const CREATED_EVENTS_KEY = "vibeaccess_created_events";

function getCreatedEvents() {
  try {
    return JSON.parse(localStorage.getItem(CREATED_EVENTS_KEY)) || [];
  } catch {
    return [];
  }
}

function EventDetails() {
  const { eventId } = useParams();
  const { user } = useUser();
  const [rsvpMessage, setRsvpMessage] = useState("");

  // Details page can open both starter mock events and newly created demo events.
  const allEvents = [...getCreatedEvents(), ...mockEvents];
  const event = allEvents.find((eventItem) => String(eventItem.id) === eventId);

  if (!event) {
    return (
      <main className="event-details-page">
        <section className="event-details-empty">
          <h1>Event not found</h1>
          <p>This event may have been removed or the link may be incorrect.</p>

          <Link to="/" className="event-details-back-link">
            <ArrowLeft size={17} />
            Back to Browse Events
          </Link>
        </section>
      </main>
    );
  }

  // Keeps images working even if different events use different image property names.
  const getEventImage = (eventItem) =>
    eventItem.image ||
    eventItem.imageUrl ||
    eventItem.img ||
    eventItem.photo ||
    eventItem.thumbnail ||
    "";

  // Prevents double dollar signs, like "$$15".
  const getPriceLabel = (price) => {
    if (price === 0) return "FREE";

    const cleanPrice = String(price || "FREE").trim();

    if (cleanPrice.toLowerCase() === "free") return "FREE";
    if (cleanPrice.startsWith("$")) return cleanPrice;

    return `$${cleanPrice}`;
  };

  const eventImage = getEventImage(event);
  const alreadyRsvped = isEventRsvped(event.id, user?.username);

  // Saves RSVP for signed-in users and gives instant feedback.
  const handleRsvp = () => {
    if (!user) return;

    createRsvp(event, user.username);
    setRsvpMessage("You are RSVP’d! View it in My Events.");
  };
  const priceLabel = getPriceLabel(event.price);
  const category = event.category || event.type || "Community event";
  const venueName = event.location?.split(",")[0] || "Event location";

  const description =
    event.description ||
    "Join us for an inclusive local experience designed with accessibility, comfort, and community in mind.";

  // Uses a consistent, presentation-ready accessibility set for the details page.
  // This keeps the story strong even when mock data is incomplete.
  const accessibilityFeatures = [
    {
      label: "Wheelchair Accessible",
      icon: <Accessibility size={18} />,
    },
    {
      label: "ASL Provided",
      icon: <Languages size={18} />,
    },
    {
      label: "Low Sensory",
      icon: <Headphones size={18} />,
    },
    {
      label: "Step-free Access",
      icon: <Accessibility size={18} />,
    },
    {
      label: "Service Animal Friendly",
      icon: <PawPrint size={18} />,
    },
  ];

  const mobileFeatures = [
    accessibilityFeatures[0],
    accessibilityFeatures[1],
    accessibilityFeatures[2],
    {
      label: "More",
      icon: <MoreHorizontal size={18} />,
    },
  ];

  const relatedEvents = allEvents
    .filter((eventItem) => String(eventItem.id) !== eventId)
    .slice(0, 2);

  return (
    <main className="event-details-page">
      <section className="event-details-container">
        <Link to="/" className="event-details-back-link">
          <ArrowLeft size={17} />
          Back to Browse Events
        </Link>

        <section className="event-details-top-grid">
          <div className="event-details-image-card">
            {eventImage ? (
              <img src={eventImage} alt={event.title} />
            ) : (
              <div className="event-details-image-fallback">{event.title}</div>
            )}

            <span className="event-details-price-badge">{priceLabel}</span>

            <button className="event-details-heart-button" aria-label="Save event">
              <Heart size={28} />
            </button>
          </div>

          <aside className="event-details-summary-card">
            <h1>{event.title}</h1>

            <div className="event-details-meta-list">
              <p>
                <Calendar size={18} />
                <span>{event.date} · {event.time}</span>
              </p>

              <p>
                <MapPin size={18} />
                <span>{event.location}</span>
              </p>

              <p>
                <Tag size={18} />
                <span>{category}</span>
              </p>
            </div>

            <div className="event-details-feature-row event-details-feature-row-desktop">
              {accessibilityFeatures.map((feature) => (
                <span className="event-details-feature-card" key={feature.label}>
                  {feature.icon}
                  <strong>{feature.label}</strong>
                </span>
              ))}
            </div>

            <div className="event-details-feature-row event-details-feature-row-mobile">
              {mobileFeatures.map((feature) => (
                <span className="event-details-feature-card" key={feature.label}>
                  {feature.icon}
                  <strong>{feature.label}</strong>
                </span>
              ))}
            </div>

            <div className="event-details-actions">
              {user ? (
                <button className="event-details-rsvp-button" onClick={handleRsvp}>
                  {alreadyRsvped ? "RSVP’d" : "RSVP Now"}
                </button>
              ) : (
                <Link to="/sign-in" className="event-details-rsvp-button">
                  Sign in to RSVP
                </Link>
              )}

              <button className="event-details-save-button">
                <Heart size={20} />
                Save
              </button>
            </div>

            {rsvpMessage && (
              <p className="event-details-rsvp-message">{rsvpMessage}</p>
            )}
          </aside>
        </section>

        <section className="event-details-content-grid">
          <article className="event-details-card event-details-about-card">
            <p>{description}</p>
          </article>

          <article className="event-details-card event-details-organizer-card">
            <h2>Organizer</h2>

            <div className="event-details-organizer-row">
              <div className="event-details-avatar">VA</div>

              <div>
                <strong>{event.organizer || "VibeAccess Collective"}</strong>
                <p>hello@vibeaccess.org</p>
              </div>
            </div>

            <a href="#organizer" className="event-details-inline-link">
              View organizer profile
              <ExternalLink size={15} />
            </a>
          </article>

          <article className="event-details-card event-details-location-card">
            <h2>Location</h2>

            <div className="event-details-location-inner">
              <div className="event-details-map-card">
                <Map size={34} />
                <span>{venueName}</span>
              </div>

              <div className="event-details-location-copy">
                <strong>{venueName}</strong>
                <p>{event.location}</p>

                <a href="#map" className="event-details-inline-link">
                  View on Google Maps
                  <ExternalLink size={15} />
                </a>

                <ul>
                  <li>Wheelchair accessible</li>
                  <li>Step-free access</li>
                  <li>Accessible restrooms on site</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="event-details-card event-details-extra-card">
            <h2>Details</h2>

            <p>
              <Info size={18} />
              <span>Please check event details before arriving.</span>
            </p>

            <p>
              <ClipboardList size={18} />
              <span>All levels are welcome. No special experience needed.</span>
            </p>
          </article>
        </section>

        <section className="event-details-mobile-accordion">
          <details open>
            <summary>About</summary>
            <p>{description}</p>
          </details>

          <details>
            <summary>Location</summary>
            <p>{event.location}</p>
          </details>

          <details>
            <summary>Organizer</summary>
            <p>{event.organizer || "VibeAccess Collective"}</p>
          </details>

          <details>
            <summary>Details</summary>
            <p>All levels are welcome. Please check event details before arriving.</p>
          </details>
        </section>

        <section className="event-details-related-section">
          <div className="event-details-section-header">
            <h2>Related Events</h2>
            <Link to="/">View all events</Link>
          </div>

          <div className="event-details-related-grid">
            {relatedEvents.map((relatedEvent) => {
              const relatedImage = getEventImage(relatedEvent);
              const relatedPrice = getPriceLabel(relatedEvent.price);

              return (
                <Link
                  to={`/events/${relatedEvent.id}`}
                  className="event-details-related-card"
                  key={relatedEvent.id}
                >
                  <div className="event-details-related-image-wrap">
                    {relatedImage ? (
                      <img src={relatedImage} alt={relatedEvent.title} />
                    ) : (
                      <div className="event-details-related-fallback">
                        {relatedEvent.title}
                      </div>
                    )}

                    <span className="event-details-related-price">
                      {relatedPrice}
                    </span>
                  </div>

                  <div className="event-details-related-copy">
                    <h3>{relatedEvent.title}</h3>

                    <p>
                      <Calendar size={15} />
                      {relatedEvent.date} · {relatedEvent.time}
                    </p>

                    <p>
                      <MapPin size={15} />
                      {relatedEvent.location}
                    </p>

                    <div className="event-details-related-icons">
                      <Accessibility size={15} />
                      <Languages size={15} />
                      <Headphones size={15} />
                      <Bus size={15} />
                    </div>
                  </div>

                  <Heart size={21} className="event-details-related-heart" />
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}

export default EventDetails;
