import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* World Map Background */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                height: '50%',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 100\'%3E%3Cpath d=\'M20,30 L30,25 L40,30 L45,25 L50,30 M60,35 L70,30 L80,35 M90,40 L100,35 L110,40 M120,30 L130,35 L140,30\' fill=\'none\' stroke=\'%2393C5E0\' stroke-width=\'1.5\' opacity=\'0.3\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\' fill=\'%23FF6B6B\'/%3E%3Ccircle cx=\'70\' cy=\'35\' r=\'2\' fill=\'%23FF6B6B\'/%3E%3Ccircle cx=\'100\' cy=\'38\' r=\'2\' fill=\'%23FF6B6B\'/%3E%3Ccircle cx=\'130\' cy=\'32\' r=\'2\' fill=\'%23FF6B6B\'/%3E%3C/svg%3E")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: 0.2
            }} />

            {/* Floating Icons */}
            <div style={{ position: 'absolute', top: '15%', left: '10%', animation: 'float 3s ease-in-out infinite' }}>✈️</div>
            <div style={{ position: 'absolute', top: '20%', right: '15%', animation: 'float 4s ease-in-out infinite 0.5s' }}>🎫</div>
            <div style={{ position: 'absolute', bottom: '25%', left: '8%', animation: 'float 3.5s ease-in-out infinite 1s' }}>🧳</div>

            <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <h1 style={{
                    fontSize: '2.8rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    marginBottom: '20px',
                    lineHeight: 1.2
                }}>
                    DISCOVER YOUR<br />NEXT JOURNEY
                </h1>

                <button
                    onClick={() => navigate('/login')}
                    style={{
                        background: 'var(--brand-navy)',
                        color: 'white',
                        padding: '16px 40px',
                        borderRadius: '30px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'transform 0.2s'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    GET STARTED <span style={{ fontSize: '1.3rem' }}>→</span>
                </button>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
            `}</style>
        </div>
    );
};

export default Onboarding;
