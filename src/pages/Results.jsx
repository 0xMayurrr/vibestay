import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Heart, ArrowLeft, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';

const Results = () => {
    const navigate = useNavigate();

    const results = [
        {
            id: 1,
            name: 'VibeStay Goa - Beachside',
            location: 'Goa, India',
            rating: 4.9,
            reviews: 120,
            price: '₹1,499',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            badge: 'MOST POPULAR'
        },
        {
            id: 2,
            name: 'Manali Snow Retreat',
            location: 'Manali, India',
            rating: 4.8,
            reviews: 89,
            price: '₹1,899',
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
            badge: 'MOUNTAIN VIEW'
        },
        {
            id: 3,
            name: 'Heritage Villa Jaipur',
            location: 'Jaipur, India',
            rating: 4.7,
            reviews: 64,
            price: '₹2,299',
            image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800',
            badge: ''
        },
        {
            id: 4,
            name: 'Ooty Tea Garden Stay',
            location: 'Ooty, India',
            rating: 4.6,
            reviews: 42,
            price: '₹1,199',
            image: 'https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?w=800',
            badge: 'NATURE PICK'
        }
    ];

    return (
        <div className="web-layout" style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
            <Navbar />

            <div className="container" style={{ padding: '40px 24px' }}>
                {/* Results Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', cursor: 'pointer' }} onClick={() => navigate('/home')}>
                            <ArrowLeft size={16} /> Back to explore
                        </div>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Stays in India</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Showing {results.length} verified social stays</p>
                    </div>

                    <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Filter size={20} /> Filters
                    </button>
                </div>

                {/* Grid Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {results.map(result => (
                        <div
                            key={result.id}
                            className="card"
                            onClick={() => navigate(`/details/${result.id}`)}
                            style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ position: 'relative', height: '240px' }}>
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
                                    <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>{result.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-main)', padding: '4px 8px', borderRadius: '8px' }}>
                                        <Star size={16} fill="#F59E0B" color="#F59E0B" />
                                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{result.rating}</span>
                                    </div>
                                </div>

                                <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                                    <MapPin size={16} /> {result.location}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                                    <div>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{result.price}</span>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}> / night</span>
                                    </div>
                                    <button className="btn-primary" style={{ padding: '10px 20px' }}>Select</button>
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
