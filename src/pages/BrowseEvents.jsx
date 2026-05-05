import { mockEvents } from "../data/mockEvents";

function BrowseEvents() {
  const featuredEvents = mockEvents.slice(0, 3);

  return (
    <main className="page-shell">
      {/* Hero section introduces the main Browse Events experience. */}
      <section className="browse-hero">
        <div>
          <p className="eyebrow">Accessible events. Inclusive community.</p>
          <h1>Find accessible events.</h1>
          <p className="hero-copy">
            Discover inclusive experiences near you. Everyone’s invited.
          </p>
        </div>

        {/* Search helps users quickly find events by name, place, or keyword. */}
        <form className="search-bar">
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <input
            id="event-search"
            type="search"
            placeholder="Search events, locations, or keywords..."
          />
          <button type="submit">Search</button>
        </form>

        {/* Accessibility filters help users scan for events that fit their needs. */}
        <div
          className="accessibility-filters"
          aria-label="Accessibility filters"
        >
          <button type="button">♿ Wheelchair Accessible</button>
          <button type="button">🤟 ASL Provided</button>
          <button type="button">🎧 Low Sensory</button>
          <button type="button">💬 Captions Provided</button>
          <button type="button">🚶 Step-free Access</button>
          <button type="button">🚌 Public Transit Nearby</button>
        </div>
      </section>

      {/* Featured events are the most important cards at the top. */}
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
                <span className="price-pill">FREE</span>
              </div>

              <div className="event-card__content">
                <p className="category-pill">{event.category}</p>
                <h3>{event.title}</h3>
                <p className="event-meta">
                  📅 {event.date} · {event.time}
                </p>
                <p className="event-meta">📍 {event.location}</p>

                <div className="tag-row" aria-label="Accessibility features">
                  {event.accessibilityFeatures.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>

                <a className="details-link" href="#event-details">
                  View details →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* All events gives users a fuller list after featured cards. */}
      <section className="section-block" id="all-events">
        <div className="section-heading">
          <h2>All Events</h2>
          <select aria-label="Sort events">
            <option>Date</option>
            <option>Category</option>
            <option>Location</option>
          </select>
        </div>

        <div className="event-list">
          {mockEvents.map((event) => (
            <article className="event-row" key={event.id}>
              <img src={event.imageUrl} alt={event.title} />

              <div>
                <h3>{event.title}</h3>
                <p>
                  📅 {event.date} · {event.time}
                </p>
                <p>📍 {event.location}</p>
              </div>

              <div className="tag-row event-row__tags">
                {event.accessibilityFeatures.map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>

              <a href="#event-details">View details →</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BrowseEvents;
