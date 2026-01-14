import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { Phone, Lock, Plane, ArrowRight, Image as ImageIcon, Ticket, ChevronLeft } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [view, setView] = useState('welcome'); // 'welcome' | 'phone' | 'otp' | 'role'
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleExplore = () => {
        setView('phone');
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (phone.length < 10) return;

        // Simulate OTP Generation
        const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(newOtp);
        alert(`Your VibeStay OTP is: ${newOtp}`); // Mock real-time generation
        setView('otp');
        setTimer(30);
    };

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Auto focus next
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp === generatedOtp) {
            // Skip user onboarding, go directly to role selection
            setView('role');
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    const handleRoleSelect = (role) => {
        login(role);
        if (role === 'traveler') navigate('/home');
        if (role === 'host') navigate('/host/dashboard');
        if (role === 'organizer') navigate('/organizer/dashboard');
    };

    return (
        <div className="login-container">
            <div className="world-map"></div>

            {/* Floating Elements */}
            <div className={`floating-elements ${view !== 'welcome' ? 'fade-out' : ''}`}>
                <div className="float-item plane-container">
                    <Plane size={48} fill="#E8EAED" className="plane-icon" strokeWidth={1.5} />
                    <div className="discount-tag">
                        <span style={{ fontWeight: 800 }}>25%</span>
                        <span style={{ fontSize: '10px' }}>off</span>
                    </div>
                </div>
                <div className="float-item photo-1">
                    <div className="polaroid">
                        <div className="polaroid-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1548013146-72479768bada?w=200)' }}></div>
                    </div>
                </div>
                <div className="float-item photo-2">
                    <div className="polaroid">
                        <div className="polaroid-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=200)' }}></div>
                    </div>
                </div>
            </div>

            <div className="content-layer">
                {/* Welcome Screen */}
                {view === 'welcome' && (
                    <div className="welcome-view">
                        <img
                            src="/image-removebg-preview (2).png"
                            alt="VibeStay Logo"
                            style={{ width: '240px', height: 'auto', maxHeight: '240px', objectFit: 'contain', marginBottom: '20px' }}
                        />
                        <h1 className="main-title">
                            Live the<br />
                            <span className="accent-text" style={{ color: 'var(--brand-lime)' }}>Vibe.</span>
                        </h1>
                        <div style={{ flex: 1 }}></div>
                        <button onClick={handleExplore} className="explore-btn scale-up">
                            Get Started
                            <div className="explore-icon-circle">
                                <ArrowRight size={20} color="#0B1E3D" />
                            </div>
                        </button>
                    </div>
                )}

                {/* Phone Input View */}
                {view === 'phone' && (
                    <div className="form-view slide-up">
                        <button onClick={() => setView('welcome')} style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                            <ChevronLeft size={20} /> Back
                        </button>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '8px' }}>Log In</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Enter your mobile number to receive an OTP</p>

                        <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="input-wrap">
                                <span style={{ fontWeight: 700, color: 'var(--text-main)', borderRight: '1px solid var(--border)', paddingRight: '12px', marginRight: '4px' }}>+91</span>
                                <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    value={phone}
                                    maxLength={10}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    style={{ fontWeight: 600, color: 'var(--text-main)' }}
                                />
                            </div>
                            <button type="submit" disabled={phone.length < 10} className="login-submit-btn" style={{ opacity: phone.length < 10 ? 0.6 : 1 }}>
                                Send OTP
                            </button>
                        </form>
                    </div>
                )}

                {/* OTP Input View */}
                {view === 'otp' && (
                    <div className="form-view fade-in">
                        <button onClick={() => setView('phone')} style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                            <ChevronLeft size={20} /> Change Number
                        </button>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '8px' }}>Enter OTP</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>OTP sent to <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>+91 {phone}</span></p>

                        <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        id={`otp-${idx}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                                        style={{
                                            width: '60px', height: '60px', borderRadius: '12px', border: '2px solid var(--border)',
                                            textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)',
                                            background: 'var(--bg-card)', outline: 'none', transition: 'border-color 0.2s'
                                        }}
                                        autoFocus={idx === 0}
                                    />
                                ))}
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    Didn't receive code? {timer > 0 ? (
                                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Resend in {timer}s</span>
                                    ) : (
                                        <button type="button" onClick={handleSendOtp} style={{ color: 'var(--brand-navy)', fontWeight: 800, textDecoration: 'underline' }}>Resend Now</button>
                                    )}
                                </p>
                            </div>

                            <button type="submit" className="login-submit-btn">
                                Verify & Proceed
                            </button>
                        </form>
                    </div>
                )}

                {/* Role Select */}
                {view === 'role' && (
                    <div className="form-view fade-in">
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '12px' }}>Identity</h2>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>Tell us who you are</p>
                        <div className="role-grid">
                            <button onClick={() => handleRoleSelect('traveler')} className="role-card">
                                <div style={{ width: '40px', height: '40px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🌍</div>
                                <div>Traveler</div>
                            </button>
                            <button onClick={() => handleRoleSelect('host')} className="role-card">
                                <div style={{ width: '40px', height: '40px', background: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🏠</div>
                                <div>Host</div>
                            </button>
                            <button onClick={() => handleRoleSelect('organizer')} className="role-card">
                                <div style={{ width: '40px', height: '40px', background: '#FEF3C7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🎉</div>
                                <div>Organizer</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .login-container {
                    position: relative;
                    height: 100vh;
                    width: 100vw;
                    background-color: var(--bg-main);
                    overflow: hidden;
                    font-family: 'Outfit', sans-serif;
                }

                .world-map {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 150%;
                    opacity: 0.05;
                    pointer-events: none;
                }

                .content-layer {
                    position: relative;
                    z-index: 10;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .welcome-view {
                    height: 100%;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .main-title {
                    font-size: 3.5rem;
                    line-height: 1.1;
                    color: var(--text-main);
                    text-align: center;
                    margin-top: 20px;
                    font-weight: 800;
                }

                .float-item {
                    position: absolute;
                    pointer-events: none;
                }

                .plane-container {
                    top: 15%;
                    left: 15%;
                    transform: rotate(15deg);
                }

                .discount-tag {
                    position: absolute;
                    top: 10px;
                    right: -40px;
                    background: var(--brand-lime);
                    color: var(--brand-navy);
                    padding: 4px 12px;
                    border-radius: 99px;
                    font-family: monospace;
                    transform: rotate(-10deg);
                    box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
                    font-weight: 800;
                }

                .polaroid {
                    background: var(--bg-card);
                    padding: 6px 6px 16px 6px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.06);
                    border: 1px solid var(--border);
                }

                .polaroid-img {
                    width: 80px;
                    height: 80px;
                    background-size: cover;
                    background-position: center;
                }

                .photo-1 { top: 60%; left: 10%; transform: rotate(-10deg); }
                .photo-2 { bottom: 20%; right: 10%; transform: rotate(15deg); }

                .explore-btn {
                    background: var(--brand-navy);
                    color: white;
                    padding: 10px 10px 10px 32px;
                    border-radius: 40px;
                    font-size: 1.2rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 60px;
                    box-shadow: 0 10px 40px rgba(11, 30, 61, 0.2);
                    border: none;
                }

                .explore-icon-circle {
                    width: 48px; height: 48px;
                    border-radius: 50%;
                    background: var(--brand-lime);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .form-view {
                    padding: 40px;
                    max-width: 450px;
                    margin: 0 auto;
                    width: 100%;
                }

                .input-wrap {
                    background: var(--bg-card);
                    padding: 18px 24px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    border: 2px solid var(--border);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
                }

                .input-wrap input {
                    border: none;
                    outline: none;
                    background: transparent;
                    width: 100%;
                    font-size: 1.1rem;
                    color: var(--text-main);
                }

                .login-submit-btn {
                    padding: 20px;
                    border-radius: 16px;
                    background: var(--brand-navy);
                    color: white;
                    font-weight: 700;
                    font-size: 1.1rem;
                    border: none;
                }

                .role-grid {
                    display: grid;
                    gap: 16px;
                }

                .role-card {
                    background: var(--bg-card);
                    padding: 24px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    font-size: 1.2rem;
                    color: var(--text-main);
                    font-weight: 700;
                    border: 1px solid var(--border);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.03);
                    transition: all 0.2s;
                }

                .slide-up { animation: slideUp 0.4s ease-out; }
                .fade-in { animation: fadeIn 0.4s ease-out; }
                @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .fade-out { opacity: 0; transition: opacity 0.5s; }
            `}</style>
        </div>
    );
};

export default Login;
