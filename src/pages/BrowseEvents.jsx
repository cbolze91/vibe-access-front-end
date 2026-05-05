import { mockEvents } from "../data/mockEvents";

function BrowseEvents() {
  return (
    <main>
      {/* Hero section introduces the page purpose. */}
      <section>
        <p>Accessible events. Inclusive community.</p>
        <h1>Find accessible events that fit your needs.</h1>
        <p>
          Browse inclusive experiences with clear accessibility details before
          you go.
        </p>
      </section>

      {/* Event list turns mock data into visible event cards. */}
      <section>
        {mockEvents.map((event) => (
          <article key={event.id}>
            {/* Event image helps the card feel more visual and real. */}
            <img src={event.imageUrl} alt={event.title} />

            {/* Event details show the most important information first. */}
            <div>
              <p>{event.category}</p>
              <h2>{event.title}</h2>
              <p>
                {event.date} · {event.time}
              </p>
              <p>{event.location}</p>
              <p>{event.description}</p>

              {/* Accessibility tags help users quickly scan event support. */}
              <div>
                {event.accessibilityFeatures.map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default BrowseEvents;
