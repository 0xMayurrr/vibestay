const mongoose = require('mongoose');

// --- USER MODEL ---
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ['traveler', 'host', 'organizer'], default: 'traveler' },
    name: { type: String },
    vibe: { type: String, enum: ['social', 'chill', 'quiet', 'party'] },
    password: { type: String, required: true } // In a real SMS app, this would be OTP
});

// --- PROPERTY MODEL ---
const propertySchema = new mongoose.Schema({
    hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    city: { type: String, required: true },
    vibe: { type: String, enum: ['social', 'chill', 'quiet', 'party'] },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
    lng: { type: Number }, // Longitude for map
    lat: { type: Number }, // Latitude for map
    photos: [{ type: String }], // Array of photo URLs
    amenities: [{ type: String }], // e.g., ['AC', 'WiFi', 'Breakfast']
    rating: { type: Number, default: 4.5 }
});

// --- BOOKING MODEL ---
const bookingSchema = new mongoose.Schema({
    travelerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number }
});

// --- EVENT MODEL ---
const eventSchema = new mongoose.Schema({
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    image: { type: String }
});

// --- REVIEW MODEL ---
const reviewSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5 },
    feltLikeHome: { type: Number, min: 1, max: 5 }, // 1: Hotel, 5: Home
    socialLevel: { type: Number, min: 1, max: 5 }, // 1: Private, 5: Social
    cultureDepth: { type: Number, min: 1, max: 5 }, // 1: Light, 5: Deep
    energyTag: { type: String, enum: ['CALM', 'BALANCED', 'BUZZING'] },
    noiseTag: { type: String, enum: ['VERY_QUIET', 'NORMAL', 'LOUD'] },
    tripType: { type: String, enum: ['SOLO', 'COUPLE', 'FRIENDS', 'FAMILY'] },
    headline: { type: String, maxLength: 120 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model('User', userSchema),
    Property: mongoose.model('Property', propertySchema),
    Booking: mongoose.model('Booking', bookingSchema),
    Event: mongoose.model('Event', eventSchema),
    Review: mongoose.model('Review', reviewSchema)
};
