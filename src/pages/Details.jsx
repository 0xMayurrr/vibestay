import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Nav from '../components/Navbar';
import { ArrowLeft, MapPin, Star, Share, Heart, Wifi, Coffee, Wind, Monitor, ArrowRight } from 'lucide-react';

const Details = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const images = [
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
        "https://images.unsplash.com/photo-1512918760383-5645371861a7?w=800",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800"
    ];

    const rooms = [
        { id: 1, name: "8 Bed Mixed Dorm", type: "Dorm", price: 699, cap: 8, avail: 4 },
        { id: 2, name: "6 Bed Female Dorm", type: "Dorm", price: 799, cap: 6, avail: 2 },
        { id: 3, name: "Private Suite", type: "Private", price: 2499, cap: 2, avail: 1 },
    ];

    return (
        <div className="web-layout" style={{ background: 'var(--bg-main)' }}>
            <Nav />

            <div className="container" style={{ paddingTop: '24px', paddingBottom: '80px' }}>
                {/* Header Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--primary)' }}>VibeStay Agra</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                            <MapPin size={18} />
                            <span>Taj Ganj, Agra, Uttar Pradesh</span>
                            <span style={{ margin: '0 8px' }}>•</span>
                            <Star size={18} fill="#F59E0B" color="#F59E0B" />
                            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>4.5</span>
                            <span>(1,204 Reviews)</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn-secondary">
                            <Share size={20} style={{ marginRight: '8px' }} /> Share
                        </button>
                        <button className="btn-secondary">
                            <Heart size={20} style={{ marginRight: '8px' }} /> Save
                        </button>
                    </div>
                </div>

                {/* Image Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '200px 200px', gap: '12px', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px' }}>
                    <div style={{ gridColumn: '1 / 2', gridRow: '1 / 3' }}>
                        <img src={images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }}>
                        <img src={images[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
                        <img src={images[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}>
                        <img src={images[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}>
                        <img src={images[4]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>

                {/* Content Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

                    {/* LEFT COLUMN */}
                    <div>
                        {/* About */}
                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{ marginBottom: '16px', color: 'var(--primary)' }}>About this Property</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
                                Located just 1.5 km from the Taj Mahal, VibeStay Agra offers a social atmosphere for travelers from around the world. Featuring a rooftop cafe with a direct view of the Taj, we host daily events, yoga sessions, and city walks. Our dorms are spacious, air-conditioned, and equipped with private lockers.
                            </p>
                        </div>

                        {/* Amenities */}
                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{ marginBottom: '24px', color: 'var(--primary)' }}>Amenities</h2>
                            <div className="grid-cols-4">
                                <Amenity icon={Wifi} label="Free Wifi" />
                                <Amenity icon={Coffee} label="Cafe" />
                                <Amenity icon={Wind} label="AC" />
                                <Amenity icon={Monitor} label="Coworking" />
                            </div>
                        </div>

                        {/* Room Selection */}
                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{ marginBottom: '24px', color: 'var(--primary)' }}>Select Room</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {rooms.map(room => (
                                    <div key={room.id} style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--primary)' }}>{room.name}</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{room.cap} Guests • AC • Ensuite Bathroom</p>
                                            <div style={{ marginTop: '8px', color: '#16A34A', fontSize: '0.8rem', fontWeight: 600 }}>
                                                {room.avail} spots left!
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>₹{room.price}<span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/night</span></div>
                                            <button className="btn-secondary" style={{ padding: '8px 24px' }}>- 0 +</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Location Map */}
                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{ marginBottom: '24px', color: 'var(--primary)' }}>Location</h2>
                            <div style={{
                                height: '300px', width: '100%', borderRadius: '16px', overflow: 'hidden',
                                border: '1px solid var(--border)', position: 'relative'
                            }}>
                                <MapSection apiKey="kq5uSTUgMZBscIAU9tbU" />
                            </div>
                            <p style={{ marginTop: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <MapPin size={16} style={{ display: 'inline', marginRight: '4px' }} />
                                Taj Ganj, Agra, Uttar Pradesh - 1.5km from Taj Mahal
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Sticky Booking) */}
                    <div>
                        <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', position: 'sticky', top: '100px', background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Check-in</p>
                                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>Jan 14, 2026</h4>
                                </div>
                                <div style={{ borderLeft: '1px solid var(--border)' }} />
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Check-out</p>
                                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>Jan 15, 2026</h4>
                                </div>
                            </div>

                            <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--primary)' }}>
                                    <span>Total (1 Night)</span>
                                    <b>₹0</b>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Select rooms to see total</p>
                            </div>

                            <button onClick={() => navigate('/booking-success')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1.1rem', padding: '16px' }}>
                                Continue to Book <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const MapSection = ({ apiKey }) => {
    const mapRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: `https://api.maptiler.com/maps/voyager/style.json?key=${apiKey}`,
            center: [78.0181, 27.1767],
            zoom: 14,
            attributionControl: false,
            interactive: false // Keep it simple for details view
        });

        new maplibregl.Marker({ color: 'red' })
            .setLngLat([78.0181, 27.1767])
            .addTo(map);

        return () => map.remove();
    }, [apiKey]);

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

const Amenity = ({ icon: Icon, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg-card)' }}>
        <Icon size={24} color="var(--secondary)" />
        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{label}</span>
    </div>
);

export default Details;
