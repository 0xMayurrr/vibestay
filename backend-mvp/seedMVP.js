// seedMVP.js - Run: node seedMVP.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User, Property, Booking, Event, Review } = require('./models'); // Your models

mongoose.connect('mongodb://localhost:27017/vibestay-mvp');

const seedData = async () => {
    console.log('🧹 Clearing old data...');
    await User.deleteMany({});
    await Property.deleteMany({});
    await Booking.deleteMany({});
    await Event.deleteMany({});
    await Review.deleteMany({});

    console.log('👥 Creating USERS...');

    // 8 REALISTIC USERS
    const users = await User.insertMany([
        // TRAVELERS (5)
        {
            email: 'priya@test.com',
            password: await bcrypt.hash('123456', 10),
            name: 'Priya Sharma',
            role: 'traveler',
            vibe: 'social',
            phone: '+91 9876543210'
        },
        {
            email: 'rahul@test.com',
            password: await bcrypt.hash('123456', 10),
            name: 'Rahul Menon',
            role: 'traveler',
            vibe: 'chill',
            phone: '+91 9876543211'
        },
        {
            email: 'neha.singh@test.com',
            password: await bcrypt.hash('123456', 10),
            name: 'Neha Singh',
            role: 'traveler',
            vibe: 'quiet',
            phone: '+91 9876543212'
        },

        // HOSTS (2)
        {
            email: 'kochi.host@test.com',
            password: await bcrypt.hash('123456', 10),
            name: 'Anita Varghese',
            role: 'host',
            phone: '+91 9845678901'
        },
        {
            email: 'goa.host@test.com',
            password: await bcrypt.hash('123456', 10),
            name: 'Ravi Naik',
            role: 'host',
            phone: '+91 9823456789'
        },

        // ORGANIZER (1)
        {
            email: 'kerala.events@test.com',
            password: await bcrypt.hash('123456', 10),
            name: 'Kerala Culture Hub',
            role: 'organizer',
            phone: '+91 9998887776'
        }
    ]);

    console.log('🏨 Creating PROPERTIES...');

    // 12 REALISTIC PROPERTIES
    const properties = await Property.insertMany([
        // KOCHI (6)
        {
            hostId: users[3]._id, // Anita
            name: 'Fort Kochi Homestay',
            city: 'Kochi',
            vibe: 'social',
            price: 850,
            lng: 76.2673,
            lat: 9.9312,
            image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600',
            photos: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600'],
            amenities: ['AC', 'WiFi', 'Breakfast', 'Common Area'],
            rating: 4.8
        },
        {
            hostId: users[3]._id,
            name: 'Kochi Calm Nest',
            city: 'Kochi',
            vibe: 'chill',
            price: 650,
            lng: 76.2600,
            lat: 9.9400,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600',
            photos: ['https://images.unsplash.com/photo-1548013146-72479768bada?w=600'],
            amenities: ['Fan', 'WiFi', 'Tea/Coffee'],
            rating: 4.5
        },
        {
            hostId: users[3]._id,
            name: 'Kashi Art Hostel',
            city: 'Kochi',
            vibe: 'social',
            price: 750,
            lng: 76.2650,
            lat: 9.9350,
            image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
            photos: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600'],
            rating: 4.6
        },

        // GOA (4)
        {
            hostId: users[4]._id, // Ravi
            name: 'Anjuna Beach Pad',
            city: 'Goa',
            vibe: 'social',
            price: 1200,
            lng: 73.7431,
            lat: 15.5804,
            image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
            photos: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600'],
            rating: 4.9
        },
        {
            hostId: users[4]._id,
            name: 'Palolem Quiet Stay',
            city: 'Goa',
            vibe: 'quiet',
            price: 900,
            lng: 73.9800,
            lat: 15.0100,
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
            photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600'],
            rating: 4.7
        },

        // MUNNAR (2)
        {
            hostId: users[4]._id,
            name: 'Munnar Tea Cottage',
            city: 'Munnar',
            vibe: 'chill',
            price: 1100,
            lng: 77.0595,
            lat: 10.0889,
            image: 'https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?w=600',
            photos: ['https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?w=600'],
            rating: 4.8
        }
    ]);

    console.log('📅 Creating BOOKINGS...');

    // 8 REALISTIC BOOKINGS
    await Booking.insertMany([
        {
            travelerId: users[0]._id, // Priya
            propertyId: properties[0]._id, // Fort Kochi
            checkIn: new Date('2026-01-20'),
            checkOut: new Date('2026-01-23'),
            totalPrice: 2550, // 850 x 3 nights
            status: 'confirmed'
        },
        {
            travelerId: users[1]._id, // Rahul
            propertyId: properties[1]._id, // Kochi Calm
            checkIn: new Date('2026-01-22'),
            checkOut: new Date('2026-01-25'),
            totalPrice: 1950,
            status: 'pending'
        },
        {
            travelerId: users[2]._id, // Neha
            propertyId: properties[3]._id, // Anjuna Beach
            checkIn: new Date('2026-01-25'),
            checkOut: new Date('2026-01-28'),
            totalPrice: 3600,
            status: 'confirmed'
        }
    ]);

    console.log('🎉 Creating EVENTS...');

    // 10 REALISTIC EVENTS
    await Event.insertMany([
        // KOCHI EVENTS
        {
            organizerId: users[5]._id,
            title: 'Kerala Sadya Cooking Class',
            city: 'Kochi',
            date: new Date('2026-01-20T19:00:00'),
            price: 250
        },
        {
            organizerId: users[5]._id,
            title: 'Fort Kochi Sunset Walk',
            city: 'Kochi',
            date: new Date('2026-01-21T17:30:00'),
            price: 150
        },
        {
            organizerId: users[5]._id,
            title: 'Kathakali Dance Night',
            city: 'Kochi',
            date: new Date('2026-01-22T20:00:00'),
            price: 400
        },

        // GOA EVENTS
        {
            organizerId: users[5]._id,
            title: 'Goa Beach Yoga',
            city: 'Goa',
            date: new Date('2026-01-25T06:30:00'),
            price: 200
        },
        {
            organizerId: users[5]._id,
            title: 'Anjuna Flea Market Tour',
            city: 'Goa',
            date: new Date('2026-01-26T16:00:00'),
            price: 100
        },

        // MUNNAR
        {
            organizerId: users[5]._id,
            title: 'Tea Plantation Trek',
            city: 'Munnar',
            date: new Date('2026-01-27T07:00:00'),
            price: 350
        }
    ]);

    console.log('📸 Creating EXPERIENCE SNAPSHOTS...');
    await Review.insertMany([
        {
            propertyId: properties[0]._id, // Fort Kochi
            authorId: users[0]._id,
            rating: 5,
            feltLikeHome: 5,
            socialLevel: 4,
            cultureDepth: 5,
            energyTag: 'CALM',
            noiseTag: 'VERY_QUIET',
            tripType: 'FRIENDS',
            headline: "Felt like staying with local cousins in Kochi!"
        },
        {
            propertyId: properties[0]._id,
            authorId: users[1]._id,
            rating: 4,
            feltLikeHome: 4,
            socialLevel: 5,
            cultureDepth: 4,
            energyTag: 'BALANCED',
            noiseTag: 'NORMAL',
            tripType: 'SOLO',
            headline: "Best social vibe in Fort Kochi, definitely immersive."
        },
        {
            propertyId: properties[3]._id, // Anjuna Beach Pad
            authorId: users[2]._id,
            rating: 5,
            feltLikeHome: 2,
            socialLevel: 5,
            cultureDepth: 1,
            energyTag: 'BUZZING',
            noiseTag: 'LOUD',
            tripType: 'FRIENDS',
            headline: "Pure party vibe! Not exactly a home, but a total blast."
        }
    ]);

    console.log('✅ MVP DATABASE READY!');
    console.log('📊 Data Summary:');
    console.log(`   Properties: ${properties.length}`);
    console.log(`   Bookings: 3`);
    console.log(`   Events: 6`);
    console.log(`   Snapshots: 3`);
    process.exit(0);
};

seedData().catch(console.error);