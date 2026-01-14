const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User, Property, Event } = require('./models');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vibestay';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('DB Connection Error:', err.message);
        process.exit(1);
    }
};

const seedDB = async () => {
    try {
        await connectDB();

        // Clear Existing
        await User.deleteMany({});
        await Property.deleteMany({});
        await Event.deleteMany({});

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt);

        // Seed Users
        const users = await User.insertMany([
            { phone: '9999999901', role: 'traveler', name: 'Arjun Traveler', password },
            { phone: '9999999902', role: 'host', name: 'Sarah Host', password },
            { phone: '9999999903', role: 'organizer', name: 'Mike Organizer', password }
        ]);

        console.log('Users seeded');

        // Seed Properties
        await Property.insertMany([
            { hostId: users[1]._id, name: 'Zostel Kochi', city: 'Kochi', vibe: 'social', price: 800, description: 'Best backpacker vibe in Fort Kochi' },
            { hostId: users[1]._id, name: 'The Hosteller Goa', city: 'Goa', vibe: 'party', price: 1200, description: 'Anjuna beach party hub' },
            { hostId: users[1]._id, name: 'Quiet Garden Stay', city: 'Kochi', vibe: 'quiet', price: 2500, description: 'Peaceful retreat in the city' },
            { hostId: users[1]._id, name: 'Vibe House Calangute', city: 'Goa', vibe: 'social', price: 1500, description: 'Great for digital nomads' },
            { hostId: users[1]._id, name: 'Fort Kochi Heritage', city: 'Kochi', vibe: 'chill', price: 3500, description: 'Luxury heritage experience' }
        ]);

        console.log('Properties seeded');

        // Seed Events
        await Event.insertMany([
            { organizerId: users[2]._id, title: 'Beach Yoga Session', city: 'Goa', date: new Date(Date.now() + 86400000), price: 500 },
            { organizerId: users[2]._id, title: 'Kochi Backwater Tour', city: 'Kochi', date: new Date(Date.now() + 172800000), price: 1500 },
            { organizerId: users[2]._id, title: 'Electronic Night Anjuna', city: 'Goa', date: new Date(Date.now() + 259200000), price: 2000 }
        ]);

        console.log('Events seeded');
        console.log('Database Seeding Complete!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

if (process.argv.includes('--seed')) {
    seedDB();
}

module.exports = connectDB;
