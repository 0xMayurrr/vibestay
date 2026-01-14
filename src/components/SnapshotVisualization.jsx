import React from 'react';
import { Building2, Heart, Users, Landmark, Zap, Volume2, User, Users as Group, Quote } from 'lucide-react';

const SnapshotVisualization = ({ stats, headline, tags = [] }) => {
    // stats: { count, feltLikeHome, socialLevel, cultureDepth }

    const MiniBar = ({ icon: Icon, label, value, color }) => (
        <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
                width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-nav)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                border: '1px solid var(--border)', position: 'relative'
            }}>
                <Icon size={20} color={color} />
                <div style={{
                    position: 'absolute', bottom: '-4px', right: '-4px', width: '20px', height: '20px',
                    borderRadius: '50%', background: color, color: 'white', fontSize: '0.7rem',
                    fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {Math.round(value)}
                </div>
            </div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{label}</p>
        </div>
    );

    const deriveSummary = (s) => {
        if (!s || s.count === 0) return "";
        let labels = [];
        labels.push(s.feltLikeHome > 3.5 ? "Mostly Homey" : s.feltLikeHome < 2.5 ? "Hotel-like" : "Mixed Vibe");
        labels.push(s.socialLevel > 3.5 ? "Highly Social" : s.socialLevel < 2.5 ? "Mostly Private" : "Balanced Socially");
        labels.push(s.cultureDepth > 3.5 ? "Deep Culture" : "Local Vibe");
        return labels.join(", ");
    };

    if (!stats || stats.count === 0) {
        return (
            <div style={{
                padding: '40px 32px', borderRadius: '28px', background: 'var(--bg-nav)',
                border: '2px dashed var(--border)', textAlign: 'center', marginBottom: '40px'
            }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🏘️</div>
                <h4 style={{ color: 'var(--primary)', fontWeight: 800, marginBottom: '8px', fontSize: '1.2rem' }}>No Guest Vibe Snapshots yet.</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    First guests decide how this place feels. Be the trendsetter!
                </p>
            </div>
        );
    }

    return (
        <div style={{
            padding: '32px', borderRadius: '32px', background: 'var(--bg-card)',
            border: '1px solid var(--border)', marginBottom: '40px', boxShadow: 'var(--shadow-card)',
            position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>Guest Vibe Snapshot</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, background: 'rgba(var(--primary-rgb), 0.1)', padding: '4px 12px', borderRadius: '99px' }}>
                    <Users size={14} /> {stats.count} Samples
                </div>
            </div>

            {/* Vibe Meter Layout */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', padding: '12px 0' }}>
                <MiniBar icon={Heart} label="Homey" value={stats.feltLikeHome} color="#F43F5E" />
                <MiniBar icon={Users} label="Social" value={stats.socialLevel} color="#8B5CF6" />
                <MiniBar icon={Landmark} label="Culture" value={stats.cultureDepth} color="#0EA5E9" />
            </div>

            <p style={{
                textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-main)',
                fontWeight: 700, marginBottom: '24px', background: 'var(--bg-nav)',
                padding: '10px', borderRadius: '12px'
            }}>
                "{deriveSummary(stats)}"
            </p>

            {/* Category Chips Row */}
            {tags.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
                    {tags.map((tag, idx) => (
                        <span key={idx} style={{
                            fontSize: '0.7rem', fontWeight: 800, padding: '6px 14px',
                            background: 'var(--bg-nav)', border: '1px solid var(--border)',
                            borderRadius: '99px', color: 'var(--text-secondary)', textTransform: 'uppercase'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* One-line Highlight */}
            {headline && (
                <div style={{
                    borderTop: '1px solid var(--border)', paddingTop: '24px',
                    position: 'relative'
                }}>
                    <Quote size={32} color="var(--primary)" style={{ position: 'absolute', top: '16px', left: '0', opacity: 0.1 }} />
                    <p style={{
                        fontStyle: 'italic', color: 'var(--text-main)', fontWeight: 600,
                        fontSize: '1.1rem', textAlign: 'center', marginBottom: '8px', lineHeight: 1.5
                    }}>
                        "{headline}"
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 500 }}>
                        — Based on recent guest experiences
                    </p>
                </div>
            )}
        </div>
    );
};

export default SnapshotVisualization;
