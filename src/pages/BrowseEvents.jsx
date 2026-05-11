// src/pages/BrowseEvents.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
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

const CREATED_EVENTS_KEY = "vibeaccess_created_events";

const accessibilityFilters = [
  { label: "Wheelchair Accessible", match: "wheelchair", icon: Accessibility },
  { label: "ASL Provided", match: "asl", icon: Languages },
  { label: "Low Sensory", match: "low sensory", icon: Headphones },
  { label: "Captions Provided", match: "captions", icon: Captions },
  { label: "Step-free Access", match: "step-free", icon: Accessibility },
  { label: "Public Transit Nearby", match: "public transit", icon: Bus },
];

function getCreatedEvents() {
  try {
    return JSON.parse(localStorage.getItem(CREATED_EVENTS_KEY)) || [];
  } catch {
    return [];
  }
}

function getPriceLabel(price) {
  if (price === 0) return "FREE";

  const cleanPrice = String(price || "FREE").trim();

  if (cleanPrice.toLowerCase() === "free") return "FREE";
  if (cleanPrice.startsWith("$")) return cleanPrice;

  return `$${cleanPrice}`;
}

function getEventImage(event) {
  return event.imageUrl || event.image || event.img || event.photo || "";
}

function FeatureIcon({ feature }) {
  const text = String(feature).toLowerCase();

  if (text.includes("asl")) return <Languages size={18} />;
  if (text.includes("sensory")) return <Headphones size={18} />;
  if (text.includes("caption")) return <Captions size={18} />;
  if (text.includes("transit")) return <Bus size={18} />;

  return <Accessibility size={18} />;
}

function BrowseEvents() {
  const navigate = useNavigate();
  const [createdEvents] = useState(() => getCreatedEvents());
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const allEvents = useMemo(() => {
    return [...createdEvents, ...mockEvents];
  }, [createdEvents]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const searchableText = [
        event.title,
        event.location,
        event.category,
        event.description,
        ...(event.accessibilityFeatures || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter
        ? searchableText.includes(activeFilter.toLowerCase())
        : true;

      return matchesSearch && matchesFilter;
    });
  }, [allEvents, searchTerm, activeFilter]);

  const featuredEvents = filteredEvents.slice(0, 7);
  const listEvents = filteredEvents.slice(0, 6);

  const goToDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <main className="page-shell">
      {/* Hero: explains what the app helps users do. */}
      <section className="browse-hero">
        <div className="hero-text">
          <h1>Find accessible events.</h1>
          <p>
            Discover inclusive experiences near you.
            <br />
            Everyone’s invited.
          </p>
        </div>

        {/* Search: helps users narrow events by title, place, category, or feature. */}
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

        {/* Accessibility filters: one-click narrowing for the demo story. */}
        <div className="accessibility-grid" aria-label="Accessibility filters">
          {accessibilityFilters.map(({ label, match, icon: Icon }) => (
            <button
              type="button"
              className={`accessibility-tile ${
                activeFilter === match ? "accessibility-tile--active" : ""
              }`}
              key={label}
              onClick={() => setActiveFilter(activeFilter === match ? "" : match)}
            >
              <Icon size={28} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured events: image-first cards for visual browsing. */}
      <section className="section-block">
        <div className="section-heading">
          <h2>Featured Events</h2>
          <button
            className="text-link-button"
            type="button"
            onClick={() => setActiveFilter("")}
          >
            View all featured →
          </button>
        </div>

        <div className="featured-grid">
          {featuredEvents.map((event) => (
            <article
              className="event-card event-card--clickable"
              key={event.id}
              role="button"
              tabIndex="0"
              onClick={() => goToDetails(event.id)}
              onKeyDown={(keyEvent) => {
                if (keyEvent.key === "Enter") goToDetails(event.id);
              }}
            >
              <div className="event-card__image-wrap">
                {getEventImage(event) && (
                  <img src={getEventImage(event)} alt={event.title} />
                )}

                <span className="price-pill">{getPriceLabel(event.price)}</span>

                <button
                  className="heart-button"
                  type="button"
                  aria-label={`Save ${event.title}`}
                  onClick={(clickEvent) => clickEvent.stopPropagation()}
                >
                  <Heart size={24} />
                </button>
              </div>

              <div className="event-card__content">
                <h3>{event.title}</h3>

                <p className="event-meta">
                  <Calendar size={16} aria-hidden="true" />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })} · {event.time}
                </p>

                <p className="event-meta">
                  <MapPin size={16} aria-hidden="true" />
                  {event.location}
                </p>

                <div className="icon-row" aria-label="Accessibility features">
                  {(event.accessibilityFeatures || []).slice(0, 5).map((feature) => (
                    <span title={feature} key={feature}>
                      <FeatureIcon feature={feature} />
                    </span>
                  ))}
                </div>

                <span className="details-link">View details →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* All Events: compact list for quick scanning. */}
      <section className="section-block" id="all-events">
        <div className="section-heading">
          <h2>All Events</h2>

          <label className="sort-control">
            <span>Sort by:</span>
            <select aria-label="Sort events">
              <option>Date</option>
              <option>Category</option>
              <option>Location</option>
            </select>
          </label>
        </div>

        <div className="event-list">
          {listEvents.map((event) => (
            <article
              className="event-row event-row--clickable"
              key={event.id}
              role="button"
              tabIndex="0"
              onClick={() => goToDetails(event.id)}
              onKeyDown={(keyEvent) => {
                if (keyEvent.key === "Enter") goToDetails(event.id);
              }}
            >
              {getEventImage(event) && <img src={getEventImage(event)} alt={event.title} />}

              <div className="event-row__details">
                <h3>{event.title}</h3>

                <p>
                  <Calendar size={15} aria-hidden="true" />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })} · {event.time}
                </p>

                <p>
                  <MapPin size={15} aria-hidden="true" />
                  {event.location}
                </p>
              </div>

              <div className="icon-row event-row__icons">
                {(event.accessibilityFeatures || []).slice(0, 5).map((feature) => (
                  <span title={feature} key={feature}>
                    <FeatureIcon feature={feature} />
                  </span>
                ))}
              </div>

              <span className="row-price">{getPriceLabel(event.price)}</span>
              <span className="row-link">View details →</span>
            </article>
          ))}
        </div>

        <button className="view-more" type="button">
          View more events
        </button>
      </section>
    </main>
  );
}

export default BrowseEvents;
