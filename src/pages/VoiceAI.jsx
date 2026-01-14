import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { handleVoiceQuery } from '../services/aiService';
import PropertyCard from '../components/PropertyCard';

const VoiceAI = () => {
    const navigate = useNavigate();
    const [isListening, setIsListening] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [role, setRole] = useState('traveler');
    const [conversation, setConversation] = useState([]);
    const [transcript, setTranscript] = useState('');
    const bottomRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    // Initialize Web Speech API
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Speech Recognition NOT supported");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false; // Disabling interim results for better stability
        recognition.lang = 'en-IN';

        recognition.onstart = () => {
            console.log("Listening...");
            setIsListening(true);
            setTranscript("Listening...");
        };

        recognition.onresult = (event) => {
            const final = event.results[0][0].transcript;
            setTranscript(final);
            handleSubmission(final);
        };

        recognition.onerror = (event) => {
            console.error("Mic Error:", event.error);
            setIsListening(false);

            if (event.error === 'network') {
                const networkErr = "I'm having trouble reaching my voice servers. Please check your internet or try again in a moment.";
                setConversation(prev => [...prev, { type: 'bot', text: networkErr }]);
                speak(networkErr);
            }

            if (event.error === 'not-allowed') {
                alert("Please allow Microphone access in your browser settings.");
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            // If the recognition ended but we have a good transcript, submit it
            setTranscript(prev => {
                const clean = prev.trim();
                if (clean.length > 2 && !isThinking) {
                    handleSubmission(clean);
                }
                return prev;
            });
        };

        recognitionRef.current = recognition;
    }, []);

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new window.SpeechSynthesisUtterance(text);
            utterance.pitch = 1.1;
            utterance.rate = 1;
            window.speechSynthesis.speak(utterance);
        }
    };

    const [showTextFallback, setShowTextFallback] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleSubmission = async (text) => {
        if (!text || !text.trim()) return;
        setIsThinking(true);
        setShowTextFallback(false);

        setConversation(prev => [...prev, { type: 'user', text: text }]);

        try {
            const response = await handleVoiceQuery(text, { role, city: 'Kochi' });
            setConversation(prev => [...prev, {
                type: 'bot',
                text: response.speechText,
                cards: response.cards
            }]);
            speak(response.speechText);
        } catch (error) {
            const err = "I'm having trouble connecting to my brain right now.";
            setConversation(prev => [...prev, { type: 'bot', text: err }]);
            speak(err);
        } finally {
            setIsThinking(false);
            setTranscript('');
            setInputText('');
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            try {
                // Refresh recognition object to clear any stale states
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US'; // Using US as it is often more stable on Google servers

                recognition.onstart = () => {
                    setIsListening(true);
                    setTranscript("Listening...");
                };
                recognition.onresult = (event) => {
                    const final = event.results[0][0].transcript;
                    setTranscript(final);
                    handleSubmission(final);
                };
                recognition.onerror = (event) => {
                    console.error("Mic Error:", event.error);
                    setIsListening(false);
                    if (event.error === 'network') {
                        setShowTextFallback(true);
                        const networkErr = "I'm having trouble reaching my voice servers. Please check your internet or try again in a moment.";
                        setConversation(prev => [...prev, { type: 'bot', text: networkErr }]);
                        speak(networkErr);
                    }
                    if (event.error === 'not-allowed') {
                        alert("Please allow Microphone access in your browser settings.");
                    }
                };
                recognition.onend = () => {
                    setIsListening(false);
                    setTranscript(prev => {
                        const clean = prev.trim();
                        if (clean.length > 2 && !isThinking) {
                            // This part is now redundant if onresult always calls handleSubmission
                            // but keeping it for now to match original logic flow if onresult is skipped.
                        }
                        return prev;
                    });
                };

                recognitionRef.current = recognition; // Update ref to the new recognition instance
                recognition.start();
            } catch (e) {
                console.error("Start failed", e);
                setShowTextFallback(true);
            }
        }
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-nav)', borderBottom: '1px solid var(--border)', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'var(--bg-card)', padding: '10px', borderRadius: '50%', border: '1px solid var(--border)' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Travel Buddy</h2>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase' }}>{role} Mode</div>
                    </div>
                </div>
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '6px 12px', borderRadius: '8px' }}>
                    <option value="traveler">Traveler</option>
                    <option value="host">Host</option>
                    <option value="organizer">Organizer</option>
                </select>
            </header>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', paddingBottom: '220px' }}>
                {conversation.length === 0 && !isThinking && (
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px' }}>VibeCheck.</h1>
                        <p style={{ opacity: 0.6 }}>{showTextFallback ? "Network issues detected. Try typing." : "Tap the mic to start talking."}</p>
                    </div>
                )}

                {conversation.map((msg, i) => (
                    <div key={i} style={{ marginBottom: '24px', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '14px 20px',
                            borderRadius: '20px',
                            background: msg.type === 'user' ? 'var(--brand-navy)' : 'white',
                            color: msg.type === 'user' ? 'white' : 'black',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            maxWidth: '80%'
                        }}>
                            {msg.text}
                        </div>
                        {msg.cards && msg.cards.map((card, ci) => (
                            <div key={ci} style={{ marginTop: '16px', textAlign: 'left' }}>
                                {card.type === 'STAY_LIST' && card.data.map(p => <PropertyCard key={p.id} property={p} />)}
                            </div>
                        ))}
                    </div>
                ))}

                {isThinking && (
                    <div style={{ display: 'flex', gap: '6px', padding: '12px' }}>
                        <div className="dot-blink" style={{ width: '8px', height: '8px', background: 'var(--brand-lime)', borderRadius: '50%' }} />
                        <div className="dot-blink" style={{ width: '8px', height: '8px', background: 'var(--brand-lime)', borderRadius: '50%', animationDelay: '0.2s' }} />
                        <div className="dot-blink" style={{ width: '8px', height: '8px', background: 'var(--brand-lime)', borderRadius: '50%', animationDelay: '0.4s' }} />
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div style={{ position: 'fixed', bottom: 0, width: '100%', padding: '30px 24px', background: 'var(--bg-nav)', backdropFilter: 'blur(30px)', borderTop: '1px solid var(--border)', textAlign: 'center', zIndex: 100 }}>
                {transcript && <div style={{ marginBottom: '16px', fontSize: '1.2rem', fontWeight: 600 }}>"{transcript}"</div>}

                {showTextFallback ? (
                    <div style={{ display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
                        <input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type backup message..."
                            style={{ flex: 1, padding: '16px 24px', borderRadius: '30px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmission(inputText)}
                        />
                        <button onClick={() => toggleListening()} style={{ padding: '0 20px', background: 'var(--brand-navy)', color: 'white', borderRadius: '30px' }}>Retry Mic</button>
                    </div>
                ) : (
                    <button
                        onClick={toggleListening}
                        style={{
                            width: '90px', height: '90px', borderRadius: '50%',
                            background: isListening ? '#ff4b4b' : 'var(--brand-navy)',
                            color: 'white', border: 'none', cursor: 'pointer',
                            boxShadow: isListening ? '0 0 40px rgba(255, 75, 75, 0.4)' : '0 8px 32px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s'
                        }}
                    >
                        <Mic size={36} className={isListening ? 'pulse' : ''} />
                    </button>
                )}
            </div>

            <style>{`
                .pulse { animation: pulse 1s infinite; }
                @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
                .dot-blink {
                    animation: dot-blink 1.4s infinite ease-in-out both;
                }
                .dot-blink:nth-child(1) { animation-delay: -0.32s; }
                .dot-blink:nth-child(2) { animation-delay: -0.16s; }
                .dot-blink:nth-child(3) { animation-delay: 0s; }
                @keyframes dot-blink {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default VoiceAI;
