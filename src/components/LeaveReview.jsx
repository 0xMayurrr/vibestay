import { useState } from 'react';
import { X, Star, Heart, Users, Landmark, Zap, Volume2, User, Users as Group, Coffee, Building2 } from 'lucide-react';

const LeaveReview = ({ onClose, propertyId, propertyName }) => {
    const [rating, setRating] = useState(0);
    const [feltLikeHome, setFeltLikeHome] = useState(3);
    const [socialLevel, setSocialLevel] = useState(3);
    const [cultureDepth, setCultureDepth] = useState(3);
    const [energyTag, setEnergyTag] = useState('');
    const [noiseTag, setNoiseTag] = useState('');
    const [tripType, setTripType] = useState('');
    const [headline, setHeadline] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (headline.length < 5) return alert("Please share a bit more in your headline!");

        setLoading(true);
        const reviewData = {
            propertyId,
            rating,
            feltLikeHome,
            socialLevel,
            cultureDepth,
            headline
        };

        // Only add tags if they are selected (avoids enum validation issues on backend)
        if (energyTag) reviewData.energyTag = energyTag;
        if (noiseTag) reviewData.noiseTag = noiseTag;
        if (tripType) reviewData.tripType = tripType;

        try {
            const res = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token') || ''
                },
                body: JSON.stringify(reviewData)
            });

            if (res.ok) {
                setSubmitted(true);
                setTimeout(() => onClose(), 2000);
            } else {
                alert("Failed to save snapshot. Are you logged in?");
            }
        } catch (err) {
            console.error(err);
            alert("Connection error. Try again!");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="fade-in" style={{ padding: '60px 40px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '32px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(22, 163, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Heart size={40} color="#16A34A" fill="#16A34A" />
                </div>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.8rem', marginBottom: '12px' }}>Snapshot Shared!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Thanks for helping the community vibe.</p>
            </div>
        );
    }

    const MoodCard = ({ title, left, right, leftIcon: LIcon, rightIcon: RIcon, value, onChange }) => (
        <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '24px',
            minWidth: '280px',
            scrollSnapAlign: 'start'
        }}>
            <p style={{ fontWeight: 700, marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{title}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <LIcon size={24} color={value <= 2 ? 'var(--primary)' : 'var(--text-secondary)'} />
                <div style={{ fontSize: '1.5rem' }}>
                    {value === 1 && '🏨'}
                    {value === 2 && '🏢'}
                    {value === 3 && '🏠'}
                    {value === 4 && '🏡'}
                    {value === 5 && '🛋️'}
                </div>
                <RIcon size={24} color={value >= 4 ? 'var(--primary)' : 'var(--text-secondary)'} />
            </div>
            <input
                type="range" min="1" max="5" step="1" value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', height: '8px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                <span style={{ color: value <= 2 ? 'var(--text-main)' : 'var(--text-secondary)' }}>{left}</span>
                <span style={{ color: value >= 4 ? 'var(--text-main)' : 'var(--text-secondary)' }}>{right}</span>
            </div>
        </div>
    );

    const TagChip = ({ label, selected, onClick }) => (
        <button
            onClick={onClick}
            style={{
                padding: '8px 16px',
                borderRadius: '99px',
                border: selected ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: selected ? 'rgba(var(--primary-rgb), 0.1)' : 'var(--bg-card)',
                color: selected ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
        >
            {label}
        </button>
    );

    return (
        <div className="slide-up" style={{ padding: '32px', background: 'var(--bg-card)', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', boxShadow: '0 -15px 50px rgba(0,0,0,0.2)', height: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 800 }}>Capture your stay</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>In 30 seconds for <b style={{ color: 'var(--text-main)' }}>{propertyName}</b></p>
                </div>
                <button onClick={onClose} style={{ background: 'var(--bg-nav)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <X size={24} color="var(--text-secondary)" />
                </button>
            </div>

            {/* STAR RATING */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
                {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setRating(s)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <Star size={36} fill={s <= rating ? 'var(--primary)' : 'none'} color={s <= rating ? 'var(--primary)' : 'var(--border)'} />
                    </button>
                ))}
            </div>

            {/* SECTION A: MOOD SLIDERS */}
            <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700 }}>Mood Snapshot</h4>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', scrollSnapType: 'x mandatory' }} className="hide-scrollbar">
                <MoodCard
                    title="Overall Feel"
                    left="Hotel-like" right="Felt like Home"
                    leftIcon={Building2} rightIcon={Heart}
                    value={feltLikeHome} onChange={setFeltLikeHome}
                />
                <MoodCard
                    title="Social Vibe"
                    left="Private" right="Super Social"
                    leftIcon={User} rightIcon={Users}
                    value={socialLevel} onChange={setSocialLevel}
                />
                <MoodCard
                    title="Culture Depth"
                    left="Barely there" right="Immersive"
                    leftIcon={Coffee} rightIcon={Landmark}
                    value={cultureDepth} onChange={setCultureDepth}
                />
            </div>

            {/* SECTION B: QUICK TAGS */}
            <div style={{ marginTop: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700 }}>Pick what matches</h4>

                <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>ENERGY</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['CALM', 'BALANCED', 'BUZZING'].map(tag => (
                            <TagChip key={tag} label={tag} selected={energyTag === tag} onClick={() => setEnergyTag(tag)} />
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>NOISE</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['VERY_QUIET', 'NORMAL', 'LOUD'].map(tag => (
                            <TagChip key={tag} label={tag.replace('_', ' ')} selected={noiseTag === tag} onClick={() => setNoiseTag(tag)} />
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>TRIP TYPE</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['SOLO', 'COUPLE', 'FRIENDS', 'FAMILY'].map(tag => (
                            <TagChip key={tag} label={tag} selected={tripType === tag} onClick={() => setTripType(tag)} />
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION C: ONE-LINE STORY */}
            <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: 700 }}>Your stay in one line</h4>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        maxLength={120}
                        placeholder="e.g. Felt like staying with local cousins, slow mornings and games."
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                    />
                    <div style={{ position: 'absolute', right: '12px', bottom: '-20px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        {headline.length}/120
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', paddingBottom: '40px' }}>
                <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={rating === 0 || headline.length < 5 || loading}
                    style={{ flex: 1.5, height: '60px', borderRadius: '16px' }}
                >
                    {loading ? 'Saving...' : 'Save Snapshot'}
                </button>
                <button className="btn-secondary" onClick={onClose} style={{ flex: 1, height: '60px', borderRadius: '16px' }}>
                    Skip for now
                </button>
            </div>
        </div>
    );
};

export default LeaveReview;
