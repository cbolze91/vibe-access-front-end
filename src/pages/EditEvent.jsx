import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import EventForm from "../components/EventForm/EventForm";
import * as eventService from "../services/eventService";

function EditEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await eventService.show(eventId);
        setEvent(eventData);
      } catch (error) {
        setMessage(error.message);
      }
    }

    fetchEvent();
  }, [eventId]);

  if (message) {
    return (
      <main className="event-form-page">
        <p>{message}</p>
        <Link to="/">Back to events</Link>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="event-form-page">
        <p>Loading event...</p>
      </main>
    );
  }

  return <EventForm existingEvent={event} />;
}

export default EditEvent;