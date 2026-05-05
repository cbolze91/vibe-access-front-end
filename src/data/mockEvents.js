// Temporary event data used while the backend is still being built.
// Later, these events will come from MongoDB through the API.
export const mockEvents = [
  {
    id: 1,
    title: "Open Air Movie Night",
    date: "Fri, May 24",
    time: "8:00 PM",
    location: "Riverside Park, Austin, TX",
    category: "Entertainment",
    price: "FREE",
    creator: "Austin Parks Collective",
    imageUrl:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=1200&q=80",
    description:
      "A relaxed outdoor movie night with accessible seating, captions, and public transit nearby.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "ASL provided",
      "Low sensory",
      "Captions provided",
      "Public transit nearby",
    ],
    rsvpEnabled: true,
  },
  {
    id: 2,
    title: "ASL Comedy Show",
    date: "Sat, May 25",
    time: "7:00 PM",
    location: "The Laugh Hub, Austin, TX",
    category: "Comedy",
    price: "$15",
    creator: "The Laugh Hub",
    imageUrl:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
    description:
      "A comedy night with ASL interpretation, captions, and inclusive seating options.",
    accessibilityFeatures: [
      "ASL provided",
      "Captions provided",
      "Low sensory",
      "Public transit nearby",
    ],
    rsvpEnabled: true,
  },
  {
    id: 3,
    title: "Mindful Makers Workshop",
    date: "Sun, May 26",
    time: "11:00 AM",
    location: "Community Studio, Austin, TX",
    category: "Workshop",
    price: "$25",
    creator: "Mindful Makers",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
    description:
      "A calm creative workshop with a low-sensory setup and accessible studio space.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Low sensory",
      "Captions provided",
      "Public transit nearby",
    ],
    rsvpEnabled: true,
  },
  {
    id: 4,
    title: "Indie Acoustic Night",
    date: "Fri, May 24",
    time: "7:30 PM",
    location: "The Listening Room, Austin, TX",
    category: "Music",
    price: "FREE",
    creator: "Listening Room",
    imageUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    description:
      "A cozy live music night with accessible seating and public transit nearby.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Low sensory",
      "Public transit nearby",
    ],
    rsvpEnabled: true,
  },
  {
    id: 5,
    title: "Family Science Day",
    date: "Sat, May 25",
    time: "10:00 AM",
    location: "Thinkery Museum, Austin, TX",
    category: "Family",
    price: "$10",
    creator: "Thinkery Museum",
    imageUrl:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80",
    description:
      "A hands-on science event for families with captions and accessible paths.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Captions provided",
      "Public transit nearby",
    ],
    rsvpEnabled: true,
  },
  {
    id: 6,
    title: "Adaptive Yoga in the Park",
    date: "Sun, May 26",
    time: "9:00 AM",
    location: "Pease Park, Austin, TX",
    category: "Wellness",
    price: "FREE",
    creator: "Austin Wellness Collective",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    description:
      "An outdoor yoga session designed for all levels with accessible restrooms and step-free access.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Low sensory",
      "Captions provided",
      "Public transit nearby",
    ],
    rsvpEnabled: true,
  },
];
