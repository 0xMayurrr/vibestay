
// Mock Data for Properties, Events, Reviews, Notifications

// USERS
const USERS = [
    { id: 'u1', name: "Alex Traveler", role: 'traveler' },
    { id: 'h1', name: "Sarah Host", role: 'host' },
    { id: 'o1', name: "Mike Organizer", role: 'organizer' }
];

// REVIEWS (Mock)
export const REVIEWS = [
    { id: 'r1', targetId: '1', authorName: "Jenny", avatar: "https://i.pravatar.cc/100?img=1", rating: 5, text: "Absolutely loved the social vibe! Met so many cool people.", date: "2 days ago" },
    { id: 'r2', targetId: '1', authorName: "Mark", avatar: "https://i.pravatar.cc/100?img=2", rating: 4, text: "Great location but a bit noisy at night.", date: "1 week ago" },
    { id: 'r3', targetId: 'e1', authorName: "Alex", avatar: "https://i.pravatar.cc/100?img=3", rating: 5, text: "The cooking class was amazing. Spicy but tasty!", date: "Yesterday" }
];

// EVENTS
let EVENTS = [
    {
        id: 'e1',
        organizerId: 'o1',
        title: "Kerala Cooking Masterclass",
        description: "Learn to make authentic fish curry and appam with a local chef.",
        category: "Food",
        date: "2026-01-20T18:00:00",
        location: "Fort Kochi, near Beach",
        price: 500,
        attendees: 12,
        image: "https://images.unsplash.com/photo-1626776472252-87ed7e5d2634?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["Beginner friendly", "Dinner included"]
    },
    {
        id: 'e2',
        organizerId: 'o1',
        title: "Sunset Yoga by the Backwaters",
        description: "Relax your mind and body as the sun sets over the Vembanad Lake.",
        category: "Wellness",
        date: "2026-01-21T17:30:00",
        location: "Marine Drive",
        price: 0,
        attendees: 25,
        image: "https://images.unsplash.com/photo-1599447332159-dd9f85e197d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["Free", "Bring mat"]
    },
    {
        id: 'e3',
        organizerId: 'o2',
        title: "Digital Nomad Meetup",
        description: "Network with fellow travelers and remote workers. Coffee on the house!",
        category: "Meetup",
        date: "2026-01-22T10:00:00",
        location: "Kashi Art Cafe",
        price: 200,
        attendees: 8,
        image: "https://images.unsplash.com/photo-1565514020128-0a0624bb1296?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["Networking", "Coffee"]
    }
];

const PROPERTIES = [
    {
        id: '1',
        hostId: 'h1',
        name: "Kochi Backpackers",
        city: "Kochi",
        price: 650,
        rating: 4.5,
        reviewsCount: 120,
        vibeTag: "Social",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "The heart of the party in Fort Kochi. Meet travelers from around the world.",
        keywords: ["Near beach", "Bar", "Events"],
        amenities: ["Free Wi-Fi", "AC", "Breakfast", "Lockers"],
        rules: ["No curfew", "18+ only"],
        coordinates: { lat: 9.9644, lng: 76.2423 }
    },
    {
        id: '2',
        hostId: 'h1',
        name: "Fort Heritage Stay",
        city: "Kochi",
        price: 1200,
        rating: 4.8,
        reviewsCount: 45,
        vibeTag: "Quiet",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "A peaceful heritage home for digital nomads and couples.",
        keywords: ["Heritage", "Working space", "Garden"],
        amenities: ["High-speed Wi-Fi", "Private Room", "Garden"],
        rules: ["Quiet hours 10PM", "No Alcohol"],
        coordinates: { lat: 9.9650, lng: 76.2440 }
    },
    {
        id: '3',
        hostId: 'h2',
        name: "The Happy Camper",
        city: "Kochi",
        price: 550,
        rating: 4.2,
        reviewsCount: 89,
        vibeTag: "Chill",
        image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Relaxed vibes by the backwaters. Perfect for reading and yoga.",
        keywords: ["Riverside", "Yoga mats", "Hammocks"],
        amenities: ["Fan", "Community Kitchen", "Library"],
        rules: ["Eco-friendly", "No plastic"],
        coordinates: { lat: 9.9700, lng: 76.2500 }
    },
    {
        id: '4',
        name: "VibeHostel Kochi",
        city: "Kochi",
        price: 800,
        rating: 4.6,
        reviewsCount: 200,
        vibeTag: "Social",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Modern dorms with a vibrant rooftop cafe.",
        keywords: ["Rooftop", "Game room", "Central"],
        amenities: ["AC", "Cafe", "Gym"],
        rules: ["Mixed Dorms", "Group activities"],
        coordinates: { lat: 9.9600, lng: 76.2400 }
    },
    {
        id: '5',
        name: "Seashell Residency",
        city: "Kochi",
        price: 950,
        rating: 4.0,
        reviewsCount: 30,
        vibeTag: "Quiet",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Clean, budget-friendly private rooms near the ferry.",
        keywords: ["Near Ferry", "Private bath", "Clean"],
        amenities: ["AC", "TV", "Room Service"],
        rules: ["Families welcome", "No smoking"],
        coordinates: { lat: 9.9680, lng: 76.2450 }
    }
];

