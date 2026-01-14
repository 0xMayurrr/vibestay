import { Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();

    const getVibeColor = (vibe) => {
        if (vibe === 'Chill') return 'var(--vibe-chill)';
        if (vibe === 'Social') return 'var(--vibe-social)';
        return 'var(--vibe-quiet)';
    };

    return (
        <div
            className="card fade-in"
            onClick={() => navigate(`/details/${property.id}`)}
            style={{ cursor: 'pointer', marginBottom: '20px' }}
        >
            <div style={{ position: 'relative', height: '180px' }}>
                <img
                    src={property.image}
                    alt={property.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'var(--bg-card)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: getVibeColor(property.vibeTag),
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid var(--border)'
                }}>
                    {property.vibeTag}
                </div>
            </div>

            <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.2rem', lineHeight: 1.3, flex: 1 }}>{property.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--primary-light)', padding: '4px 8px', borderRadius: '8px' }}>
                        <Star size={14} fill="var(--primary)" color="var(--primary)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>{property.rating}</span>
                    </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                    <MapPin size={14} /> {property.city}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {property.keywords.slice(0, 2).map((k, i) => (
                        <span key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', padding: '4px 8px', borderRadius: '4px' }}>
                            {k}
                        </span>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                    <div>
                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>₹{property.price}</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}> / night</span>
                    </div>
                    <button style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>View Details</button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
