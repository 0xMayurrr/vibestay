import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Star, Heart, ArrowLeft, Filter, Navigation } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const API_KEY = 'kq5uSTUgMZBscIAU9tbU';

const Results = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const searchQuery = queryParams.get('query')?.toLowerCase() || '';

    const mapContainer = useRef(null);
    const map = useRef(null);

    const locations = {
        'agra': [78.0181, 27.1767],
        'kochi': [76.2673, 9.9312],
        'goa': [73.8567, 15.4909],
        'munnar': [77.0595, 10.0889],
        'manali': [77.1892, 32.2432],
        'jaipur': [75.7873, 26.9124]
    };

    const results = [
        {
            id: '6968041c226fac2e6145c67c',
            name: 'VibeStay Goa - Beachside',
            location: 'Goa, India',
            address: 'Anjuna Beach Road, North Goa',
            rating: 4.9,
            price: '₹1,499',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            badge: 'MOST POPULAR',
            lng: 73.8567, lat: 15.4909,
            rooms: ['8 Bed Mixed Dorm', '6 Bed Female Dorm', 'Private Suite'],
            amenities: ['Free WiFi', 'AC', 'Beach Access', 'Rooftop Cafe'],
            hostName: 'Ravi Naik',
            description: 'Beachside hostel with vibrant social atmosphere'
        },
        {
            id: '6968041c226fac2e6145c67d',
            name: 'Manali Snow Retreat',
            location: 'Manali, India',
            address: 'Old Manali Road, Himachal Pradesh',
            rating: 4.8,
            price: '₹1,899',
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
            badge: 'MOUNTAIN VIEW',
            lng: 77.1892, lat: 32.2432,
            rooms: ['Mountain View Dorm', 'Private Cabin', 'Shared Room'],
            amenities: ['Heating', 'Mountain View', 'Trekking Guide', 'Bonfire'],
            hostName: 'Priya Sharma',
            description: 'Cozy mountain retreat with stunning Himalayan views'
        },
        {
            id: '6968041c226fac2e6145c67e',
            name: 'Heritage Villa Jaipur',
            location: 'Jaipur, India',
            address: 'Pink City Heritage Area, Rajasthan',
            rating: 4.7,
            price: '₹2,299',
            image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800',
            badge: 'HERITAGE',
            lng: 75.7873, lat: 26.9124,
            rooms: ['Royal Suite', 'Heritage Room', 'Palace View Room'],
            amenities: ['Heritage Architecture', 'Cultural Tours', 'Traditional Food', 'Palace View'],
            hostName: 'Maharaja Singh',
            description: 'Experience royal Rajasthani culture in authentic heritage villa'
        },
        {
            id: '6968041c226fac2e6145c67f',
            name: 'Fort Kochi Homestay',
            location: 'Kochi, India',
            address: 'Fort Kochi Heritage Area, Kerala',
            rating: 4.8,
            price: '₹850',
            image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
            badge: 'CULTURAL',
            lng: 76.2673, lat: 9.9312,
            rooms: ['Traditional Room', 'Backwater View', 'Family Suite'],
            amenities: ['Backwater View', 'Cultural Tours', 'Kerala Cuisine', 'Fishing Trips'],
            hostName: 'Anita Varghese',
            description: 'Authentic Kerala experience with backwater views and local culture'
        },
        {
            id: '6968041c226fac2e6145c680',
            name: 'Munnar Tea Estate Stay',
            location: 'Munnar, India',
            address: 'Tea Garden Hills, Kerala',
            rating: 4.6,
            price: '₹1,100',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
            badge: 'NATURE',
            lng: 77.0595, lat: 10.0889,
            rooms: ['Tea Garden View', 'Hill Station Room', 'Plantation Suite'],
            amenities: ['Tea Plantation Tours', 'Nature Walks', 'Fresh Air', 'Hill Views'],
            hostName: 'Kumar Nair',
            description: 'Peaceful stay amidst lush tea plantations with nature experiences'
        },
        {
            id: '6968041c226fac2e6145c681',
            name: 'Agra Taj View Hostel',
            location: 'Agra, India',
            address: 'Taj Ganj Area, Near Taj Mahal',
            rating: 4.5,
            price: '₹699',
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
            badge: 'TAJ VIEW',
            lng: 78.0181, lat: 27.1767,
            rooms: ['Taj View Dorm', 'Rooftop Room', 'Budget Room'],
            amenities: ['Taj Mahal View', 'Rooftop Cafe', 'Tour Guide', 'Cultural Shows'],
            hostName: 'Amit Gupta',
            description: 'Budget-friendly stay with direct Taj Mahal views and cultural experiences'
        }
    ];

    // Filter results based on search query
    const filteredResults = searchQuery
        ? results.filter(r => r.location.toLowerCase().includes(searchQuery) || r.name.toLowerCase().includes(searchQuery))
        : results;

    useEffect(() => {
        if (map.current) return;

        // Default to national view if no specific city is searched
        let center = [78.9629, 20.5937];
        let zoom = 5;

        for (const loc in locations) {
            if (searchQuery.includes(loc)) {
                center = locations[loc];
                zoom = 12;
                break;
            }
        }

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/voyager/style.json?key=${API_KEY}`,
            center: center,
            zoom: zoom,
            attributionControl: false
        });

        results.forEach(res => {
            const el = document.createElement('div');
            el.className = 'result-marker';
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
            el.style.fontWeight = 'bold';
            el.innerHTML = '🏨';
            el.style.transition = 'transform 0.2s';
            
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'scale(1.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
            });

            const popup = new maplibregl.Popup({ 
                offset: 25, 
                closeButton: true,
                maxWidth: '320px'
            })
                .setHTML(`
                    <div style="padding: 16px; font-family: 'Inter', sans-serif; min-width: 280px;">
                        <img src="${res.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;" />
                        
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                            <h3 style="margin: 0; color: #0C1E3D; font-size: 16px; font-weight: 700;">${res.name}</h3>
                            <div style="display: flex; align-items: center; gap: 4px; background: #f3f4f6; padding: 4px 8px; border-radius: 6px;">
                                <span style="color: #F59E0B; font-size: 14px;">★</span>
                                <span style="font-weight: 600; color: #0C1E3D; font-size: 14px;">${res.rating}</span>
                            </div>
                        </div>
                        
                        <p style="margin: 0 0 8px; color: #6B7280; font-size: 13px; display: flex; align-items: center; gap: 4px;">
                            <span>📍</span> ${res.address}
                        </p>
                        
                        <p style="margin: 0 0 12px; color: #374151; font-size: 13px; line-height: 1.4;">${res.description}</p>
                        
                        <div style="margin-bottom: 12px;">
                            <div style="font-size: 12px; color: #6B7280; margin-bottom: 4px; font-weight: 600;">HOST</div>
                            <div style="font-size: 13px; color: #374151;">${res.hostName}</div>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <div style="font-size: 12px; color: #6B7280; margin-bottom: 4px; font-weight: 600;">ROOMS AVAILABLE</div>
                            <div style="font-size: 13px; color: #374151;">${res.rooms.slice(0, 2).join(', ')}${res.rooms.length > 2 ? '...' : ''}</div>
                        </div>
                        
                        <div style="margin-bottom: 16px;">
                            <div style="font-size: 12px; color: #6B7280; margin-bottom: 4px; font-weight: 600;">AMENITIES</div>
                            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                ${res.amenities.slice(0, 3).map(amenity => 
                                    `<span style="background: #E5F3FF; color: #0C1E3D; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 500;">${amenity}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #E5E7EB;">
                            <div>
                                <span style="font-size: 18px; font-weight: 800; color: #0C1E3D;">${res.price}</span>
                                <span style="font-size: 12px; color: #6B7280;">/night</span>
                            </div>
                            <button onclick="window.location.href='/details/${res.id}'" style="background: #0C1E3D; color: white; padding: 8px 16px; border-radius: 6px; border: none; font-weight: 600; font-size: 12px; cursor: pointer;">View Details</button>
                        </div>
                    </div>
                `);

            new maplibregl.Marker({ element: el })
                .setLngLat([res.lng, res.lat])
                .setPopup(popup)
                .addTo(map.current);
        });

        // Effect for flying to new search
        if (searchQuery) {
            for (const loc in locations) {
                if (searchQuery.includes(loc)) {
                    map.current.flyTo({ center: locations[loc], zoom: 12, speed: 0.8 });
                    break;
                }
            }
        }
    }, [searchQuery]);

    return (
        <div className="web-layout" style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>
            <Navbar />

            <div className="container" style={{ padding: '120px 24px 40px' }}>
                {/* Results Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '32px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', cursor: 'pointer' }} onClick={() => navigate('/home')}>
                            <ArrowLeft size={16} /> Back to explore
                        </div>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: 800 }}>
                            {searchQuery ? `Vibes in ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}` : 'All Stays'}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>We found {filteredResults.length} stays matching your energy.</p>
                    </div>
                </div>

                {/* VISUAL MAP INTEGRATION */}
                <div style={{
                    width: '100%',
                    height: '400px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    marginBottom: '40px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-card)',
                    position: 'relative'
                }}>
                    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
                    <div style={{
                        position: 'absolute', top: '16px', left: '16px',
                        background: 'rgba(255,255,255,0.95)', padding: '10px 20px',
                        borderRadius: '14px', zIndex: 5, display: 'flex',
                        alignItems: 'center', gap: '10px', fontSize: '0.9rem',
                        fontWeight: 700, color: 'var(--primary)',
                        border: '1px solid var(--border)', backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        <Navigation size={18} color="var(--primary)" /> Searching Vibes: {searchQuery || "National"}
                    </div>
                </div>

                {/* Grid Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {filteredResults.map(result => (
                        <div
                            key={result.id}
                            className="card"
                            onClick={() => navigate(`/details/${result.id}`)}
                            style={{ cursor: 'pointer', transition: 'transform 0.3s ease', borderRadius: '24px', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'relative', height: '220px' }}>
                                <img src={result.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={result.name} />
                                {result.badge && (
                                    <div style={{
                                        position: 'absolute', top: '16px', left: '16px',
                                        background: 'var(--secondary)', color: 'var(--brand-navy)',
                                        padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800
                                    }}>
                                        {result.badge}
                                    </div>
                                )}
                                <button style={{
                                    position: 'absolute', top: '16px', right: '16px',
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Heart size={20} color="var(--brand-navy)" />
                                </button>
                            </div>

                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 700 }}>{result.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-main)', padding: '4px 8px', borderRadius: '8px' }}>
                                        <Star size={16} fill="#F59E0B" color="#F59E0B" />
                                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{result.rating}</span>
                                    </div>
                                </div>

                                <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>
                                    <MapPin size={16} /> {result.address}
                                </p>
                                
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px', lineHeight: 1.4 }}>
                                    {result.description}
                                </p>
                                
                                <div style={{ marginBottom: '12px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>Host</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>{result.hostName}</div>
                                </div>
                                
                                <div style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>Amenities</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {result.amenities.slice(0, 3).map((amenity, idx) => (
                                            <span key={idx} style={{ 
                                                background: 'var(--secondary)', 
                                                color: 'var(--brand-navy)', 
                                                padding: '2px 8px', 
                                                borderRadius: '6px', 
                                                fontSize: '0.75rem', 
                                                fontWeight: 600 
                                            }}>
                                                {amenity}
                                            </span>
                                        ))}
                                        {result.amenities.length > 3 && (
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>+{result.amenities.length - 3} more</span>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                                    <div>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{result.price}</span>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/night</span>
                                    </div>
                                    <button className="btn-primary" style={{ padding: '10px 24px', borderRadius: '12px' }}>View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Results;
