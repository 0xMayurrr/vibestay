import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Check if visited before? For now just go to Onboarding
            navigate('/onboarding');
        }, 2500);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--primary)',
            color: 'white'
        }}>
            <div className="fade-in" style={{ textAlign: 'center' }}>
                <div style={{
                    padding: '20px',
                    marginBottom: '16px',
                    display: 'inline-flex'
                }}>
                    <img
                        src="/image-removebg-preview (2).png"
                        alt="VibeStay Logo"
                        style={{ width: '200px', height: 'auto', maxHeight: '200px', objectFit: 'contain' }}
                    />
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '4px', color: 'white', letterSpacing: '-0.04em' }}>VibeStay</h1>
                <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Find stays that match your mood.</p>
            </div>
        </div>
    );
};

export default Splash;
