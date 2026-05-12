import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as eventService from '../../services/eventService';

const EventForm = ({ existingEvent = null }) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: existingEvent?.title || '',
    date: existingEvent?.date
  ? new Date(existingEvent.date).toISOString().slice(0, 10)
  : '',
    time: existingEvent?.time || '',
    location: existingEvent?.location || '',
    category: existingEvent?.category || '',
    imageUrl: existingEvent?.imageUrl || '',
    price: existingEvent?.price || '',
    description: existingEvent?.description || '',
    accessibilityFeatures: existingEvent?.accessibilityFeatures
      ? existingEvent.accessibilityFeatures.join(', ')
      : '',
    rsvpEnabled: existingEvent?.rsvpEnabled ?? true,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const eventData = {
        ...formData,
        accessibilityFeatures: formData.accessibilityFeatures
          .split(',')
          .map((feature) => feature.trim())
          .filter((feature) => feature),
      };

      if (existingEvent) {
        await eventService.update(existingEvent._id, eventData);
      } else {
        await eventService.create(eventData);
      }

      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="event-form-page">
      <h1>{existingEvent ? 'Edit Event' : 'Create Event'}</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} className="event-form">
        <div>
          <label htmlFor="title">Event Title</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            placeholder="7:00 PM"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            placeholder="Entertainment, Wellness, Community"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            placeholder="FREE or $15"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="accessibilityFeatures">Accessibility Features</label>
          <input
            id="accessibilityFeatures"
            name="accessibilityFeatures"
            placeholder="Wheelchair accessible, Captions provided, Low sensory"
            value={formData.accessibilityFeatures}
            onChange={handleChange}
          />
        </div>

        <label>
          <input
            type="checkbox"
            name="rsvpEnabled"
            checked={formData.rsvpEnabled}
            onChange={handleChange}
          />
          RSVP Enabled
        </label>

        <button type="submit">
          {existingEvent ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </main>
  );
};

export default EventForm;