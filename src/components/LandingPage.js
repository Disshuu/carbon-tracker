import React, { useEffect } from 'react';

export default function LandingPage({ onStart }) {
  useEffect(() => {
    const styleId = 'ecotrace-landing-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Inter:wght@300;400;500&display=swap');
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes glow{0%,100%{border-color:rgba(74,222,128,0.15)}50%{border-color:rgba(74,222,128,0.4)}}
      .a1{animation:fadeUp 0.7s ease forwards;opacity:0;animation-delay:0.05s}
      .a2{animation:fadeUp 0.7s ease forwards;opacity:0;animation-delay:0.15s}
      .a3{animation:fadeUp 0.7s ease forwards;opacity:0;animation-delay:0.25s}
      .a4{animation:fadeUp 0.7s ease forwards;opacity:0;animation-delay:0.35s}
      .a5{animation:fadeUp 0.7s ease forwards;opacity:0;animation-delay:0.45s}
      .a6{animation:fadeUp 0.7s ease forwards;opacity:0;animation-delay:0.55s}
      .glowb{animation:glow 3s ease-in-out infinite}
      .mainbtn{transition:all 0.2s!important}
      .mainbtn:hover{transform:translateY(-2px)!important;box-shadow:0 16px 40px rgba(74,222,128,0.3)!important;background:#22c55e!important}
      .ghostbtn{transition:all 0.2s!important}
      .ghostbtn:hover{background:rgba(74,222,128,0.07)!important;border-color:rgba(74,222,128,0.25)!important;color:#86efac!important}
      .sc{transition:all 0.2s!important}
      .sc:hover{background:rgba(74,222,128,0.07)!important}
      .pl{transition:all 0.2s!important}
      .pl:hover{background:rgba(74,222,128,0.08)!important;color:#4ade80!important;border-color:rgba(74,222,128,0.25)!important}
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={{
      minHeight: '100vh', background: '#030a05',
      color: '#e2f0e2', fontFamily: "'Inter', sans-serif",
      position: 'relative', overflowX: 'hidden',
    }}>

      {/* BG */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,222,128,0.055) 0%, transparent 65%)',
          top: '-180px', left: '50%', transform: 'translateX(-50%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }} />
      </div>

      {/* Navbar */}
      <nav className="a1" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 40px', position: 'relative', zIndex: 10,
        borderBottom: '1px solid rgba(74,222,128,0.05)',
        background: 'rgba(3,10,5,0.85)', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '7px', fontSize: '15px',
            background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>🌿</div>
          <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: '16px', color: '#f0faf0', letterSpacing: '-0.02em' }}>EcoTrace</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '12px', color: '#2d5a2d', fontWeight: 500 }}>PromptWars 2026</span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', borderRadius: '100px',
            background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.15)',
            fontSize: '11px', color: '#4ade80', fontWeight: 700, letterSpacing: '0.05em',
          }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px #4ade80' }} />
            LIVE
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        maxWidth: '780px', margin: '0 auto',
        padding: '56px 32px 40px',
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      }}>

        {/* Badge */}
        <div className="a1 glowb" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '7px 16px', borderRadius: '100px', marginBottom: '28px',
          background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.18)',
          fontSize: '12px', color: '#86efac', fontWeight: 500,
        }}>
          🌍 &nbsp;AI-Powered Carbon Footprint Tracker
        </div>

        {/* Heading — properly sized */}
        <h1 className="a2" style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: 'clamp(32px, 4.5vw, 56px)',
          fontWeight: 800, lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#f0faf0', marginBottom: '2px',
          maxWidth: '640px',
        }}>
          Know your impact.
        </h1>
        <h1 className="a2" style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: 'clamp(32px, 4.5vw, 56px)',
          fontWeight: 800, lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '20px', maxWidth: '640px',
          background: 'linear-gradient(90deg, #4ade80, #22c55e)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Reduce your footprint.
        </h1>

        {/* Subtitle */}
        <p className="a3" style={{
          fontSize: '15px', color: '#3d6b3d', lineHeight: 1.7,
          maxWidth: '400px', marginBottom: '32px', fontWeight: 400,
        }}>
          Answer 3 simple questions about your lifestyle. Get your CO₂ score and personalized AI tips to live greener.
        </p>

        {/* Buttons */}
        <div className="a4" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
          <button className="mainbtn" onClick={onStart} type="button" aria-label="Start calculating your carbon footprint" style={{
            padding: '13px 28px', background: '#4ade80', color: '#030a05',
            border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700,
            fontFamily: "'Bricolage Grotesque',sans-serif", cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 6px 20px rgba(74,222,128,0.2)',
          }}>
            Calculate my footprint
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="ghostbtn" type="button" aria-label="Scroll to learn how EcoTrace works" style={{
            padding: '13px 22px', background: 'transparent', color: '#3d6b3d',
            border: '1px solid rgba(74,222,128,0.12)', borderRadius: '10px',
            fontSize: '14px', fontWeight: 500, cursor: 'pointer',
          }}>
            How it works ↓
          </button>
        </div>

        {/* Stats */}
        <div className="a5" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          width: '100%', maxWidth: '620px',
          border: '1px solid rgba(74,222,128,0.09)', borderRadius: '14px',
          overflow: 'hidden', background: 'rgba(74,222,128,0.015)',
          marginBottom: '20px',
        }}>
          {[
            { icon: '🌡️', num: '4.7T', label: 'Global avg CO₂' },
            { icon: '📋', num: '3', label: 'Steps to calculate' },
            { icon: '🤖', num: 'AI', label: 'Powered by Claude' },
            { icon: '⚡', num: '60s', label: 'Time needed' },
          ].map((s, i) => (
            <div key={i} className="sc" style={{
              padding: '18px 10px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(74,222,128,0.07)' : 'none',
            }}>
              <div style={{ fontSize: '18px', marginBottom: '5px' }}>{s.icon}</div>
              <div style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontSize: '20px', fontWeight: 800, color: '#4ade80',
                letterSpacing: '-0.02em', lineHeight: 1,
              }}>{s.num}</div>
              <div style={{ fontSize: '10px', color: '#2d5a2d', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pills */}
        <div className="a6" style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['🚗 Transport', '🥗 Food & Diet', '⚡ Home Energy', '📊 Visual Charts', '🤖 Claude AI Tips'].map(f => (
            <div key={f} className="pl" style={{
              padding: '6px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 500,
              background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.09)',
              color: '#3d6b3d', cursor: 'default',
            }}>{f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
