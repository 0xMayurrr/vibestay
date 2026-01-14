import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { ArrowLeft, PlayCircle, MapPin, Calendar, Clock, Award } from 'lucide-react';

const Trips = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');

    const upcomingTrips = [
        {
            id: 1,
            title: 'Weekend at VibeStay Manali',
            date: 'Feb 14 - Feb 16, 2026',
            status: 'Confirmed',
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800'
        }
    ];

    const pastTrips = [
        {
            id: 101,
            title: 'Backpacking in Goa',
            date: 'Dec 10 - Dec 15, 2025',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800'
        }
    ];

    return (
        <div className="web-layout" style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
            <Navbar />

            <div className="container" style={{ padding: '120px 24px 100px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <ArrowLeft size={20} color="var(--text-main)" />
                    </button>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>My Trips</h1>
                </div>

                {/* Gamification Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                    <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Award size={28} color="var(--brand-navy)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>2,450</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>VibePoints</p>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--bg-nav)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MapPin size={28} color="var(--primary)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>12</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Cities Visited</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', marginBottom: '32px' }}>
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        style={{
                            padding: '12px 24px',
                            borderBottom: activeTab === 'upcoming' ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === 'upcoming' ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        style={{
                            padding: '12px 24px',
                            borderBottom: activeTab === 'past' ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === 'past' ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Past Trips
                    </button>
                </div>

                {/* List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '24px', maxWidth: '800px' }}>
                    {(activeTab === 'upcoming' ? upcomingTrips : pastTrips).map(trip => (
                        <div key={trip.id} className="card" style={{ display: 'flex', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px' }}>
                            <div style={{ width: '200px', position: 'relative' }}>
                                <img src={trip.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '24px', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>{trip.title}</h3>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600,
                                        background: trip.status === 'Confirmed' ? '#D1FAE5' : 'var(--bg-nav)',
                                        color: trip.status === 'Confirmed' ? '#065F46' : 'var(--text-secondary)'
                                    }}>
                                        {trip.status}
                                    </span>
                                </div>
                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                    <Calendar size={18} /> {trip.date}
                                </p>
                                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '16px' }}>
                                    <button style={{ color: 'var(--primary)', fontWeight: 600, background: 'transparent', border: 'none', cursor: 'pointer' }}>View Ticket</button>
                                    <button style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Get Directions</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {(activeTab === 'upcoming' && upcomingTrips.length === 0) && <p style={{ color: 'var(--text-secondary)' }}>No upcoming trips. Time to explore!</p>}
                </div>

            </div>
        </div>
    );
};

export default Trips;
