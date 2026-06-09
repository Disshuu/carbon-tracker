import React, { useEffect, useState } from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -60%)',
    pointerEvents: 'none',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    border: '1px solid rgba(74,222,128,0.25)',
    borderRadius: '100px',
    fontSize: '12px',
    color: '#4ade80',
    fontFamily: 'var(--mono)',
    letterSpacing: '0.08em',
    marginBottom: '32px',
    background: 'rgba(74,222,128,0.05)',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#4ade80',
    animation: 'pulse 2s infinite',
  },
  title: {
    fontFamily: 'var(--serif)',
    fontSize: 'clamp(48px, 8vw, 88px)',
    fontWeight: 300,
    lineHeight: 1.05,
    textAlign: 'center',
    marginBottom: '24px',
    color: '#e8f5e8',
    maxWidth: '800px',
  },
  titleAccent: {
    color: '#4ade80',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: '18px',
    color: '#9dbf9d',
    textAlign: 'center',
    maxWidth: '480px',
    lineHeight: 1.6,
    marginBottom: '48px',
    fontWeight: 400,
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 36px',
    background: '#4ade80',
    color: '#060d06',
    border: 'none',
    borderRadius: '100px',
    fontSize: '16px',
    fontFamily: 'var(--sans)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '-0.01em',
  },
  stats: {
    display: 'flex',
    gap: '48px',
    marginTop: '72px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  stat: {
    textAlign: 'center',
  },
  statNum: {
    fontFamily: 'var(--mono)',
    fontSize: '28px',
    color: '#4ade80',
    fontWeight: 500,
    display: 'block',
  },
  statLabel: {
    fontSize: '13px',
    color: '#5a8a5a',
    marginTop: '4px',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
  },
};

export default function LandingPage({ onStart }) {
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      .fade-up-1 { animation: fadeUp 0.7s ease forwards; animation-delay: 0.1s; opacity: 0; }
      .fade-up-2 { animation: fadeUp 0.7s ease forwards; animation-delay: 0.25s; opacity: 0; }
      .fade-up-3 { animation: fadeUp 0.7s ease forwards; animation-delay: 0.4s; opacity: 0; }
      .fade-up-4 { animation: fadeUp 0.7s ease forwards; animation-delay: 0.55s; opacity: 0; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.grid} />
      <div style={styles.glow} />

      <div className="fade-up-1" style={styles.badge}>
        <div style={styles.dot} />
        AI-POWERED · CARBON AWARENESS
      </div>

      <h1 className="fade-up-2" style={styles.title}>
        Know your<br />
        <span style={styles.titleAccent}>carbon story</span>
      </h1>

      <p className="fade-up-3" style={styles.subtitle}>
        Understand, track, and reduce your environmental impact with personalized AI insights — built in minutes, meaningful for life.
      </p>

      <button
        className="fade-up-4"
        style={{
          ...styles.btn,
          transform: hover ? 'scale(1.04)' : 'scale(1)',
          boxShadow: hover ? '0 0 40px rgba(74,222,128,0.3)' : 'none',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onStart}
      >
        Calculate my footprint
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <div className="fade-up-4" style={styles.stats}>
        {[
          { num: '4.7T', label: 'Avg tons CO₂/person/yr' },
          { num: '3', label: 'Categories tracked' },
          { num: 'AI', label: 'Powered insights' },
        ].map((s) => (
          <div key={s.num} style={styles.stat}>
            <span style={styles.statNum}>{s.num}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
