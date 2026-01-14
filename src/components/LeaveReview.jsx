import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, X } from 'lucide-react';
import { useState } from 'react';

const LeaveReview = ({ onClose, targetId, targetType = 'stay' }) => {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => onClose(), 1500);
    };

    if (submitted) {
        return (
            <div className="fade-in" style={{ padding: '40px', textAlign: 'center' }}>
                <h3>Thanks for sharing!</h3>
                <p>Your review helps the community.</p>
            </div>
        );
    }

    return (
        <div className="slide-up" style={{ padding: '24px', background: 'white', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', minHeight: '60vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.4rem' }}>Rate your {targetType}</h2>
                <button onClick={onClose}><X size={24} /></button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
                {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setRating(s)} style={{ background: 'transparent' }}>
                        <Star size={32} fill={s <= rating ? 'var(--vibe-social)' : 'none'} color={s <= rating ? 'var(--vibe-social)' : 'var(--border)'} />
                    </button>
                ))}
            </div>

            <label style={{ display: 'block', marginBottom: '16px' }}>
                <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>What went well?</span>
                <textarea style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} rows={4} placeholder="Share your experience..."></textarea>
            </label>

            <button className="btn-primary" onClick={handleSubmit} disabled={rating === 0}>
                Submit Review
            </button>
        </div>
    );
};

export default LeaveReview;
