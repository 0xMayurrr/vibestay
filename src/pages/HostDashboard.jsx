import { useNavigate } from 'react-router-dom';
import { Plus, DollarSign, Star, TrendingUp, Home, Calendar, User, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';

const HostDashboard = () => {
    const navigate = useNavigate();

    const properties = [
        { id: 1, name: 'Beachside Villa', location: 'Hawaii, USA', rating: 4.9, bookings: 12, image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400' },
        { id: 2, name: 'Mountain Cabin', location: 'Colorado, USA', rating: 4.7, bookings: 8, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400' }
    ];

    const upcomingBookings = [
        { id: 1, guest: 'Sarah Johnson', property: 'Beachside Villa', date: 'Dec 25 - Dec 30', status: 'Confirmed', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { id: 2, guest: 'Mike Chen', property: 'Mountain Cabin', date: 'Dec 28 - Jan 02', status: 'Pending', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' }
    ];

    return (
        <div className="web-layout" style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
            <Navbar />

            <div className="container" style={{ padding: '120px 24px 40px' }}>

                {/* Header Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '8px' }}>Host Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage your properties and bookings</p>
                    </div>
                    <button
                        onClick={() => navigate('/host/add-property')}
                        className="btn-primary"
                        style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                    >
                        <Plus size={20} /> Add Property
                    </button>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                    <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-nav)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <DollarSign size={32} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Total Earnings</p>
                            <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', lineHeight: 1 }}>$12.4K</h3>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-nav)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Star size={32} fill="var(--primary)" color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Average Rating</p>
                            <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', lineHeight: 1 }}>4.8</h3>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-nav)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrendingUp size={32} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Occupancy Rate</p>
                            <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', lineHeight: 1 }}>84%</h3>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>

                    {/* Left Col: Properties */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                            <Home size={24} /> Your Properties
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {properties.map(prop => (
                                <div key={prop.id} className="card" style={{ display: 'flex', padding: '0', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-card)', borderRadius: '20px' }}>
                                    <div style={{ width: '240px', position: 'relative' }}>
                                        <img src={prop.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>{prop.name}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-main)' }}>
                                                <Star size={18} fill="#F59E0B" color="#F59E0B" /> {prop.rating}
                                            </div>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{prop.location}</p>
                                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{prop.bookings} Active Bookings</span>
                                            <button className="btn-secondary" style={{ padding: '8px 24px', background: 'var(--bg-nav)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '8px' }}>Manage</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Col: Upcoming */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                            <Clock size={24} /> Recent Activity
                        </h2>
                        <div className="card" style={{ padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px' }}>
                            {upcomingBookings.map((booking, i) => (
                                <div key={booking.id} style={{
                                    display: 'flex', alignItems: 'center', gap: '16px',
                                    marginBottom: i !== upcomingBookings.length - 1 ? '24px' : 0,
                                    paddingBottom: i !== upcomingBookings.length - 1 ? '24px' : 0,
                                    borderBottom: i !== upcomingBookings.length - 1 ? '1px solid var(--border)' : 'none'
                                }}>
                                    <img src={booking.img} alt={booking.guest} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-main)' }}>{booking.guest}</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Calendar size={14} /> {booking.date}
                                        </p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{booking.property}</p>
                                    </div>
                                    <span style={{
                                        padding: '6px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700,
                                        background: booking.status === 'Confirmed' ? '#DCFCE7' : 'var(--bg-nav)',
                                        color: booking.status === 'Confirmed' ? '#166534' : 'var(--text-secondary)'
                                    }}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                            <button style={{ width: '100%', padding: '12px', marginTop: '24px', border: '1px solid var(--border)', borderRadius: '12px', background: 'transparent', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer' }}>
                                View All Activity
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HostDashboard;
