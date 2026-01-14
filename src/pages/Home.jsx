import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Star, ArrowRight, Heart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const navigate = useNavigate();
    const [showMap, setShowMap] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const mapContainer = useRef(null);
    const map = useRef(null);

    const API_KEY = 'kq5uSTUgMZBscIAU9tbU';

    const locations = {
        'agra': [78.0181, 27.1767],
        'kochi': [76.2673, 9.9312],
        'goa': [73.8567, 15.4909],
        'munnar': [77.0595, 10.0889],
        'manali': [77.1892, 32.2432],
        'jaipur': [75.7873, 26.9124]
    };

    const hotels = [
        {
            id: '1',
            name: 'VibeStay Goa - Beachside',
            location: 'Goa, India',
            price: 1499,
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            lng: 73.8567, lat: 15.4909,
            city: 'goa'
        },
        {
            id: '2',
            name: 'Munnar Tea Estate Stay',
            location: 'Munnar, India',
            price: 1100,
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
            lng: 77.0595, lat: 10.0889,
            city: 'munnar'
        },
        {
            id: '3',
            name: 'Fort Kochi Homestay',
            location: 'Kochi, India',
            price: 850,
            image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
            lng: 76.2673, lat: 9.9312,
            city: 'kochi'
        },
        {
            id: '4',
            name: 'Agra Taj View Hostel',
            location: 'Agra, India',
            price: 699,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
            lng: 78.0181, lat: 27.1767,
            city: 'agra'
        },
        {
            id: '5',
            name: 'Manali Snow Retreat',
            location: 'Manali, India',
            price: 1899,
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
            lng: 77.1892, lat: 32.2432,
            city: 'manali'
        },
        {
            id: '6',
            name: 'Heritage Villa Jaipur',
            location: 'Jaipur, India',
            price: 2299,
            image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800',
            lng: 75.7873, lat: 26.9124,
            city: 'jaipur'
        }
    ];

    const handleSearch = (searchItem) => {
        const query = searchItem.name.toLowerCase();
        setSearchQuery(query);
        setShowMap(true);
        
        // Initialize map if not already done
        setTimeout(() => {
            if (!map.current && mapContainer.current) {
                map.current = new maplibregl.Map({
                    container: mapContainer.current,
                    style: `https://api.maptiler.com/maps/voyager/style.json?key=${API_KEY}`,
                    center: locations[query] || [78.9629, 20.5937],
                    zoom: 12,
                    attributionControl: false
                });

                // Add hotel markers
                const filteredHotels = hotels.filter(hotel => 
                    hotel.city === query || hotel.location.toLowerCase().includes(query)
                );

                filteredHotels.forEach(hotel => {
                    const el = document.createElement('div');
                    el.style.width = '40px';
                    el.style.height = '40px';
                    el.style.borderRadius = '50%';
                    el.style.background = '#0C1E3D';
                    el.style.border = '3px solid white';
                    el.style.boxShadow = '0 0 15px rgba(0,0,0,0.3)';
                    el.style.cursor = 'pointer';
                    el.style.display = 'flex';
                    el.style.alignItems = 'center';
                    el.style.justifyContent = 'center';
                    el.style.color = 'white';
                    el.style.fontSize = '18px';
                    el.innerHTML = '🏨';

                    const popup = new maplibregl.Popup({ offset: 25, closeButton: true })
                        .setHTML(`
                            <div style="padding: 16px; min-width: 250px;">
                                <img src="${hotel.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;" />
                                <h3 style="margin: 0 0 8px; color: #0C1E3D; font-size: 16px;">${hotel.name}</h3>
                                <p style="margin: 0 0 8px; color: #6B7280; font-size: 13px;">${hotel.location}</p>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                    <span style="font-size: 18px; font-weight: 800; color: #0C1E3D;">₹${hotel.price}</span>
                                    <span style="color: #F59E0B;">⭐ 4.8</span>
                                </div>
                                <button onclick="window.location.href='/details/${hotel.id}'" style="width: 100%; background: #0C1E3D; color: white; padding: 10px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Book Now</button>
                            </div>
                        `);

                    new maplibregl.Marker({ element: el })
                        .setLngLat([hotel.lng, hotel.lat])
                        .setPopup(popup)
                        .addTo(map.current);
                });
            } else if (map.current) {
                // Fly to location if map exists
                map.current.flyTo({ 
                    center: locations[query] || [78.9629, 20.5937], 
                    zoom: 12 
                });
            }
        }, 100);
    };

    const destinations = [
        { id: 1, name: 'VibeStay Agra', loc: 'Agra, India', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800', price: '₹999', tag: 'Trending' },
        { id: 2, name: 'VibeStay Manali', loc: 'Manali, India', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', price: '₹1299', tag: 'Snow Season' },
        { id: 3, name: 'VibeStay Jaipur', loc: 'Jaipur, India', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800', price: '₹899', tag: 'Culture' },
        { id: 4, name: 'VibeStay Kerala', loc: 'Munnar, India', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', price: '₹1100', tag: 'Nature' }
    ];

    const experiences = [
        { id: 1, title: 'Taj Mahal at Sunrise', duration: '3 Hours', price: '₹1500', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800' },
        { id: 2, title: 'Street Food Walk', duration: '2 Hours', price: '₹800', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800' },
        { id: 3, title: 'Yoga by the River', duration: '1.5 Hours', price: '₹400', img: 'https://images.unsplash.com/photo-1544367563-12123d896889?w=800' }
    ];


    return (
        <div className="web-layout" style={{ background: 'var(--bg-main)' }}>
            <Navbar />

            {/* Hero Section */}
            <div style={{ position: 'relative', height: '600px', width: '100%' }}>
                <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)' }} />

                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center' }}>
                    <div className="animate-slide-up">
                        <h1 style={{ fontSize: '4.5rem', marginBottom: '16px', lineHeight: 1.1, color: 'white', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                            Live the <span style={{ color: 'var(--secondary)' }}>Vibe.</span>
                        </h1>
                        <p style={{ fontSize: '1.4rem', fontWeight: 500, maxWidth: '750px', margin: '0 auto 40px', opacity: 0.95, color: 'white' }}>
                            Discover social hostels, curated trips, and local experiences across the globe.
                        </p>
                    </div>
                </div>
            </div>

            {/* Featured Stays */}
            <div className="container" style={{ padding: '80px 24px' }}>
                {/* Inline Map Section */}
                {showMap && (
                    <div style={{ marginBottom: '80px' }}>
                        <div style={{ 
                            background: 'var(--bg-card)', 
                            borderRadius: '24px', 
                            overflow: 'hidden',
                            border: '1px solid var(--border)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--border)' }}>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '8px' }}>
                                    Hotels in {searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                                    Click on hotel markers to view details and book
                                </p>
                            </div>
                            <div 
                                ref={mapContainer} 
                                style={{ 
                                    width: '100%', 
                                    height: '500px',
                                    background: '#f0f0f0'
                                }} 
                            />
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--primary)' }}>Trending Destinations</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Book early to get the best spots for the season.</p>
                    </div>
                </div>

                <div className="grid-cols-4">
                    {destinations.map(d => (
                        <div key={d.id} className="card" onClick={() => navigate(`/details/${d.id}`)} style={{ cursor: 'pointer', border: 'none', transition: 'transform 0.2s' }}>
                            <div style={{ height: '280px', position: 'relative' }}>
                                <img src={d.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--secondary)', color: 'var(--text-inverse)', padding: '6px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                                    {d.tag.toUpperCase()}
                                </div>
                                <button style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', cursor: 'pointer' }}>
                                    <Heart size={18} color="var(--brand-navy)" />
                                </button>
                            </div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{d.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: 'var(--primary)' }}>
                                        <Star size={16} fill="#F59E0B" color="#F59E0B" /> 4.8
                                    </div>
                                </div>
                                <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                    <MapPin size={16} /> {d.loc}
                                </p>
                                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>From </span>
                                        <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>{d.price}</span>
                                    </div>
                                    <button className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>View</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experiences / Packages */}
            <div style={{ background: 'var(--bg-card)', padding: '80px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ padding: '0 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--primary)' }}>Curated Experiences</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Join local events and group trips.</p>
                        </div>
                        <button className="btn-secondary" onClick={() => navigate('/map')}>
                            <MapPin size={20} style={{ marginRight: '8px' }} /> Explore All
                        </button>
                    </div>

                    <div className="grid-cols-3">
                        {experiences.map(exp => (
                            <div key={exp.id} className="card" style={{ display: 'flex', border: '1px solid var(--border)', background: 'var(--bg-main)' }}>
                                <div style={{ width: '120px', position: 'relative' }}>
                                    <img src={exp.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '20px', flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--primary)' }}>{exp.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{exp.duration} • Guided Tour</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{exp.price}</span>
                                        <button style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>Book</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gamification / Membership Teaser */}
            <div className="container" style={{ padding: '80px 24px' }}>
                <div style={{ background: 'var(--brand-navy)', borderRadius: '32px', padding: '48px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '99px', marginBottom: '16px', backdropFilter: 'blur(4px)' }}>
                            <Star size={18} color="var(--brand-lime)" />
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>VibeStay Pass</span>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'white' }}>Travel More. Earn More.</h2>
                        <p style={{ opacity: 0.9, marginBottom: '32px', fontSize: '1.1rem' }}>
                            Join our community to earn VibePoints on every booking. Unlock priority access, free breakfasts, and exclusive local events.
                        </p>
                        <button className="btn-primary" style={{ background: 'var(--brand-lime)', color: 'var(--brand-navy)' }}>Join For Free</button>
                    </div>

                    {/* Abstract shapes/image */}
                    <div style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, var(--brand-lime) 0%, transparent 70%)', position: 'absolute', right: '-100px', top: '-100px', opacity: 0.1 }} />
                    <Star size={300} color="white" style={{ position: 'absolute', right: '40px', opacity: 0.05, transform: 'rotate(-15deg)' }} />
                </div>
            </div>

        </div>
    );
};

export default Home;