// Mock In-Memory Storage
let bookings = [];
let myEvents = []; // IDs of events joined by current user

// --- PROPERTIES & BOOKINGS ---

export const searchProperties = async ({ city, mood, budgetMin, budgetMax }) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return PROPERTIES.filter(p => {
        if (city && !p.city.toLowerCase().includes(city.toLowerCase())) return false;
        if (mood && p.vibeTag !== mood) return false;
        if (budgetMin !== undefined && p.price < budgetMin) return false;
        if (budgetMax !== undefined && p.price > budgetMax) return false;
        return true;
    }).sort((a, b) => b.rating - a.rating);
};

export const getPropertyById = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return PROPERTIES.find(p => p.id === id);
};

export const createBooking = async (propertyId, userDetails) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const property = PROPERTIES.find(p => p.id === propertyId);
    if (!property) throw new Error("Property not found");

    const newBooking = {
        id: "BK" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        propertyId,
        propertyName: property.name,
        propertyImage: property.image,
        propertyAddress: `${property.city}, Kerala`,
        date: new Date().toISOString(),
        status: 'Confirmed',
        guestName: userDetails.userId || "Guest",
        ...userDetails
    };

    bookings.push(newBooking);
    // Trigger notification simulation here in real backend
    return newBooking;
};

export const getBookings = async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...bookings];
};

export const getBookingsForHost = async (hostId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    // In a real app, we'd filter by host's properties
    // For demo, just return some random bookings
    return [
        { id: 'BK4829', guestName: 'Rahul', date: '2026-01-16', propertyName: 'Kochi Backpackers', status: 'Confirmed' },
        { id: 'BK9123', guestName: 'Anita', date: '2026-01-18', propertyName: 'Kochi Backpackers', status: 'Pending' },
    ];
};

export const getHostProperties = async (hostId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return PROPERTIES.filter(p => p.hostId === 'h1' || !p.hostId); // Return dummy data
};

// --- EVENTS ---

export const getEvents = async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return EVENTS;
};

export const getMyEvents = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return EVENTS.filter(e => myEvents.includes(e.id));
}

export const joinEvent = async (eventId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (!myEvents.includes(eventId)) {
        myEvents.push(eventId);
        // Increment count mock
        const evt = EVENTS.find(e => e.id === eventId);
        if (evt) evt.attendees += 1;
    }
    return true;
};

export const createEvent = async (eventData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newEvent = {
        id: 'e' + Math.random().toString(36).substr(2, 5),
        attendees: 0,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80",
        ...eventData
    };
    EVENTS.unshift(newEvent);
    return newEvent;
};

// --- REVIEWS ---

export const getReviews = async (targetId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return REVIEWS.filter(r => r.targetId === targetId);
};

export const addReview = async (review) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newReview = {
        id: 'r' + Math.random().toString(36).substr(2, 5),
        date: 'Just now',
        ...review
    };
    REVIEWS.unshift(newReview);
    return newReview;
};

// --- NOTIFICATIONS ---

export const getNotifications = async (role) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (role === 'host') {
        return [
            { id: 1, text: "New booking from Rahul for Jan 16.", type: "booking" },
            { id: 2, text: "Jenny left a 5-star review!", type: "review" }
        ];
    } else if (role === 'organizer') {
        return [
            { id: 3, text: "5 people joined 'Kerala Cooking Masterclass' in the last hour.", type: "info" }
        ];
    } else {
        // Traveler
        return [
            { id: 4, text: "Your stay check-in is tomorrow. Remember house rules: No curfew!", type: "info" },
            { id: 5, text: "New event: 'Sunset Yoga' is happening near you.", type: "event" }
        ];
    }
};
