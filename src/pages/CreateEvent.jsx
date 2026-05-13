// src/pages/CreateEvent.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Accessibility,
  Bus,
  Calendar,
  Captions,
  Clock,
  Headphones,
  Languages,
  MapPin,
  UploadCloud,
} from "lucide-react";
import { useUser } from "../context/useUser";
import { saveCreatedEvent } from "../services/createdEventService";

const accessibilityOptions = [
  { label: "Wheelchair Accessible", icon: Accessibility },
  { label: "ASL Provided", icon: Languages },
  { label: "Low Sensory", icon: Headphones },
  { label: "Captions Provided", icon: Captions },
  { label: "Step-free Access", icon: Accessibility },
  { label: "Public Transit Nearby", icon: Bus },
];

const defaultImage =
  "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200";

function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useUser();

  // Layman's terms: this keeps track of what the user types in the form.
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    price: "",
    imageUrl: "",
    description: "",
    accessibilityFeatures: [],
    rsvpEnabled: true,
  });

  const [error, setError] = useState("");

  // Only signed-in users should create events.
  if (!user) {
    return (
      <main className="create-event-page">
        <section className="create-auth-card">
          <h1>Sign in to create an event</h1>
          <p>Creating events is private, so please sign in first.</p>
          <button type="button" onClick={() => navigate("/sign-in")}>
            Sign in
          </button>
        </section>
      </main>
    );
  }

  const updateField = (fieldName, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }));
  };

  const toggleFeature = (featureLabel) => {
    setFormData((currentData) => {
      const alreadySelected =
        currentData.accessibilityFeatures.includes(featureLabel);

      return {
        ...currentData,
        accessibilityFeatures: alreadySelected
          ? currentData.accessibilityFeatures.filter(
              (feature) => feature !== featureLabel
            )
          : [...currentData.accessibilityFeatures, featureLabel],
      };
    });
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date";
    return new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (priceValue) => {
    const cleanPrice = String(priceValue || "").trim();

    if (!cleanPrice || cleanPrice.toLowerCase() === "free" || cleanPrice === "0") {
      return "FREE";
    }

    return cleanPrice.startsWith("$") ? cleanPrice : `$${cleanPrice}`;
  };

  const previewImage = formData.imageUrl || defaultImage;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !formData.title ||
      !formData.category ||
      !formData.date ||
      !formData.startTime ||
      !formData.location ||
      !formData.description
    ) {
      setError("Please complete all required fields before publishing.");
      return;
    }

    // Layman's terms: this creates the final event object the rest of the app can read.
    const newEvent = {
      id: `created-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      date: formatDate(formData.date),
      time: formData.endTime
        ? `${formData.startTime} – ${formData.endTime}`
        : formData.startTime,
      location: formData.location,
      price: formatPrice(formData.price),
      imageUrl: previewImage,
      description: formData.description,
      accessibilityFeatures: formData.accessibilityFeatures,
      organizer: user.username || "VibeAccess Organizer",
      rsvpEnabled: formData.rsvpEnabled,
      createdBy: user.username,
    };

    saveCreatedEvent(newEvent);

    // After publishing, send the user back to Browse Events to see the new card.
    navigate("/");
  };

  return (
    <main className="create-event-page">
      <section className="create-event-header">
        <p>Create Event</p>
        <h1>Create Event</h1>
        <span>Same form is used to edit your event details.</span>
      </section>

      <section className="create-event-layout">
        <form className="create-event-form-card" onSubmit={handleSubmit}>
          <h2>Event Details</h2>

          {error && <p className="form-error">{error}</p>}

          <label>
            Event Title <span>*</span>
            <input
              type="text"
              value={formData.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Enter a clear and descriptive title"
            />
          </label>

          <div className="form-two-column">
            <label>
              Category <span>*</span>
              <select
                value={formData.category}
                onChange={(event) => updateField("category", event.target.value)}
              >
                <option value="">Select a category</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Workshop">Workshop</option>
                <option value="Family">Family</option>
                <option value="Music">Music</option>
                <option value="Community">Community</option>
              </select>
            </label>

            <label>
              Date <span>*</span>
              <div className="input-with-icon">
                <Calendar size={18} />
                <input
                  type="date"
                  onClick={(event) => event.currentTarget.showPicker?.()}
                  value={formData.date}
                  onChange={(event) => updateField("date", event.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="form-two-column">
            <label>
              Start Time <span>*</span>
              <div className="input-with-icon">
                <Clock size={18} />
                <input
                  type="time"
                  onClick={(event) => event.currentTarget.showPicker?.()}
                  value={formData.startTime}
                  onChange={(event) =>
                    updateField("startTime", event.target.value)
                  }
                />
              </div>
            </label>

            <label>
              End Time
              <div className="input-with-icon">
                <Clock size={18} />
                <input
                  type="time"
                  onClick={(event) => event.currentTarget.showPicker?.()}
                  value={formData.endTime}
                  onChange={(event) => updateField("endTime", event.target.value)}
                />
              </div>
            </label>
          </div>

          <label>
            Venue / Location <span>*</span>
            <div className="input-with-icon">
              <MapPin size={18} />
              <input
                type="text"
                value={formData.location}
                onChange={(event) => updateField("location", event.target.value)}
                placeholder="Enter venue name or address"
              />
            </div>
            <small>Include the full address or venue name.</small>
          </label>

          <label>
            Price
            <input
              type="text"
              value={formData.price}
              onChange={(event) => updateField("price", event.target.value)}
              placeholder="FREE or 18"
            />
          </label>

          <label>
            Short Description <span>*</span>
            <textarea
              value={formData.description}
              maxLength="250"
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Describe your event in a few sentences..."
            />
            <small>{formData.description.length} / 250</small>
          </label>

          <div className="create-form-lower-grid">
            <div>
              <h3>Event Image</h3>

              <div className="image-upload-box">
                <UploadCloud size={28} />
                <strong>Upload an image</strong>
                <small>For this demo, paste an image URL below.</small>
              </div>

              <label>
                Image URL
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(event) =>
                    updateField("imageUrl", event.target.value)
                  }
                  placeholder="https://images.pexels.com/..."
                />
              </label>
            </div>

            <div>
              <h3>Accessibility Features</h3>
              <small>Select all that apply to your event.</small>

              <div className="feature-checkbox-grid">
                {accessibilityOptions.map(({ label, icon: Icon }) => (
                  <label className="feature-checkbox" key={label}>
                    <input
                      type="checkbox"
                      checked={formData.accessibilityFeatures.includes(label)}
                      onChange={() => toggleFeature(label)}
                    />
                    <Icon size={22} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <label className="rsvp-toggle-row">
            <span>
              <strong>RSVP Enabled</strong>
              <small>Allow guests to RSVP to your event.</small>
            </span>

            <input
              type="checkbox"
              checked={formData.rsvpEnabled}
              onChange={(event) =>
                updateField("rsvpEnabled", event.target.checked)
              }
            />
          </label>

          <div className="create-event-actions">
            <button type="button" className="secondary-button">
              Save Draft
            </button>

            <button type="submit" className="primary-button">
              Publish Event
            </button>
          </div>
        </form>

        <aside className="create-preview-card">
          <h2>Live Preview</h2>
          <p>This is how your event will appear.</p>

          <div className="preview-image-wrap">
            <img src={previewImage} alt="Event preview" />
            <span>{formatPrice(formData.price)}</span>
          </div>

          <h3>{formData.title || "Event Title"}</h3>

          <p>
            <Calendar size={16} />
            {formData.date ? formatDate(formData.date) : "Date"} ·{" "}
            {formData.startTime || "Time"}
          </p>

          <p>
            <MapPin size={16} />
            {formData.location || "Venue / Location"}
          </p>

          <p>
            {formData.description ||
              "Short description of your event will appear here for attendees to preview."}
          </p>

          <div className="preview-icon-row">
            {accessibilityOptions.map(({ label, icon: Icon }) => (
              <Icon
                key={label}
                size={22}
                className={
                  formData.accessibilityFeatures.includes(label)
                    ? "active-preview-icon"
                    : ""
                }
              />
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

export default CreateEvent;
