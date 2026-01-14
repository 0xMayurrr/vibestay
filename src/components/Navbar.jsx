import { useNavigate } from 'react-router-dom';
import { Search, User, Menu, MapPin, Moon, Sun, Palmtree, Trees, Building, Compass, X, Sparkles } from 'lucide-react';
import { useAuth } from '../services/AuthContext';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth?.user;
    const [isDark, setIsDark] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // Common Travel Data
    const travelData = [
        { id: 1, name: 'Goa', type: 'State', sub: 'Beaches & Nightlife', icon: Palmtree, color: '#00BAFF' },
        { id: 2, name: 'Manali', type: 'Hill Station', sub: 'Mountains & Snow', icon: Trees, color: '#10B981' },
        { id: 3, name: 'Ooty', type: 'Hill Station', sub: 'Tea Gardens', icon: Trees, color: '#059669' },
        { id: 4, name: 'Agra', type: 'City', sub: 'Home of Taj Mahal', icon: Building, color: '#F59E0B' },
        { id: 5, name: 'Jaipur', type: 'City', sub: 'The Pink City', icon: Building, color: '#EC4899' },
        { id: 6, name: 'Taj Mahal Hotel', type: 'Hotel', sub: 'Luxurious Stay', icon: Building, color: '#6366F1' },
        { id: 7, name: 'Munnar', type: 'Station', sub: 'Rolling Hills', icon: Trees, color: '#10B981' },
    ];

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            setIsDark(true);
        }

        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        if (val.trim()) {
            const filtered = travelData.filter(item =>
                item.name.toLowerCase().includes(val.toLowerCase()) ||
                item.type.toLowerCase().includes(val.toLowerCase())
            );
            setSearchResults(filtered);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const handleSelect = (item) => {
        setSearchQuery(item.name);
        setShowResults(false);
        navigate('/results');
    };

    return (
        <nav style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            background: 'var(--bg-nav)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            borderBottom: '1px solid var(--border)',
            height: '90px',
            display: 'flex',
            alignItems: 'center',
            transition: 'background 0.3s ease'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%', margin: '0 auto', gap: '30px' }}>
                {/* Logo Section */}
                <div onClick={() => navigate('/home')} style={{ flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/image-removebg-preview (2).png"
                        alt="VibeStay Logo"
                        style={{
                            width: '240px',
                            height: 'auto',
                            maxHeight: '75px',
                            objectFit: 'contain'
                        }}
                    />
                </div>

                {/* Top Functional Search Bar */}
                <div ref={searchRef} className="web-hide-mobile" style={{
                    flex: 1, maxWidth: '450px', margin: '0 40px',
                    position: 'relative'
                }}>
                    <div style={{
                        background: 'var(--bg-card)', borderRadius: '99px', padding: '6px 6px 6px 18px',
                        display: 'flex', alignItems: 'center', border: '1px solid var(--border)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            placeholder="Search for destinations..."
                            value={searchQuery}
                            onChange={handleSearch}
                            onFocus={() => searchQuery.trim() && setShowResults(true)}
                            style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '12px', flex: 1, color: 'var(--text-main)', fontSize: '0.95rem' }}
                        />
                        {searchQuery && (
                            <button onClick={() => { setSearchQuery(''); setShowResults(false); }} style={{ padding: '4px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                <X size={16} />
                            </button>
                        )}
                        <button style={{ marginLeft: '8px', background: 'var(--secondary)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Search size={18} color="var(--brand-navy)" />
                        </button>
                    </div>

                    {/* Navbar Dropdown Results */}
                    {showResults && (
                        <div style={{
                            position: 'absolute', top: 'calc(100% + 12px)', left: 0, right: 0,
                            background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 1001,
                            animation: 'slideInNavbar 0.2s ease-out'
                        }}>
                            {searchResults.length > 0 ? (
                                <div style={{ padding: '8px' }}>
                                    {searchResults.map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleSelect(item)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                padding: '10px 16px', borderRadius: '10px', cursor: 'pointer'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-main)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                                                <item.icon size={18} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.type}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    No results found for "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            color: 'var(--text-main)', cursor: 'pointer'
                        }}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Travel Buddy AI Toggle */}
                    <button
                        onClick={() => navigate('/voice')}
                        style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'var(--brand-navy)', border: 'none',
                            color: 'var(--brand-lime)', cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(210, 243, 153, 0.3)'
                        }}
                        title="Travel Buddy AI"
                    >
                        <Sparkles size={20} />
                    </button>

                    <div className="web-hide-mobile" style={{ display: 'flex', gap: '24px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        <span style={{ cursor: 'pointer' }}>Destinations</span>
                        <span style={{ cursor: 'pointer' }}>Community</span>
                    </div>

                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            padding: '8px 16px', borderRadius: '99px', border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-card)',
                            cursor: 'pointer'
                        }}
                    >
                        <Menu size={20} color="var(--text-main)" />
                        <div style={{ width: '32px', height: '32px', background: 'var(--text-secondary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={18} />
                        </div>
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes slideInNavbar {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
