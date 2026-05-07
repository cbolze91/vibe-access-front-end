// src/data/mockEvents.js
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
      "https://images.pexels.com/photos/7900688/pexels-photo-7900688.jpeg",
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
      "https://images.pexels.com/photos/9044287/pexels-photo-9044287.jpeg",
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
      "https://images.pexels.com/photos/4354586/pexels-photo-4354586.jpeg",
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
      "https://images.pexels.com/photos/33465620/pexels-photo-33465620.jpeg",
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
      "https://images.pexels.com/photos/8437050/pexels-photo-8437050.jpeg",
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

  {
    id: 7,
    title: "Accessible Garden Walk",
    date: "Mon, May 27",
    time: "10:30 AM",
    location: "Zilker Botanical Garden, Austin, TX",
    category: "Outdoors",
    price: "FREE",
    creator: "Austin Garden Collective",
    imageUrl:
      "https://images.pexels.com/photos/8415711/pexels-photo-8415711.jpeg",
    description:
      "A peaceful garden walk with step-free paths, wheelchair access, and quiet rest areas.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Low sensory",
      "Step-free access",
      "Public transit nearby",
    ],
    rsvpEnabled: true,
  },
  {
    id: 8,
    title: "Sensory-Friendly Art Studio",
    date: "Tue, May 28",
    time: "1:00 PM",
    location: "Creative Space Austin, Austin, TX",
    category: "Arts",
    price: "$12",
    creator: "Creative Space Austin",
    imageUrl:
      "https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "A calm art-making session with low lighting, quiet space, captions, and accessible tables.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Low sensory",
      "Captions provided",
      "Step-free access",
    ],
    rsvpEnabled: true,
  },
  {
    id: 9,
    title: "Inclusive Dance Social",
    date: "Wed, May 29",
    time: "6:30 PM",
    location: "Community Dance Hall, Austin, TX",
    category: "Dance",
    price: "$8",
    creator: "Inclusive Dance Austin",
    imageUrl:
      "https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "A beginner-friendly dance night with ASL support, captions, accessible entry, and seating.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "ASL provided",
      "Captions provided",
      "Step-free access",
      "Public transit nearby",
    ],
    rsvpEnabled: true,
  },
];
