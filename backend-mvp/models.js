const mongoose = require('mongoose');

// --- USER MODEL ---
const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ['traveler', 'host', 'organizer'], default: 'traveler' },
    name: { type: String },
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
    description: { type: String }
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

module.exports = {
    User: mongoose.model('User', userSchema),
    Property: mongoose.model('Property', propertySchema),
    Booking: mongoose.model('Booking', bookingSchema),
    Event: mongoose.model('Event', eventSchema)
};
