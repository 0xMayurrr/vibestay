import { Apple, Play } from 'lucide-react';

const HotelHome = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#DEE8EC', fontFamily: "'Outfit', sans-serif" }}>
            {/* Navigation */}
            <nav style={{ 
                background: '#EDEDFB', 
                padding: '20px 60px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 700, color: '#1F0F0F' }}>
                    <span style={{ fontSize: '1.5rem' }}>🌍</span> EASY TRIP
                </div>
                <div style={{ display: 'flex', gap: '40px', color: '#1F0F0F', fontSize: '0.95rem' }}>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>About us</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Reviews</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Our blog</a>
                </div>
                <button style={{
                    background: 'transparent',
                    border: '2px solid #1F0F0F',
                    padding: '10px 24px',
                    borderRadius: '30px',
                    color: '#1F0F0F',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}>
                    Download App
                </button>
            </nav>

            {/* Hero Section */}
            <section style={{ 
                background: '#EDEDFB', 
                margin: '40px 60px', 
                borderRadius: '32px', 
                padding: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '60px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Left Content */}
                <div style={{ flex: 1, zIndex: 2 }}>
                    <h1 style={{ 
                        fontSize: '4.5rem', 
                        fontWeight: 800, 
                        color: '#1F0F0F', 
                        lineHeight: 1.1, 
                        marginBottom: '30px' 
                    }}>
                        PLAN YOUR<br />
                        <span style={{ fontStyle: 'italic' }}>ESCAPE</span>
                    </h1>

                    <div style={{ 
                        background: 'rgba(209, 213, 255, 0.5)', 
                        padding: '40px', 
                        borderRadius: '24px', 
                        marginBottom: '30px' 
                    }}>
                        <p style={{ 
                            fontSize: '1.1rem', 
                            color: '#1F0F0F', 
                            lineHeight: 1.6, 
                            marginBottom: '30px' 
                        }}>
                            We have the largest selection of unique tours.<br />
                            Try our easy and quick tour selection for any<br />
                            request. 24-hour support is always happy<br />
                            to answer all your questions.
                        </p>

                        <button style={{
                            background: '#2B1616',
                            color: 'white',
                            border: 'none',
                            padding: '16px 40px',
                            borderRadius: '30px',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginBottom: '40px'
                        }}>
                            Get Started
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ fontSize: '0.95rem', color: '#1F0F0F' }}>
                                The mobile app<br />is available now
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <Apple size={24} />
                                </button>
                                <button style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <Play size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Phone Mockup */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
                    <div style={{
                        width: '320px',
                        height: '640px',
                        background: 'white',
                        borderRadius: '40px',
                        padding: '12px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                        border: '8px solid #1F0F0F'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(180deg, #E8F4F8 0%, #F5F5F5 100%)',
                            borderRadius: '32px',
                            padding: '20px',
                            position: 'relative'
                        }}>
                            {/* Phone Notch */}
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '120px',
                                height: '28px',
                                background: '#1F0F0F',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px'
                            }} />

                            {/* Phone Content */}
                            <div style={{ paddingTop: '30px' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1F0F0F', marginBottom: '12px' }}>
                                    My Trips
                                </h2>
                                <div style={{ fontSize: '0.85rem', color: '#4A4A4A', marginBottom: '20px' }}>
                                    UPCOMING • WISHLIST • RECENTLY VIEWED
                                </div>

                                <div style={{
                                    background: 'white',
                                    padding: '16px',
                                    borderRadius: '16px',
                                    marginBottom: '16px'
                                }}>
                                    <div style={{ fontSize: '0.75rem', color: '#4A4A4A', marginBottom: '8px' }}>
                                        Tips for your trip
                                    </div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1F0F0F' }}>
                                        Make copies of important documents
                                    </div>
                                </div>

                                <div style={{
                                    background: '#D4F59A',
                                    padding: '20px',
                                    borderRadius: '20px'
                                }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1F0F0F', marginBottom: '12px' }}>
                                        Exotic Bali
                                    </h3>
                                    <div style={{ fontSize: '0.85rem', color: '#1F0F0F', marginBottom: '12px' }}>
                                        📍 The Bali Dream Villa & Resort Echo Beach
                                    </div>
                                    <div style={{
                                        background: 'white',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        marginTop: '12px'
                                    }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1F0F0F' }}>
                                            🐒 Ubud Monkey Forest
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Nav */}
                            <div style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '20px',
                                right: '20px',
                                display: 'flex',
                                justifyContent: 'space-around',
                                fontSize: '0.75rem',
                                color: '#4A4A4A'
                            }}>
                                <div>Home</div>
                                <div>Book</div>
                                <div style={{ fontWeight: 700, color: '#1F0F0F' }}>My Trips</div>
                                <div>Profile</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Plane Illustration */}
                <div style={{
                    position: 'absolute',
                    bottom: '-50px',
                    right: '-50px',
                    width: '400px',
                    height: '400px',
                    opacity: 0.1,
                    fontSize: '20rem',
                    zIndex: 1
                }}>
                    ✈️
                </div>
            </section>

            {/* Hotels Section */}
            <section style={{ padding: '60px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
                <Hotel
                    title="Ocean View Resort"
                    desc="Luxury seaside resort with stunning ocean views and premium comfort."
                    img="https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9"
                    reverse={false}
                />

                <Hotel
                    title="Mountain Escape Lodge"
                    desc="A peaceful retreat surrounded by nature and fresh mountain air."
                    img="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                    reverse={true}
                />

                <Hotel
                    title="City Lights Hotel"
                    desc="Modern hotel located in the heart of the city with skyline views."
                    img="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
                    reverse={false}
                />
            </section>
        </div>
    );
};

function Hotel({ title, desc, img, reverse }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '50px',
            flexDirection: reverse ? 'row-reverse' : 'row'
        }}>
            <img
                src={img}
                alt={title}
                style={{
                    width: '50%',
                    height: '400px',
                    borderRadius: '24px',
                    objectFit: 'cover'
                }}
            />
            <div style={{
                background: '#EDEDFB',
                padding: '50px',
                borderRadius: '24px',
                flex: 1
            }}>
                <h2 style={{ fontSize: '2rem', color: '#1F0F0F', marginBottom: '20px', fontWeight: 700 }}>
                    {title}
                </h2>
                <p style={{ color: '#4A4A4A', fontSize: '1.1rem', marginBottom: '30px', lineHeight: 1.6 }}>
                    {desc}
                </p>
                <button style={{
                    background: '#2B1616',
                    color: 'white',
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: '30px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}>
                    Explore
                </button>
            </div>
        </div>
    );
}

export default HotelHome;
