import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Navigation, Star, X } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Navbar from '../components/Navbar';

const MapDiscovery = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const navigate = useNavigate();
    const [selectedHotel, setSelectedHotel] = useState(null);

    // MapTiler API Key provided by user
    const API_KEY = 'kq5uSTUgMZBscIAU9tbU';

    // Custom map pins
    const hotels = [
        { id: 1, name: 'VibeStay Agra', price: '₹999', rating: 4.8, lng: 78.0181, lat: 27.1767, img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400' },
        { id: 2, name: 'Taj City Hostel', price: '₹750', rating: 4.5, lng: 78.0300, lat: 27.1650, img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400' },
        { id: 3, name: 'The Riverside Inn', price: '₹1200', rating: 4.9, lng: 78.0100, lat: 27.1700, img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400' }
    ];

    useEffect(() => {
        if (map.current) return; // Only initialize once

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            // Using a soft pastel/voyager style for that "illustrated" travel vibe
            style: `https://api.maptiler.com/maps/voyager/style.json?key=${API_KEY}`,
            center: [78.0181, 27.1767], // Centered on Agra
            zoom: 13,
            attributionControl: false
        });

        // Add markers
        hotels.forEach(hotel => {
            // Create a custom element for the price tag marker
            const el = document.createElement('div');
            el.className = 'custom-marker';
            el.style.backgroundColor = 'white';
            el.style.padding = '6px 12px';
            el.style.borderRadius = '12px';
            el.style.border = '2px solid var(--brand-lime)';
            el.style.fontWeight = '800';
            el.style.fontSize = '0.85rem';
            el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            el.style.cursor = 'pointer';
            el.innerText = hotel.price;

            // Click event for marker
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                setSelectedHotel(hotel);
                map.current.flyTo({
                    center: [hotel.lng, hotel.lat],
                    zoom: 15,
                    essential: true
                });
            });

            new maplibregl.Marker({ element: el })
                .setLngLat([hotel.lng, hotel.lat])
                .addTo(map.current);
        });

        // Click on map to clear selection
        map.current.on('click', () => {
            setSelectedHotel(null);
        });

    }, []);

    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
            <Navbar />

            {/* Map Container */}
            <div ref={mapContainer} style={{ position: 'absolute', inset: 0 }} />

            {/* Overlays */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <div className="container" style={{ position: 'relative', height: '100%' }}>

                    {/* Floating Search Bar */}
                    <div style={{ position: 'absolute', top: '100px', left: '20px', right: '20px', zIndex: 10, pointerEvents: 'auto', maxWidth: '500px' }}>
                        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
                            <Search size={20} color="var(--text-secondary)" />
                            <input
                                placeholder="Search for stays in Agra..."
                                style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)' }}
                            />
                            <div style={{ background: 'var(--secondary)', padding: '8px', borderRadius: '10px' }}>
                                <Navigation size={20} color="var(--primary)" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Floating Info Card */}
                    {selectedHotel && (
                        <div style={{
                            position: 'absolute', bottom: '40px', left: '20px', right: '20px',
                            pointerEvents: 'auto', zIndex: 20, maxWidth: '500px', margin: '0 auto'
                        }}>
                            <div style={{
                                background: 'var(--bg-card)',
                                borderRadius: '24px',
                                padding: '20px',
                                display: 'flex',
                                gap: '20px',
                                boxShadow: 'var(--shadow-card)',
                                animation: 'slideUp 0.3s ease-out',
                                border: '1px solid var(--border)',
                                position: 'relative'
                            }}>
                                <button
                                    onClick={() => setSelectedHotel(null)}
                                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--bg-nav)', borderRadius: '50%', padding: '4px', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
                                >
                                    <X size={16} />
                                </button>

                                <div style={{ width: '100px', height: '100px', borderRadius: '16px', background: 'var(--bg-nav)', backgroundImage: `url(${selectedHotel.img})`, backgroundSize: 'cover', flexShrink: 0 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', paddingRight: '24px' }}>
                                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{selectedHotel.name}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: 'var(--text-main)' }}>
                                            <Star size={16} fill="#F59E0B" color="#F59E0B" /> {selectedHotel.rating}
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>VibeStay Recommended • Managed Stay</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)' }}>{selectedHotel.price}</span>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>/night</span>
                                        </div>
                                        <button onClick={() => navigate(`/details/${selectedHotel.id}`)} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .custom-marker {
                    background-color: var(--bg-card) !important;
                    color: var(--text-main) !important;
                }
                .custom-marker:hover {
                    transform: scale(1.1);
                    transition: transform 0.2s;
                }
            `}</style>
        </div>
    );
};

export default MapDiscovery;
