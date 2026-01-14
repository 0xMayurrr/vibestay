import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Check } from 'lucide-react';
import { useState } from 'react';

const AddProperty = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else navigate('/host/dashboard'); // Mock submit
    };

    return (
        <div className="container" style={{ paddingBottom: '90px', background: 'var(--bg-main)', minHeight: '100vh' }}>
            <header style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-nav)', borderBottom: '1px solid var(--border)' }}>
                <button onClick={() => navigate(-1)} className="btn-icon" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
                    <ArrowLeft size={20} />
                </button>
                <h1 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Add Property</h1>
            </header>

            {/* Progress */}
            <div style={{ padding: '24px', marginBottom: '24px' }}>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${step * 33}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }} />
                </div>
                <p style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Step {step} of 3</p>
            </div>

            <div style={{ padding: '0 24px' }}>
                {step === 1 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '24px', color: 'var(--text-main)' }}>The Basics</h2>

                        <label style={{ display: 'block', marginBottom: '16px' }}>
                            <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Property Name</span>
                            <input style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '12px', width: '100%', borderRadius: '8px' }} placeholder="e.g. Sunny Backpacker Hostel" />
                        </label>

                        <label style={{ display: 'block', marginBottom: '16px' }}>
                            <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>City</span>
                            <input style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '12px', width: '100%', borderRadius: '8px' }} placeholder="e.g. Kochi" />
                        </label>

                        <label style={{ display: 'block', marginBottom: '16px' }}>
                            <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Property Type</span>
                            <select style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '12px', width: '100%', borderRadius: '8px' }}>
                                <option>Hostel</option>
                                <option>Homestay</option>
                                <option>Hotel</option>
                            </select>
                        </label>

                        <label style={{ display: 'block', marginBottom: '16px' }}>
                            <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Vibe</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="card" style={{ padding: '12px', flex: 1, border: '1px solid var(--vibe-chill)', color: 'var(--vibe-chill)', background: 'transparent' }}>Chill</button>
                                <button className="card" style={{ padding: '12px', flex: 1, border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-card)' }}>Social</button>
                                <button className="card" style={{ padding: '12px', flex: 1, border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-card)' }}>Quiet</button>
                            </div>
                        </label>
                    </div>
                )}

                {step === 2 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '24px', color: 'var(--text-main)' }}>Photos & Details</h2>

                        <div style={{ border: '2px dashed var(--border)', borderRadius: '16px', height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', marginBottom: '24px', background: 'var(--bg-card)' }}>
                            <Upload size={32} style={{ marginBottom: '8px' }} />
                            <p>Tap to upload photos</p>
                        </div>

                        <label style={{ display: 'block', marginBottom: '16px' }}>
                            <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Price per Night (₹)</span>
                            <input style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '12px', width: '100%', borderRadius: '8px' }} type="number" placeholder="800" />
                        </label>

                        <label style={{ display: 'block', marginBottom: '16px' }}>
                            <span style={{ fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>House Rules</span>
                            <textarea style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)' }} rows={4} placeholder="- No smoking&#10;- Quiet hours after 10 PM"></textarea>
                        </label>
                    </div>
                )}

                {step === 3 && (
                    <div className="fade-in" style={{ textAlign: 'center', paddingTop: '40px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--secondary)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <Check size={40} />
                        </div>
                        <h2 style={{ color: 'var(--text-main)' }}>Ready to Publish?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Your property will be visible to travelers matching your vibe immediately.</p>
                    </div>
                )}
            </div>

            <div style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', padding: '16px 24px', background: 'var(--bg-nav)', borderTop: '1px solid var(--border)' }}>
                <button className="btn-primary" onClick={handleNext}>
                    {step === 3 ? 'Publish Listing' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default AddProperty;
