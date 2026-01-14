const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Property, Booking, Event } = require('./models');

const JWT_SECRET = process.env.JWT_SECRET || 'vibestay_secret_2026';

// --- MIDDLEWARE ---
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) { res.status(400).json({ msg: 'Token is not valid' }); }
};

const checkRole = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ msg: 'Access denied: Insufficient permissions' });
    next();
};

// --- AUTH ENDPOINTS ---
router.post('/auth/signup', async (req, res) => {
    const { phone, role, name, password } = req.body;
    try {
        let user = await User.findOne({ phone });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ phone, role, name, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name, role, phone } });
    } catch (err) { res.status(500).send('Server error'); }
});

router.post('/auth/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, role: user.role, phone } });
    } catch (err) { res.status(500).send('Server error'); }
});

// --- STAYS ENDPOINTS ---
router.get('/stays', async (req, res) => {
    const { city, vibe, price } = req.query;
    let query = {};
    if (city) query.city = new RegExp(city, 'i');
    if (vibe) query.vibe = vibe;
    if (price) query.price = { $lte: price };

    try {
        const stays = await Property.find(query);
        res.json(stays);
    } catch (err) { res.status(500).send('Server error'); }
});

router.post('/stays', [auth, checkRole('host')], async (req, res) => {
    try {
        const newStay = new Property({ ...req.body, hostId: req.user.id });
        const stay = await newStay.save();
        res.json(stay);
    } catch (err) { res.status(500).send('Server error'); }
});

// --- BOOKINGS ENDPOINTS ---
router.post('/bookings', auth, async (req, res) => {
    try {
        const newBooking = new Booking({ ...req.body, travelerId: req.user.id });
        const booking = await newBooking.save();
        res.json(booking);
    } catch (err) { res.status(500).send('Server error'); }
});

router.get('/bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ travelerId: req.user.id }).populate('propertyId');
        res.json(bookings);
    } catch (err) { res.status(500).send('Server error'); }
});

// --- EVENTS ENDPOINTS ---
router.get('/events', async (req, res) => {
    const { city } = req.query;
    let query = {};
    if (city) query.city = new RegExp(city, 'i');
    try {
        const events = await Event.find(query);
        res.json(events);
    } catch (err) { res.status(500).send('Server error'); }
});

router.post('/events', [auth, checkRole('organizer')], async (req, res) => {
    try {
        const newEvent = new Event({ ...req.body, organizerId: req.user.id });
        const event = await newEvent.save();
        res.json(event);
    } catch (err) { res.status(500).send('Server error'); }
});

// --- AI ENDPOINTS ---
router.post('/ai/travel-buddy', async (req, res) => {
    const { query } = req.body;
    // Mock Travel Buddy Responses
    const response = {
        speechText: `Hey! VibeStay Buddy here. You asked about "${query}". Based on your vibe, I'd suggest checking out the social hostels in Kochi or the beach yoga events in Goa. How can I help you book?`,
        action: "NONE"
    };
    res.json(response);
});

module.exports = router;
