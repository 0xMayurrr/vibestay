import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, X, MapPin, Navigation, Info, Search, Zap } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Navbar from '../components/Navbar';
import { api } from '../services/api';

const MapDiscovery = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markersRef = useRef([]);
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const searchQuery = queryParams.get('query')?.toLowerCase() || '';

    const [loading, setLoading] = useState(false);

    const API_KEY = 'kq5uSTUgMZBscIAU9tbU';

    const locations = {
        'agra': [78.0181, 27.1767],
        'kochi': [76.2673, 9.9312],
        'goa': [73.8567, 15.4909],
        'munnar': [77.0595, 10.0889],
        'manali': [77.1892, 32.2432],
        'jaipur': [75.7873, 26.9124]
    };

    const events = [
        { id: 'e1', title: 'Sunset Yoga', type: 'Experience', price: '₹500', lng: 76.2700, lat: 9.9350, city: 'kochi' },
        { id: 'e2', title: 'Techno Night', type: 'Party', price: '₹1500', lng: 73.7400, lat: 15.5850, city: 'goa' },
        { id: 'e3', title: 'Tea Trail Walk', type: 'Nature', price: 'Free', lng: 77.0650, lat: 10.0910, city: 'munnar' },
        { id: 'e4', title: 'Taj Sunrise Photo Tour', type: 'Cultural', price: '₹1200', lng: 78.0200, lat: 27.1750, city: 'agra' },
        { id: 'e5', title: 'Beach Bonfire', type: 'Social', price: '₹300', lng: 73.7350, lat: 15.5750, city: 'goa' }
    ];

    const hotels = [
        {
            id: '6968041c226fac2e6145c67c',
            name: 'VibeStay Goa - Beachside',
            location: 'Goa, India',
            address: 'Anjuna Beach Road, North Goa',
            rating: 4.9,
            price: 1499,
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            badge: 'MOST POPULAR',
            lng: 73.8567, lat: 15.4909,
            rooms: ['8 Bed Mixed Dorm', '6 Bed Female Dorm', 'Private Suite'],
            amenities: ['Free WiFi', 'AC', 'Beach Access', 'Rooftop Cafe'],
            hostName: 'Ravi Naik',
            description: 'Beachside hostel with vibrant social atmosphere',
            city: 'goa'
        },
        {
            id: '6968041c226fac2e6145c67d',
            name: 'Manali Snow Retreat',
            location: 'Manali, India',
            address: 'Old Manali Road, Himachal Pradesh',
            rating: 4.8,
            price: 1899,
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
            badge: 'MOUNTAIN VIEW',
            lng: 77.1892, lat: 32.2432,
            rooms: ['Mountain View Dorm', 'Private Cabin', 'Shared Room'],
            amenities: ['Heating', 'Mountain View', 'Trekking Guide', 'Bonfire'],
            hostName: 'Priya Sharma',
            description: 'Cozy mountain retreat with stunning Himalayan views',
            city: 'manali'
        },
        {
            id: '6968041c226fac2e6145c67e',
            name: 'Heritage Villa Jaipur',
            location: 'Jaipur, India',
            address: 'Pink City Heritage Area, Rajasthan',
            rating: 4.7,
            price: 2299,
            image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800',
            badge: 'HERITAGE',
            lng: 75.7873, lat: 26.9124,
            rooms: ['Royal Suite', 'Heritage Room', 'Palace View Room'],
            amenities: ['Heritage Architecture', 'Cultural Tours', 'Traditional Food', 'Palace View'],
            hostName: 'Maharaja Singh',
            description: 'Experience royal Rajasthani culture in authentic heritage villa',
            city: 'jaipur'
        },
        {
            id: '6968041c226fac2e6145c67f',
            name: 'Fort Kochi Homestay',
            location: 'Kochi, India',
            address: 'Fort Kochi Heritage Area, Kerala',
            rating: 4.8,
            price: 850,
            image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
            badge: 'CULTURAL',
            lng: 76.2673, lat: 9.9312,
            rooms: ['Traditional Room', 'Backwater View', 'Family Suite'],
            amenities: ['Backwater View', 'Cultural Tours', 'Kerala Cuisine', 'Fishing Trips'],
            hostName: 'Anita Varghese',
            description: 'Authentic Kerala experience with backwater views and local culture',
            city: 'kochi'
        },
        {
            id: '6968041c226fac2e6145c680',
            name: 'Munnar Tea Estate Stay',
            location: 'Munnar, India',
            address: 'Tea Garden Hills, Kerala',
            rating: 4.6,
            price: 1100,
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
            badge: 'NATURE',
            lng: 77.0595, lat: 10.0889,
            rooms: ['Tea Garden View', 'Hill Station Room', 'Plantation Suite'],
            amenities: ['Tea Plantation Tours', 'Nature Walks', 'Fresh Air', 'Hill Views'],
            hostName: 'Kumar Nair',
            description: 'Peaceful stay amidst lush tea plantations with nature experiences',
            city: 'munnar'
        },
        {
            id: '6968041c226fac2e6145c681',
            name: 'Agra Taj View Hostel',
            location: 'Agra, India',
            address: 'Taj Ganj Area, Near Taj Mahal',
            rating: 4.5,
            price: 699,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
            badge: 'TAJ VIEW',
            lng: 78.0181, lat: 27.1767,
            rooms: ['Taj View Dorm', 'Rooftop Room', 'Budget Room'],
            amenities: ['Taj Mahal View', 'Rooftop Cafe', 'Tour Guide', 'Cultural Shows'],
            hostName: 'Amit Gupta',
            description: 'Budget-friendly stay with direct Taj Mahal views and cultural experiences',
            city: 'agra'
        }
    ];

    useEffect(() => {
        if (!mapContainer.current || loading) return;

        // Ask for Location Permission on Entry
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { longitude, latitude } = pos.coords;
                    if (map.current && !searchQuery) {
                        map.current.flyTo({ center: [longitude, latitude], zoom: 12 });
                    }
                },
                (err) => console.log("User denied location")
            );
        }

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/voyager/style.json?key=${API_KEY}`,
            center: [78.9629, 20.5937],
            zoom: 5,
            attributionControl: false
        });

        const addMarkers = () => {
            // Clear existing
            markersRef.current.forEach(m => m.remove());
            markersRef.current = [];

            // Add Hotel Markers Only
            hotels.forEach(hotel => {
                if (!hotel.lng || !hotel.lat) return; // Skip if no coordinates

                const el = document.createElement('div');
                el.className = 'vibe-pin hotel-pin';
                el.innerHTML = `<span>₹${hotel.price}</span>`;

                const popup = new maplibregl.Popup({ 
                    offset: 30, 
                    closeButton: true,
                    maxWidth: '320px'
                })
                    .setHTML(`
                        <div style="padding: 16px; font-family: 'Inter', sans-serif; min-width: 280px;">
                            <img src="${hotel.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;" />
                            
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                                <h3 style="margin: 0; color: #0C1E3D; font-size: 16px; font-weight: 700;">${hotel.name}</h3>
                                <div style="display: flex; align-items: center; gap: 4px; background: #f3f4f6; padding: 4px 8px; border-radius: 6px;">
                                    <span style="color: #F59E0B; font-size: 14px;">⭐</span>
                                    <span style="font-weight: 600; color: #0C1E3D; font-size: 14px;">${hotel.rating}</span>
                                </div>
                            </div>
                            
                            <p style="margin: 0 0 8px; color: #6B7280; font-size: 13px; display: flex; align-items: center; gap: 4px;">
                                <span>📍</span> ${hotel.address}
                            </p>
                            
                            <p style="margin: 0 0 12px; color: #374151; font-size: 13px; line-height: 1.4;">${hotel.description}</p>
                            
                            <div style="margin-bottom: 12px;">
                                <div style="font-size: 12px; color: #6B7280; margin-bottom: 4px; font-weight: 600;">HOST</div>
                                <div style="font-size: 13px; color: #374151;">${hotel.hostName}</div>
                            </div>
                            
                            <div style="margin-bottom: 12px;">
                                <div style="font-size: 12px; color: #6B7280; margin-bottom: 4px; font-weight: 600;">ROOMS AVAILABLE</div>
                                <div style="font-size: 13px; color: #374151;">${hotel.rooms.slice(0, 2).join(', ')}${hotel.rooms.length > 2 ? '...' : ''}</div>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <div style="font-size: 12px; color: #6B7280; margin-bottom: 4px; font-weight: 600;">AMENITIES</div>
                                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                    ${hotel.amenities.slice(0, 3).map(amenity => 
                                        `<span style="background: #E5F3FF; color: #0C1E3D; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 500;">${amenity}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #E5E7EB;">
                                <div>
                                    <span style="font-size: 18px; font-weight: 800; color: #0C1E3D;">₹${hotel.price}</span>
                                    <span style="font-size: 12px; color: #6B7280;">/night</span>
                                </div>
                                <button id="book-btn-${hotel.id}" style="background: #0C1E3D; color: white; padding: 8px 16px; border-radius: 6px; border: none; font-weight: 600; font-size: 12px; cursor: pointer;">Book Now</button>
                            </div>
                        </div>
                    `);

                popup.on('open', () => {
                    const bookBtn = document.getElementById(`book-btn-${hotel.id}`);
                    if (bookBtn) {
                        bookBtn.addEventListener('click', () => {
                            navigate(`/details/${hotel.id}`);
                        });
                    }
                });

                const marker = new maplibregl.Marker({ element: el })
                    .setLngLat([hotel.lng, hotel.lat])
                    .setPopup(popup)
                    .addTo(map.current);

                markersRef.current.push(marker);
            });
        };

        addMarkers();

        if (searchQuery) {
            for (const loc in locations) {
                if (searchQuery.includes(loc)) {
                    map.current.flyTo({ center: locations[loc], zoom: 13, speed: 1.5 });
                    break;
                }
            }
        }

        return () => { if (map.current) map.current.remove(); };
    }, [loading, hotels]);

    // Watch for query changes from URL and animate
    useEffect(() => {
        const handlePopState = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const newQuery = urlParams.get('query')?.toLowerCase() || '';
            if (newQuery && map.current) {
                for (const loc in locations) {
                    if (newQuery.includes(loc)) {
                        map.current.flyTo({
                            center: locations[loc],
                            zoom: 13,
                            speed: 1.2,
                            curve: 1,
                            essential: true
                        });
                        break;
                    }
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Watch for query changes from Navbar & Animate
    useEffect(() => {
        if (!map.current || !searchQuery) return;
        for (const loc in locations) {
            if (searchQuery.includes(loc)) {
                map.current.flyTo({
                    center: locations[loc],
                    zoom: 13,
                    speed: 1.2,
                    curve: 1,
                    essential: true
                });
                break;
            }
        }
    }, [searchQuery]);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🗺️</div>
                    <h2 style={{ color: 'var(--primary)' }}>Loading Vibes...</h2>
                </div>
            </div>
        );
    }

    return (
        <div style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
            <Navbar />
            <div ref={mapContainer} style={{ position: 'fixed', inset: 0, zIndex: 1, background: '#f0f0f0' }} />

            {/* Z-Index fix for overlay items - REMOVED STATUS BAR */}

            <style>{`
                .vibe-pin { 
                    padding: 8px 16px; border-radius: 20px; border: 2px solid white; 
                    font-weight: 800; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    font-family: 'Outfit', sans-serif; transition: all 0.2s;
                }
                .hotel-pin { background: #0C1E3D; color: white; }
                .event-pin { background: #F43F5E; color: white; transform: scale(0.9); }
                .vibe-pin:hover { transform: scale(1.1) translateY(-5px); z-index: 100; }
                .map-card { width: 220px; overflow: hidden; }
                .map-card img { width: 100%; height: 120px; object-fit: cover; }
                .map-card .info { padding: 15px; background: white; }
                .map-card h3 { margin: 0 0 8px; font-size: 1.1rem; color: #0C1E3D; }
                .map-card .row { display: flex; justify-content: space-between; margin-bottom: 15px; }
                .map-card .price { font-weight: 800; color: #10B981; }
                .map-card button { width: 100%; padding: 10px; background: #0C1E3D; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; }
                .maplibregl-popup-content { padding: 0 !important; border-radius: 12px !important; box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important; }
            `}</style>
        </div>
    );
};

export default MapDiscovery;
