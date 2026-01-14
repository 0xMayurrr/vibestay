import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';

const CreateEvent = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ paddingBottom: '90px', background: 'var(--bg-main)', minHeight: '100vh' }}>
            <header style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-nav)', borderBottom: '1px solid var(--border)' }}>
                <button onClick={() => navigate(-1)} className="btn-icon" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
                    <ArrowLeft size={20} />
                </button>
                <h1 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Create Event</h1>
            </header>

            <div style={{ padding: '0 24px' }}>

                <label style={{ display: 'block', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Event Title</span>
                    <input style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '12px', width: '100%', borderRadius: '8px' }} placeholder="e.g. Sunset Yoga" />
                </label>

                <label style={{ display: 'block', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Category</span>
                    <select style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '12px', width: '100%', borderRadius: '8px' }}>
                        <option>Cultural</option>
                        <option>Food</option>
                        <option>Adventure</option>
                        <option>Meetup</option>
                    </select>
                </label>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '16px', flex: 1 }}>
                        <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Date</span>
                        <input style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '12px', width: '100%', borderRadius: '8px' }} type="date" />
                    </label>
                    <label style={{ display: 'block', marginBottom: '16px', flex: 1 }}>
                        <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Time</span>
                        <input style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '12px', width: '100%', borderRadius: '8px' }} type="time" />
                    </label>
                </div>

                <label style={{ display: 'block', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Location</span>
                    <div style={{ position: 'relative' }}>
                        <MapPin size={20} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-secondary)' }} />
                        <input style={{ paddingLeft: '40px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', width: '100%', borderRadius: '8px', height: '48px' }} placeholder="Link to map or address" />
                    </div>
                </label>

                <label style={{ display: 'block', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Price per Person</span>
                    <input style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '12px', width: '100%', borderRadius: '8px' }} type="number" placeholder="0 for free" />
                </label>

                <label style={{ display: 'block', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Description</span>
                    <textarea style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)' }} rows={4} placeholder="What will happen?"></textarea>
                </label>
            </div>

            <div style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', padding: '16px 24px', background: 'var(--bg-nav)', borderTop: '1px solid var(--border)' }}>
                <button className="btn-primary" onClick={() => navigate('/organizer/dashboard')}>
                    Create Event
                </button>
            </div>
        </div>
    );
};

export default CreateEvent;
