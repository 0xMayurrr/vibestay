import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Calendar, Home } from 'lucide-react';

const BookingSuccess = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
            <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
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
                    Your tropical adventure awaits
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
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>Tropical Beach, Hawaii</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                        <Calendar size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Duration</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>7 Days</div>
                        </div>
                    </div>
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
