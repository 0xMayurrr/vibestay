import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Calendar, Home, Clock, Users, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getEvents } from '../services/mockData';

const BookingSuccess = () => {
    const navigate = useNavigate();
    const [nearbyEvents, setNearbyEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNearbyEvents = async () => {
            try {
                const events = await getEvents();
                // Show first 3 events as "nearby"
                setNearbyEvents(events.slice(0, 3));
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNearbyEvents();
    }, []);

    const formatEventDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
            <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
                <div style={{ animation: 'scaleUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)', marginBottom: '32px' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'var(--bg-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        border: '2px solid var(--border)'
                    }}>
                        <CheckCircle size={64} color="var(--primary)" fill="var(--secondary)" />
                    </div>
                </div>

                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
                    You're Booked!
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '40px' }}>
                    Your adventure awaits
                </p>

                <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', textAlign: 'left', border: '1px solid var(--border)' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Booking ID</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'monospace' }}>
                            #VS2026-{Math.floor(Math.random() * 10000)}
                        </div>
                    </div>

                    <div style={{ height: '1px', background: 'var(--border)', marginBottom: '20px' }} />

                    <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '16px' }}>
                        <MapPin size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Destination</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>Fort Kochi, Kerala</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                        <Calendar size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Check-in</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>Jan 20, 2026</div>
                        </div>
                    </div>
                </div>

                {/* Nearby Events Section */}
                <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', textAlign: 'left', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '16px', textAlign: 'center' }}>
                        🎉 Nearby Events
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'center' }}>
                        Discover local experiences during your stay
                    </p>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                            Loading events...
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {nearbyEvents.map(event => (
                                <div key={event.id} style={{
                                    display: 'flex',
                                    gap: '12px',
                                    padding: '12px',
                                    border: '1px solid var(--border)',
                                    borderRadius: '12px',
                                    background: 'var(--bg-main)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onMouseOut={(e) => e.target.style.borderColor = 'var(--border)'}
                                >
                                    <img 
                                        src={event.image} 
                                        style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                                        alt={event.title}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
                                            {event.title}
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <Clock size={14} color="var(--text-secondary)" />
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {formatEventDate(event.date)}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Users size={14} color="var(--text-secondary)" />
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                    {event.attendees} going
                                                </span>
                                            </div>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>
                                                {event.price === 0 ? 'Free' : `₹${event.price}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => navigate('/map')}
                    style={{
                        width: '100%',
                        background: 'var(--brand-lime)',
                        color: 'var(--brand-navy)',
                        padding: '18px',
                        borderRadius: '20px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 15px rgba(210, 243, 153, 0.3)',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <MapPin size={20} />
                    Explore Nearby
                </button>

                <button
                    onClick={() => navigate('/trips')}
                    style={{
                        width: '100%',
                        background: 'var(--brand-navy)',
                        color: 'white',
                        padding: '18px',
                        borderRadius: '20px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <Calendar size={20} />
                    View My Trips
                </button>

                <button
                    onClick={() => navigate('/home')}
                    style={{
                        width: '100%',
                        background: 'var(--bg-card)',
                        color: 'var(--text-main)',
                        padding: '18px',
                        borderRadius: '20px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        border: '1px solid var(--border)',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <Home size={20} />
                    Back to Home
                </button>
            </div>

            <style>{`
                @keyframes scaleUp {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default BookingSuccess;
