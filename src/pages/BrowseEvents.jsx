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
import { useState } from "react";
import { Link } from "react-router";
import { mockEvents } from "../data/mockEvents";

const accessibilityFilters = [
  { label: "Wheelchair Accessible", icon: Accessibility },
  { label: "ASL Provided", icon: Languages },
  { label: "Low Sensory", icon: Headphones },
  { label: "Captions Provided", icon: Captions },
  { label: "Step-free Access", icon: Accessibility },
  { label: "Public Transit Nearby", icon: Bus },
];

function FeatureIcon({ feature }) {
  const iconMap = {
    "Wheelchair accessible": Accessibility,
    "ASL provided": Languages,
    "Low sensory": Headphones,
    "Captions provided": Captions,
    "Step-free entrance": Accessibility,
    "Step-free access": Accessibility,
    "Public transit nearby": Bus,
  };

  const Icon = iconMap[feature] || Accessibility;

  // Keeps feature icons consistent with the hi-fi.
  return <Icon size={20} strokeWidth={2.25} aria-hidden="true" />;
}

function BrowseEvents() {
  // Featured Events shows a full browse row like Airbnb.
  const featuredEvents = mockEvents.slice(0, 9);

  // All Events stays focused and unchanged visually.
  const allEvents = mockEvents.slice(3, 6);

  return (
    <main className="page-shell">
      {/* Hero section introduces the main event discovery experience. */}
      <section className="browse-hero">
        <div className="hero-text">
          <h1>Find accessible events.</h1>
          <p>
            Discover inclusive experiences near you.
            <br />
            Everyone’s invited.
          </p>
        </div>

        {/* Search helps users find events faster. */}
        <form className="search-bar">
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <Search size={22} aria-hidden="true" />
          <input
            id="event-search"
            type="search"
            placeholder="Search events, locations, or keywords..."
          />
          <button type="submit">Search</button>
        </form>

        {/* Accessibility filters make the product purpose clear immediately. */}
        <div className="accessibility-grid" aria-label="Accessibility filters">
          {accessibilityFilters.map(({ label, icon: Icon }) => (
            <button type="button" className="accessibility-tile" key={label}>
              <Icon size={28} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured events are the most important events at the top. */}
      <section className="section-block">
        <div className="section-heading">
          <h2>Featured Events</h2>
          <a href="#all-events">View all featured →</a>
        </div>

        <div className="featured-grid">
          {featuredEvents.map((event) => (
            <article className="event-card" key={event.id}>
              <div className="event-card__image-wrap">
                <img src={event.imageUrl} alt={event.title} />
                <span className="price-pill">{event.price}</span>
                <button
                  className="heart-button"
                  type="button"
                  aria-label="Save event"
                >
                  <Heart size={24} />
                </button>
              </div>

              <div className="event-card__content">
                <h3>{event.title}</h3>

                <p className="event-meta">
                  <Calendar size={16} aria-hidden="true" />
                  {event.date} · {event.time}
                </p>

                <p className="event-meta">
                  <MapPin size={16} aria-hidden="true" />
                  {event.location}
                </p>

                <div className="icon-row" aria-label="Accessibility features">
                  {event.accessibilityFeatures.slice(0, 5).map((feature) => (
                    <span title={feature} key={feature}>
                      <FeatureIcon feature={feature} />
                    </span>
                  ))}
                </div>

                <a className="details-link" href="#event-details">
                  View details →
                </a>
              </div>
            </article>
          ))}

          {featuredEvents.map((event) => (
            <article className="event-card" key={event.id}>
              ...
            </article>
          ))}

        </div>
      </section>

      {/* All events gives users a scannable list after featured cards. */}
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
          {allEvents.map((event) => (
            <article className="event-row" key={event.id}>
              <img src={event.imageUrl} alt={event.title} />

              <div className="event-row__details">
                <h3>{event.title}</h3>
                <p>
                  <Calendar size={15} aria-hidden="true" />
                  {event.date} · {event.time}
                </p>
                <p>
                  <MapPin size={15} aria-hidden="true" />
                  {event.location}
                </p>
              </div>

              <div className="icon-row event-row__icons">
                {event.accessibilityFeatures.slice(0, 5).map((feature) => (
                  <span title={feature} key={feature}>
                    <FeatureIcon feature={feature} />
                  </span>
                ))}
              </div>

              <span className="row-price">{event.price}</span>

              <a className="row-link" href="#event-details">
                View details →
              </a>
            </article>
          ))}
        </div>

        <button className="view-more" type="button">
          View more events
        </button>
      </section>

      {/* Mobile bottom navigation mirrors the mobile hi-fi pattern. */}
      <nav className="bottom-nav" aria-label="Mobile bottom navigation">
        <a href="/">Browse</a>
        <a href="/my-events">My Events</a>
        <a href="/create">Create</a>
        <a href="/login">Profile</a>
      </nav>
    </main>
  );
}

export default BrowseEvents;
