import { useNavigate } from 'react-router-dom';
import { Mic } from 'lucide-react';

const MicFab = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/voice')}
            className="fab animate-float"
            style={{
                position: 'fixed',
                bottom: '100px', // Above bottom nav
                right: '24px',
                zIndex: 900,
                // Using CSS variables defined in index.css
                background: 'var(--secondary)', // Lime
                color: 'var(--text-on-secondary)', // Navy
                boxShadow: '0 8px 24px rgba(210, 243, 153, 0.4)',
                border: '4px solid white'
            }}
        >
            <Mic size={24} strokeWidth={2.5} />
        </button>
    );
};

export default MicFab;
