import { useState } from 'react';
import { Search, MapPin, Building, Trees, Palmtree, Compass, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchDemo = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const travelData = [
        { id: 1, name: 'Goa', type: 'State', sub: 'Beaches & Nightlife', icon: Palmtree, color: '#00BAFF' },
        { id: 2, name: 'Manali', type: 'Hill Station', sub: 'Mountains & Snow', icon: Trees, color: '#10B981' },
        { id: 3, name: 'Ooty', type: 'Hill Station', sub: 'Tea Gardens', icon: Trees, color: '#059669' },
        { id: 4, name: 'Agra', type: 'City', sub: 'Home of Taj Mahal', icon: Building, color: '#F59E0B' },
        { id: 5, name: 'Jaipur', type: 'City', sub: 'The Pink City', icon: Building, color: '#EC4899' },
        { id: 6, name: 'Taj Mahal Hotel', type: 'Hotel', sub: 'Luxurious Stay', icon: Building, color: '#6366F1' },
    ];

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

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '80px 24px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <button onClick={() => navigate('/home')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', marginBottom: '40px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    <ArrowLeft size={20} /> Back to Home
                </button>

                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#0F172A', marginBottom: '16px' }}>Search MVP Demo</h1>
                    <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Fully functional client-side search with instant results.</p>
                </div>

                <div style={{ position: 'relative' }}>
                    {/* Input Field */}
                    <div style={{
                        background: 'white',
                        padding: '16px 24px',
                        borderRadius: '20px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        border: '2px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <Search size={22} color="#94A3B8" />
                        <input
                            type="text"
                            placeholder="Type 'Goa', 'Manali' or 'Hotel'..."
                            value={query}
                            onChange={handleSearch}
                            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1.2rem', fontWeight: 500, color: '#1E293B' }}
                        />
                        {query && (
                            <button onClick={() => { setQuery(''); setResults([]); setShowResults(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                                <X size={20} />
                            </button>
                        )}
                        <button style={{ background: '#0F172A', color: 'white', padding: '10px 24px', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Search</button>
                    </div>

                    {/* Results Dropdown */}
                    {showResults && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'white',
                            marginTop: '12px',
                            borderRadius: '20px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                            border: '1px solid #E2E8F0',
                            overflow: 'hidden',
                            zIndex: 10
                        }}>
                            {results.length > 0 ? (
                                <div style={{ padding: '8px' }}>
                                    {results.map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => { setQuery(item.name); setShowResults(false); }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                padding: '16px',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#F1F5F9'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <div style={{ width: '40px', height: '40px', background: `${item.color}15`, color: item.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, color: '#1E293B' }}>{item.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{item.type} • {item.sub}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                                    <p style={{ fontWeight: 600 }}>No results found for "{query}"</p>
                                    <p style={{ fontSize: '0.9rem' }}>Try searching for Goa or Manali</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '80px', padding: '32px', background: 'white', borderRadius: '24px', border: '1px dashed #CBD5E1' }}>
                    <h3 style={{ marginBottom: '16px' }}>Instructions for VS Code:</h3>
                    <ul style={{ color: '#475569', lineHeight: 1.8 }}>
                        <li>1. Copy this component into your project.</li>
                        <li>2. Ensure <b>lucide-react</b> is installed (<code>npm install lucide-react</code>).</li>
                        <li>3. The <code>travelData</code> array contains your destinations.</li>
                        <li>4. The filtering logic is handled in <code>handleSearch</code>.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchDemo;
