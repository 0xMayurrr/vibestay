import { useNavigate } from 'react-router-dom';
import { Home, Calendar, MapPin, User, Compass, Mic, Sparkles } from 'lucide-react';

const BottomNav = () => {
    const navigate = useNavigate();
    // Simple state check - in real app useLocation
    const path = window.location.pathname;
    const isActive = (p) => path === p;

    const navItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: Compass, label: 'Explore', path: '/results' }, // Changed Icon
        { icon: Mic, label: 'Buddy', path: '/voice', isSpecial: true },
        { icon: Calendar, label: 'Trips', path: '/trips' },
        { icon: User, label: 'Profile', path: '/login' }
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 48px)',
            maxWidth: '432px',
            background: '#0C1E3D', // Navy Background
            borderRadius: '32px',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 10px 30px rgba(12, 30, 61, 0.4)',
            zIndex: 1000
        }}>
            {navItems.map(({ icon: Icon, label, path: itemPath, isSpecial }) => {
                const active = isActive(itemPath);
                return (
                    <button
                        key={itemPath}
                        onClick={() => navigate(itemPath)}
                        style={{
                            background: active ? '#D2F399' : (isSpecial ? 'rgba(210, 243, 153, 0.15)' : 'transparent'),
                            width: (active || isSpecial) ? '48px' : 'auto',
                            height: (active || isSpecial) ? '48px' : 'auto',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '2px',
                            color: (active || isSpecial) ? '#D2F399' : '#8A9DB8',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            border: isSpecial ? '1px solid rgba(210, 243, 153, 0.3)' : 'none'
                        }}
                    >
                        <Icon size={isSpecial ? 26 : 24} strokeWidth={active || isSpecial ? 2.5 : 2} color={isSpecial && !active ? '#D2F399' : (active ? '#0C1E3D' : '#8A9DB8')} />
                        {!active && !isSpecial && <span style={{ fontSize: '0.6rem', fontWeight: 600 }}>{label}</span>}
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;
