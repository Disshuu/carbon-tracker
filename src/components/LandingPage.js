import React, { useEffect, useState } from 'react';

export default function LandingPage({ onStart }) {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
      @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
      @keyframes glow { 0%,100%{opacity:0.5} 50%{opacity:1} }
      .a1{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0;animation-delay:0.1s}
      .a2{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0;animation-delay:0.2s}
      .a3{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0;animation-delay:0.35s}
      .a4{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0;animation-delay:0.5s}
      .a5{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0;animation-delay:0.65s}
      .floatEl{animation:float 5s ease-in-out infinite}
      .statcard:hover{background:rgba(74,222,128,0.08)!important;border-color:rgba(74,222,128,0.25)!important;transform:translateY(-3px)!important}
      .statcard{transition:all 0.25s ease!important}
      .pill:hover{background:rgba(74,222,128,0.1)!important;color:#4ade80!important}
      .pill{transition:all 0.2s!important}
      .ctabtn:hover{transform:translateY(-2px)!important;box-shadow:0 20px 48px rgba(74,222,128,0.3)!important;background:#22c55e!important}
      .ctabtn{transition:all 0.2s ease!important}
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#04100a',
      color: '#e2f0e2',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflowX: 'hidden',
    }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)',
          top: '-200px', left: '50%', transform: 'translateX(-50%)',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)',
          bottom: '0', right: '-100px',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
        {/* Floating rings */}
        <div className="floatEl" style={{
          position: 'absolute', top: '8%', right: '6%',
          width: '220px', height: '220px', borderRadius: '50%',
          border: '1px solid rgba(74,222,128,0.07)',
        }} />
        <div className="floatEl" style={{
          position: 'absolute', top: '12%', right: '9%',
          width: '140px', height: '140px', borderRadius: '50%',
          border: '1px solid rgba(74,222,128,0.05)',
          animationDelay: '1.5s',
        }} />
      </div>

      {/* Navbar */}
      <nav className="a1" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', position: 'relative', zIndex: 10,
        borderBottom: '1px solid rgba(74,222,128,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px',
            background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,197,94,0.1))',
            borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(74,222,128,0.2)', fontSize: '16px',
          }}>🌿</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '17px', letterSpacing: '-0.02em', color: '#f0faf0' }}>
            EcoTrace
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '13px', color: '#3d6b3d', fontWeight: 500 }}>PromptWars 2026</span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '100px',
            background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)',
            fontSize: '12px', color: '#4ade80', fontWeight: 600, letterSpacing: '0.04em',
          }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px #4ade80' }} />
            LIVE
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div style={{
        maxWidth: '960px', margin: '0 auto',
        padding: '64px 40px 48px',
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      }}>

        {/* Badge */}
        <div className="a1" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '8px 18px', borderRadius: '100px', marginBottom: '32px',
          background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.14)',
          fontSize: '13px', color: '#86efac', fontWeight: 500,
        }}>
          🌍 &nbsp;AI-Powered Carbon Footprint Tracker
        </div>

        {/* Heading */}
        <h1 className="a2" style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(36px, 5.5vw, 68px)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '20px',
          color: '#f0faf0',
          maxWidth: '780px',
        }}>
          Know your impact.<br />
          <span style={{
            background: 'linear-gradient(90deg, #4ade80, #22c55e, #86efac)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Reduce your footprint.</span>
        </h1>

        {/* Subheading */}
        <p className="a3" style={{
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          color: '#4a7a4a', lineHeight: 1.7, fontWeight: 400,
          maxWidth: '480px', marginBottom: '40px',
        }}>
          Answer 3 simple questions about your lifestyle. Get your CO₂ score and personalized AI tips to live greener.
        </p>

        {/* CTA buttons */}
        <div className="a4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '64px' }}>
          <button className="ctabtn" onClick={onStart} style={{
            padding: '15px 32px',
            background: '#4ade80', color: '#04100a',
            border: 'none', borderRadius: '12px',
            fontSize: '15px', fontWeight: 700,
            fontFamily: "'Syne', sans-serif",
            cursor: 'pointer', letterSpacing: '-0.01em',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 8px 24px rgba(74,222,128,0.2)',
          }}>
            Calculate my footprint
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button style={{
            padding: '15px 28px',
            background: 'transparent', color: '#4a7a4a',
            border: '1px solid rgba(74,222,128,0.15)', borderRadius: '12px',
            fontSize: '15px', fontWeight: 500, cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}>
            How it works ↓
          </button>
        </div>

        {/* Stats grid */}
        <div className="a5" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0', width: '100%', maxWidth: '720px',
          border: '1px solid rgba(74,222,128,0.1)', borderRadius: '18px',
          overflow: 'hidden', background: 'rgba(74,222,128,0.02)',
          marginBottom: '28px',
        }}>
          {[
            { num: '4.7T', label: 'Global avg CO₂', icon: '🌡️' },
            { num: '3', label: 'Steps to calculate', icon: '📋' },
            { num: 'AI', label: 'Powered by Claude', icon: '🤖' },
            { num: '60s', label: 'Time needed', icon: '⚡' },
          ].map((s, i) => (
            <div key={i} className="statcard" style={{
              padding: '24px 16px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(74,222,128,0.08)' : 'none',
            }}>
              <div style={{ fontSize: '18px', marginBottom: '6px' }}>{s.icon}</div>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800,
                color: '#4ade80', letterSpacing: '-0.02em', lineHeight: 1,
              }}>{s.num}</div>
              <div style={{ fontSize: '11px', color: '#2d5a2d', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Feature pills */}
        <div className="a5" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['🚗 Transport', '🥗 Food & Diet', '⚡ Home Energy', '📊 Visual Charts', '🤖 Claude AI Tips'].map(f => (
            <div key={f} className="pill" style={{
              padding: '7px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 500,
              background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.1)',
              color: '#3d6b3d', cursor: 'default',
            }}>{f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
