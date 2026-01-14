import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building, Trees, Palmtree, Compass, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // High-quality Dummy Data for Travel App
    const travelData = [
        { id: 1, name: 'Goa', type: 'State', sub: 'Beaches & Nightlife', icon: Palmtree, color: '#00BAFF' },
        { id: 2, name: 'Manali', type: 'Hill Station', sub: 'Mountains & Snow', icon: Trees, color: '#10B981' },
        { id: 3, name: 'Ooty', type: 'Hill Station', sub: 'Tea Gardens', icon: Trees, color: '#059669' },
        { id: 4, name: 'Agra', type: 'City', sub: 'Home of Taj Mahal', icon: Building, color: '#F59E0B' },
        { id: 5, name: 'Jaipur', type: 'City', sub: 'The Pink City', icon: Building, color: '#EC4899' },
        { id: 6, name: 'Taj Mahal Hotel', type: 'Hotel', sub: 'Luxurious Stay', icon: Building, color: '#6366F1' },
        { id: 7, name: 'Munnar', type: 'Station', sub: 'Rolling Hills', icon: Trees, color: '#10B981' },
        { id: 8, name: 'Rishikesh', type: 'City', sub: 'Yoga Capital', icon: Compass, color: '#8B5CF6' },
        { id: 9, name: 'Hampi', type: 'Heritage Site', sub: 'Stone Temples', icon: Building, color: '#D97706' },
        { id: 10, name: 'Ladakh', type: 'Region', sub: 'The Land of High Passes', icon: Compass, color: '#3B82F6' },
    ];

    // Handle Clicks Outside to Close Results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const val = e.target.value;
        setQuery(val);

        if (val.trim()) {
            const filtered = travelData.filter(item =>
                item.name.toLowerCase().includes(val.toLowerCase()) ||
                item.type.toLowerCase().includes(val.toLowerCase()) ||
                item.sub.toLowerCase().includes(val.toLowerCase())
            );
            setResults(filtered);
            setShowResults(true);
        } else {
            setResults([]);
            setShowResults(false);
        }
    };

    const handleSelect = (item) => {
        setQuery(item.name);
        setShowResults(false);
        if (onSearch) onSearch(item);
        else navigate('/results'); // Fallback demo behavior
    };

    return (
        <div ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: '720px', margin: '0 auto' }}>
            {/* Search Input Box */}
            <div style={{
                background: 'var(--bg-card)',
                borderRadius: '24px',
                padding: '8px 8px 8px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '2px solid var(--border)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 100,
                position: 'relative'
            }}>
                <Search size={22} color="var(--primary)" style={{ opacity: 0.6 }} />
                <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => query.trim() && setShowResults(true)}
                    style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        fontSize: '1.15rem',
                        fontWeight: 500,
                        color: 'var(--text-main)',
                        background: 'transparent',
                        padding: '12px 0'
                    }}
                />

                {query && (
                    <button
                        onClick={() => { setQuery(''); setResults([]); setShowResults(false); }}
                        style={{ padding: '8px', color: 'var(--text-secondary)', borderRadius: '50%', cursor: 'pointer' }}
                    >
                        <X size={20} />
                    </button>
                )}

                <button
                    onClick={() => query.trim() && navigate('/results')}
                    style={{
                        background: 'var(--brand-navy)',
                        color: 'white',
                        padding: '12px 32px',
                        borderRadius: '16px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(12, 30, 61, 0.2)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Search
                </button>
            </div>

            {/* Live Search Results Dropdown */}
            {showResults && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: 0,
                    right: 0,
                    background: 'var(--bg-card)',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    zIndex: 99,
                    animation: 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformOrigin: 'top center'
                }}>
                    {results.length > 0 ? (
                        <div style={{ padding: '12px' }}>
                            <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Matching Results
                                </span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{results.length} found</span>
                            </div>

                            {results.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleSelect(item)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '12px 16px',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--bg-main)';
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: `${item.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: item.color
                                    }}>
                                        <item.icon size={24} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.type} • {item.sub}</div>
                                    </div>
                                    <div style={{ color: 'var(--border)' }}>
                                        <Compass size={20} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                            <div style={{
                                width: '64px', height: '64px', background: 'var(--bg-main)',
                                borderRadius: '50%', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', margin: '0 auto 16px'
                            }}>
                                <Search size={32} color="var(--text-muted)" />
                            </div>
                            <h3 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>No results found</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                We couldn't find anything matching "{query}". <br /> Try searching for Goa, Manali, or Ooty.
                            </p>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-10px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default SearchBar;
