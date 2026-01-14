import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bookmark, MapPin, Calendar, Users, Lightbulb, Filter, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import { api } from '../services/api';

const Community = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');
    const [savedItems, setSavedItems] = useState([]);
    const [storyCards, setStoryCards] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch real data from backend
    useEffect(() => {
        const fetchCommunityData = async () => {
            try {
                const reviews = await api.getCommunityStories();

                // Transform reviews into story cards
                const transformedStories = reviews.map(review => ({
                    id: review._id,
                    type: 'stay',
                    propertyId: review.propertyId?._id,
                    propertyName: review.propertyId?.name || 'Unknown Property',
                    city: review.propertyId?.city || 'Unknown City',
                    image: review.propertyId?.image || 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600',
                    headline: review.headline || 'Great stay!',
                    vibes: getVibeTagsFromReview(review),
                    author: review.authorId?.name?.split(' ')[0] || 'Guest',
                    authorType: 'guest',
                    rating: review.rating || 4.5
                }));

                // Add some mock event and tip cards for now
                const mockEvents = [
                    {
                        id: 'e1',
                        type: 'event',
                        eventId: 'evt1',
                        title: 'Sunset Yoga & Beach Bonfire',
                        category: 'Wellness',
                        city: 'Goa',
                        nearProperty: 'Anjuna Beach Pad',
                        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
                        quote: 'Best way to end the day - met amazing people!',
                        attendee: 'Maya'
                    }
                ];

                const mockTips = [
                    {
                        id: 't1',
                        type: 'tip',
                        propertyId: '2',
                        propertyName: 'Munnar Tea Hills',
                        city: 'Munnar',
                        tip: 'Book the sunrise trek in advance - it fills up fast and the views are absolutely worth waking up at 4am',
                        goodFor: ['Nature Lovers', 'Early Birds'],
                        author: 'Arjun'
                    }
                ];

                setStoryCards([...transformedStories, ...mockEvents, ...mockTips]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching community data:', error);
                setLoading(false);
            }
        };

        fetchCommunityData();
    }, []);

    const getVibeTagsFromReview = (review) => {
        const tags = [];
        if (review.socialLevel >= 4) tags.push('Social');
        if (review.feltLikeHome >= 4) tags.push('Homey');
        if (review.cultureDepth >= 4) tags.push('Cultural');
        if (review.energyTag) tags.push(review.energyTag);
        return tags.slice(0, 2); // Max 2 tags
    };

    const forYouCards = storyCards.slice(0, 3);

    const filteredCards = activeFilter === 'All'
        ? storyCards
        : storyCards.filter(card => {
            if (activeFilter === 'Stays') return card.type === 'stay';
            if (activeFilter === 'Events') return card.type === 'event';
            if (activeFilter === 'Tips') return card.type === 'tip';
            return true;
        });

    const handleSave = (cardId) => {
        if (savedItems.includes(cardId)) {
            setSavedItems(savedItems.filter(id => id !== cardId));
        } else {
            setSavedItems([...savedItems, cardId]);
        }
    };

    const StayStoryCard = ({ card }) => (
        <div
            className="card story-card"
            onClick={() => navigate(`/details/${card.propertyId}`)}
            style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        >
            <div style={{ position: 'relative', height: '240px' }}>
                <img src={card.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={card.propertyName} />
                <button
                    onClick={(e) => { e.stopPropagation(); handleSave(card.id); }}
                    style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                        width: '40px', height: '40px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: 'none', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    className="save-btn"
                >
                    <Heart size={20} fill={savedItems.includes(card.id) ? '#F43F5E' : 'none'} color={savedItems.includes(card.id) ? '#F43F5E' : '#0C1E3D'} />
                </button>
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {card.vibes.map(vibe => (
                        <span key={vibe} style={{
                            fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px',
                            background: 'var(--secondary)', color: 'var(--brand-navy)',
                            borderRadius: '12px', textTransform: 'uppercase'
                        }}>
                            {vibe}
                        </span>
                    ))}
                </div>
                <p style={{
                    fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.5,
                    color: 'var(--text-main)', marginBottom: '16px', fontWeight: 600
                }}>
                    "{card.headline}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--primary)' }}>{card.propertyName}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={14} /> {card.city}
                        </p>
                    </div>
                    <span style={{
                        fontSize: '0.75rem', color: 'var(--text-secondary)',
                        background: 'var(--bg-main)', padding: '4px 10px', borderRadius: '8px'
                    }}>
                        From {card.authorType} {card.author}
                    </span>
                </div>
            </div>
        </div>
    );

    const EventCard = ({ card }) => (
        <div
            className="card story-card"
            style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        >
            <div style={{ position: 'relative', height: '200px' }}>
                <img src={card.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={card.title} />
                <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: '#F43F5E', color: 'white', padding: '6px 14px',
                    borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800
                }}>
                    {card.category}
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); handleSave(card.id); }}
                    style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                        width: '40px', height: '40px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: 'none', cursor: 'pointer'
                    }}
                >
                    <Bookmark size={20} fill={savedItems.includes(card.id) ? '#0C1E3D' : 'none'} color="#0C1E3D" />
                </button>
            </div>
            <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--primary)' }}>{card.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> Hosted near {card.nearProperty} in {card.city}
                </p>
                <p style={{
                    fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-main)',
                    padding: '12px', background: 'var(--bg-main)', borderRadius: '8px',
                    borderLeft: '3px solid var(--secondary)'
                }}>
                    "{card.quote}"
                    <span style={{ display: 'block', marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'normal' }}>
                        — {card.attendee}
                    </span>
                </p>
            </div>
        </div>
    );

    const TipCard = ({ card }) => (
        <div
            className="card story-card"
            onClick={() => navigate(`/details/${card.propertyId}`)}
            style={{ cursor: 'pointer', position: 'relative', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-main) 100%)' }}
        >
            <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                        <div style={{
                            background: '#FCD34D', width: '48px', height: '48px',
                            borderRadius: '12px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', flexShrink: 0
                        }}>
                            <Lightbulb size={24} color="#0C1E3D" />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 800 }}>
                                What I Wish I Knew
                            </h4>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '4px' }}>{card.propertyName}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={12} /> {card.city}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleSave(card.id); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <Bookmark size={20} fill={savedItems.includes(card.id) ? '#0C1E3D' : 'none'} color="#0C1E3D" />
                    </button>
                </div>
                <p style={{
                    fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-main)',
                    marginBottom: '16px', fontWeight: 500
                }}>
                    {card.tip}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Good for:</span>
                    {card.goodFor.map(tag => (
                        <span key={tag} style={{
                            fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px',
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: '12px', color: 'var(--text-main)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                    Tip from {card.author}
                </p>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="web-layout" style={{ background: 'var(--bg-main)' }}>
                <Navbar />
                <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✨</div>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Loading Community Stories...</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Fetching real vibes from travelers</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="web-layout" style={{ background: 'var(--bg-main)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: '24px', paddingBottom: '80px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Users size={32} color="var(--secondary)" />
                        Community
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                        Stories & Vibes - Real moments, tips, and experiences from travelers
                    </p>
                </div>

                {/* For You Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #0C1E3D 0%, #1e3a8a 100%)',
                    borderRadius: '24px', padding: '32px', marginBottom: '40px',
                    color: 'white'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Sparkles size={24} color="var(--secondary)" fill="var(--secondary)" />
                        <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'white' }}>For You</h2>
                    </div>
                    <p style={{ fontSize: '0.95rem', opacity: 0.9, marginBottom: '24px' }}>
                        Because you liked social hostels in Kerala...
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        {forYouCards.map(card => (
                            <div key={card.id} style={{
                                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                                borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)',
                                cursor: 'pointer', transition: 'transform 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                onClick={() => card.type === 'stay' && navigate(`/details/${card.propertyId}`)}
                            >
                                <img src={card.image} style={{ width: '100%', height: '140px', objectFit: 'cover' }} alt="" />
                                <div style={{ padding: '16px' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '8px', color: 'white' }}>
                                        {card.type === 'stay' ? card.propertyName : card.type === 'event' ? card.title : card.propertyName}
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0 }}>
                                        {card.type === 'stay' ? card.headline : card.type === 'event' ? card.quote : card.tip}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter Bar */}
                <div style={{
                    display: 'flex', gap: '12px', marginBottom: '32px',
                    padding: '16px', background: 'var(--bg-card)', borderRadius: '16px',
                    border: '1px solid var(--border)', flexWrap: 'wrap', alignItems: 'center'
                }}>
                    <Filter size={20} color="var(--text-secondary)" />
                    {['All', 'Stays', 'Events', 'Tips'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                padding: '8px 20px', borderRadius: '20px', border: 'none',
                                background: activeFilter === filter ? 'var(--primary)' : 'transparent',
                                color: activeFilter === filter ? 'white' : 'var(--text-main)',
                                fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                                fontSize: '0.9rem'
                            }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Stories Feed */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
                    {filteredCards.map(card => {
                        if (card.type === 'stay') return <StayStoryCard key={card.id} card={card} />;
                        if (card.type === 'event') return <EventCard key={card.id} card={card} />;
                        if (card.type === 'tip') return <TipCard key={card.id} card={card} />;
                        return null;
                    })}
                </div>
            </div>

            <style>{`
                .story-card {
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .story-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                }
                .save-btn:hover {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default Community;
