import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Captions,
  Heart,
  Headphones,
  MapPin,
  Search,
  Bus,
  Accessibility,
  Languages,
} from "lucide-react";
import * as eventService from "../services/eventService";

const accessibilityFilters = [
  { label: "Wheelchair Accessible", icon: Accessibility },
  { label: "ASL Provided", icon: Languages },
  { label: "Low Sensory", icon: Headphones },
  { label: "Captions Provided", icon: Captions },
  { label: "Step-free Access", icon: Accessibility },
  { label: "Public Transit Nearby", icon: Bus },
];

function FeatureIcon({ feature }) {
  const normalizedFeature = feature.toLowerCase();

  if (normalizedFeature.includes("asl")) return <Languages size={20} />;
  if (normalizedFeature.includes("caption")) return <Captions size={20} />;
  if (normalizedFeature.includes("sensory")) return <Headphones size={20} />;
  if (normalizedFeature.includes("transit")) return <Bus size={20} />;

  return <Accessibility size={20} />;
}

function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventData = await eventService.index();
        setEvents(eventData);
      } catch (error) {
        setMessage(error.message);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const searchText = `${event.title} ${event.location} ${event.category}`.toLowerCase();
    return searchText.includes(searchTerm.toLowerCase());
  });

  const featuredEvents = filteredEvents.slice(0, 7);
  const allEvents = filteredEvents;

  return (
    <main className="page-shell">
      <section className="browse-hero">
        <div className="hero-text">
          <h1>Find accessible events.</h1>
          <p>
            Discover inclusive experiences near you.
            <br />
            Everyone’s invited.
          </p>
        </div>

        <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <Search size={22} aria-hidden="true" />
          <input
            id="event-search"
            type="search"
            placeholder="Search events, locations, or keywords..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="accessibility-grid" aria-label="Accessibility filters">
          {accessibilityFilters.map(({ label, icon: Icon }) => (
            <button type="button" className="accessibility-tile" key={label}>
              <Icon size={28} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      {message && <p>{message}</p>}

      <section className="section-block">
        <div className="section-heading">
          <h2>Featured Events</h2>
          <a href="#all-events">View all featured →</a>
        </div>

        <div className="featured-grid">
          {featuredEvents.map((event) => (
            <article className="event-card" key={event._id}>
              <div className="event-card__image-wrap">
                {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
                <span className="price-pill">{event.price || "FREE"}</span>
                <button
                  className="heart-button"
                  type="button"
                  aria-label={`Save ${event.title}`}
                >
                  <Heart size={24} />
                </button>
              </div>

              <div className="event-card__content">
                <h3>{event.title}</h3>

                <p className="event-meta">
                  <Calendar size={16} aria-hidden="true" />
                  {new Date(event.date).toLocaleDateString()} · {event.time}
                </p>

                <p className="event-meta">
                  <MapPin size={16} aria-hidden="true" />
                  {event.location}
                </p>

                <div className="icon-row" aria-label="Accessibility features">
                  {event.accessibilityFeatures?.slice(0, 5).map((feature) => (
                    <span title={feature} key={feature}>
                      <FeatureIcon feature={feature} />
                    </span>
                  ))}
                </div>

                <Link className="details-link" to={`/events/${event._id}`}>
                  View details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" id="all-events">
        <div className="section-heading">
          <h2>All Events</h2>
        </div>

        <div className="event-list">
          {allEvents.map((event) => (
            <article className="event-row" key={event._id}>
              {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}

              <div className="event-row__details">
                <h3>{event.title}</h3>

                <p>
                  <Calendar size={15} aria-hidden="true" />
                  {new Date(event.date).toLocaleDateString()} · {event.time}
                </p>

                <p>
                  <MapPin size={15} aria-hidden="true" />
                  {event.location}
                </p>
              </div>

              <div className="icon-row event-row__icons">
                {event.accessibilityFeatures?.slice(0, 5).map((feature) => (
                  <span title={feature} key={feature}>
                    <FeatureIcon feature={feature} />
                  </span>
                ))}
              </div>

              <span className="row-price">{event.price || "FREE"}</span>

              <Link className="row-link" to={`/events/${event._id}`}>
                View details →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <nav className="bottom-nav" aria-label="Mobile bottom navigation">
        <Link to="/">Browse</Link>
        <Link to="/my-events">My Events</Link>
        <Link to="/create">Create</Link>
        <Link to="/sign-in">Profile</Link>
      </nav>
    </main>
  );
}

export default BrowseEvents;