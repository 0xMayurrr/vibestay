import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Star, Plus, Bell, MapPin, Clock } from 'lucide-react';
import { getEvents, getNotifications } from '../services/mockData';
import { useAuth } from '../services/AuthContext';
import Navbar from '../components/Navbar';

const OrganizerDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const e = await getEvents();
            const n = await getNotifications('organizer');
            setEvents(e.filter((_, i) => i < 3));
            setNotifications(n);
        };
        fetchData();
    }, []);

    return (
        <div className="web-layout" style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
            <Navbar />

            <div className="container" style={{ padding: '120px 24px 40px' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '8px' }}>Organizer Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage your events and attendees</p>
                    </div>
                    <button
                        onClick={() => navigate('/organizer/create-event')}
                        className="btn-primary"
                    >
                        <Plus size={20} style={{ marginRight: '8px' }} /> Create New Event
                    </button>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                    <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-nav)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={32} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Total Attendees</p>
                            <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', lineHeight: 1 }}>1,240</h3>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-nav)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Star size={32} fill="var(--primary)" color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Event Rating</p>
                            <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', lineHeight: 1 }}>4.9</h3>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-nav)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Calendar size={32} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Active Events</p>
                            <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', lineHeight: 1 }}>{events.length}</h3>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>

                    {/* Left Col: Events List */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                            <Calendar size={24} /> Your Upcoming Events
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {events.map(e => (
                                <div key={e.id} className="card" style={{ display: 'flex', padding: '0', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-card)', borderRadius: '20px' }}>
                                    <div style={{ width: '240px', position: 'relative' }}>
                                        <img src={e.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--bg-card)', color: 'var(--text-main)', padding: '4px 8px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                                            {e.category}
                                        </div>
                                    </div>
                                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>{e.title}</h3>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                                                {e.price === 0 ? 'Free' : `₹${e.price}`}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.95rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Calendar size={16} /> {new Date(e.date).toLocaleDateString()}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Clock size={16} /> {new Date(e.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', gap: '12px' }}>
                                            <button className="btn-secondary" style={{ flex: 1, textAlign: 'center', background: 'var(--bg-nav)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '8px' }}>Manage Event</button>
                                            <button style={{ flex: 1, padding: '10px', border: '1px solid var(--border)', borderRadius: '8px', fontWeight: 600, background: 'var(--bg-card)', color: 'var(--text-main)', cursor: 'pointer' }}>
                                                View Attendees ({e.attendees})
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Col: Notifications */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                            <Bell size={24} /> Recent Alerts
                        </h2>
                        <div className="card" style={{ padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px' }}>
                            {notifications.length > 0 ? notifications.map((n, i) => (
                                <div key={n.id} style={{
                                    padding: '16px',
                                    borderBottom: i !== notifications.length - 1 ? '1px solid var(--border)' : 'none',
                                    display: 'flex', gap: '12px', alignItems: 'start'
                                }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', marginTop: '8px' }} />
                                    <div>
                                        <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--text-main)' }}>{n.text}</p>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>2 hours ago</span>
                                    </div>
                                </div>
                            )) : <p style={{ padding: '16px', color: 'var(--text-secondary)' }}>No new notifications.</p>}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default OrganizerDashboard;
