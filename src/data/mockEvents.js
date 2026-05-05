// Temporary event data used while the backend is still being built.
// Later, these events will come from MongoDB through the API.
export const mockEvents = [
  {
    // Basic event information shown on event cards.
    id: 1,
    title: "Community Yoga in the Park",
    date: "2026-05-18",
    time: "10:00 AM",
    location: "Boston Common",
    category: "Wellness",

    // Image shown on the event card.
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",

    // Short event summary for users.
    description:
      "A calm outdoor yoga session designed to be welcoming, inclusive, and beginner-friendly.",

    // Accessibility details help users decide if the event fits their needs.
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Low sensory",
      "Public transit nearby",
    ],

    // Controls whether users can RSVP to this event.
    rsvpEnabled: true,
  },
  {
    id: 2,
    title: "Museum Quiet Hour",
    date: "2026-05-21",
    time: "9:00 AM",
    location: "Museum of Fine Arts Boston",
    category: "Arts",
    imageUrl:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
    description:
      "A low-crowd museum visit with reduced noise and a slower, more relaxed environment.",
    accessibilityFeatures: [
      "Low sensory",
      "Step-free entrance",
      "Accessible restroom",
    ],
    rsvpEnabled: true,
  },
  {
    id: 3,
    title: "Open Caption Movie Night",
    date: "2026-05-24",
    time: "7:00 PM",
    location: "Somerville Theatre",
    category: "Entertainment",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    description:
      "A community movie night with open captions and accessible seating options.",
    accessibilityFeatures: [
      "Closed captions",
      "Wheelchair accessible",
      "Service animal friendly",
    ],
    rsvpEnabled: true,
  },
];
