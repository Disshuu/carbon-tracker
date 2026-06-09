import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#4ade80', '#22c55e', '#86efac'];

const s = {
  page: { minHeight: '100vh', padding: '40px 24px', maxWidth: '800px', margin: '0 auto' },
  header: { marginBottom: '36px' },
  tag: { fontFamily: 'var(--mono)', fontSize: '12px', color: '#4ade80', letterSpacing: '0.1em', marginBottom: '8px' },
  title: { fontFamily: 'var(--serif)', fontSize: '38px', fontWeight: 300, color: '#e8f5e8', lineHeight: 1.2 },
  titleNum: { color: '#4ade80', fontStyle: 'italic' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' },
  card: { background: '#0f1c0f', border: '1px solid #1e3a1e', borderRadius: '16px', padding: '24px' },
  cardTitle: { fontSize: '12px', color: '#5a8a5a', fontFamily: 'var(--mono)', letterSpacing: '0.08em', marginBottom: '12px' },
  bigNum: { fontFamily: 'var(--mono)', fontSize: '36px', color: '#4ade80', fontWeight: 500 },
  bigUnit: { fontSize: '14px', color: '#5a8a5a', marginLeft: '6px' },
  badge: (color) => ({
    display: 'inline-block', padding: '3px 10px', borderRadius: '100px', fontSize: '12px',
    background: `${color}22`, color: color, border: `1px solid ${color}44`, marginTop: '8px',
  }),
  aiCard: {
    background: 'linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(74,222,128,0.03) 100%)',
    border: '1px solid rgba(74,222,128,0.25)', borderRadius: '16px', padding: '28px', marginBottom: '20px',
  },
  aiHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' },
  aiIcon: {
    width: '32px', height: '32px', background: 'rgba(74,222,128,0.15)', borderRadius: '8px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  aiTitle: { fontSize: '15px', fontWeight: 600, color: '#e8f5e8' },
  aiSub: { fontSize: '12px', color: '#5a8a5a' },
  aiText: { fontSize: '15px', color: '#9dbf9d', lineHeight: 1.7 },
  tipList: { listStyle: 'none', marginTop: '16px' },
  tip: { display: 'flex', gap: '10px', padding: '10px 0', borderBottom: '1px solid #1e3a1e', fontSize: '14px', color: '#9dbf9d' },
  tipIcon: { color: '#4ade80', flexShrink: 0 },
  btnRow: { display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' },
  btnPrimary: {
    padding: '14px 28px', background: '#4ade80', color: '#060d06', border: 'none',
    borderRadius: '100px', fontSize: '15px', fontFamily: 'var(--sans)', fontWeight: 600, cursor: 'pointer',
  },
  btnSecondary: {
    padding: '14px 24px', background: 'none', color: '#9dbf9d', border: '1px solid #1e3a1e',
    borderRadius: '100px', fontSize: '15px', fontFamily: 'var(--sans)', cursor: 'pointer',
  },
};

const getRating = (total) => {
  if (total < 1500) return { label: 'Excellent 🌿', color: '#4ade80' };
  if (total < 2500) return { label: 'Good 🌱', color: '#86efac' };
  if (total < 4000) return { label: 'Average ⚡', color: '#fbbf24' };
  return { label: 'High Impact 🔥', color: '#f87171' };
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#0f1c0f', border: '1px solid #1e3a1e', borderRadius: '8px', padding: '10px 14px' }}>
        <div style={{ color: '#4ade80', fontFamily: 'var(--mono)', fontSize: '14px' }}>
          {payload[0].name}: {payload[0].value.toLocaleString()} kg
        </div>
      </div>
    );
  }
  return null;
};

export default function Dashboard({ data, onRecalculate }) {
  const [aiInsight, setAiInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const pieData = [
    { name: 'Transport', value: data.transport },
    { name: 'Food', value: data.food },
    { name: 'Energy', value: data.energy },
  ];

  const barData = [
    { name: 'You', value: data.total, fill: '#4ade80' },
    { name: 'India avg', value: 1900, fill: '#1e3a1e' },
    { name: 'Global avg', value: 4700, fill: '#2a4a2a' },
  ];

  const rating = getRating(data.total);

  const getAIInsight = async () => {
    setLoading(true);
    setAiInsight('');
    try {
      const prompt = `You are a carbon footprint advisor. A user has the following annual carbon footprint:
- Transport: ${data.transport} kg CO₂/year (drives ${data.carKm} km/day, ${data.flights} flights/year)
- Food: ${data.food} kg CO₂/year (diet: ${data.diet})
- Home Energy: ${data.energy} kg CO₂/year
- TOTAL: ${data.total} kg CO₂/year

India average is ~1,900 kg. Global average is ~4,700 kg.

Give 3 specific, actionable, personalized tips to reduce their footprint. Be concise (2-3 sentences per tip). Start each tip with a bold action verb. Be encouraging but honest.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const result = await response.json();
      const text = result.content?.map(c => c.text || '').join('') || 'Unable to load insights.';
      setAiInsight(text);
    } catch {
      setAiInsight('AI insights will be available once you deploy with your API key configured.');
    }
    setLoading(false);
  };

  useEffect(() => { getAIInsight(); }, []);

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.tag}>YOUR CARBON FOOTPRINT REPORT</div>
        <h1 style={s.title}>
          You emit <span style={s.titleNum}>{data.total.toLocaleString()} kg</span><br />
          of CO₂ per year
        </h1>
        <span style={s.badge(rating.color)}>{rating.label}</span>
      </div>

      {/* Stats grid */}
      <div style={s.grid}>
        {[
          { label: 'TRANSPORT', val: data.transport, unit: 'kg/yr' },
          { label: 'FOOD', val: data.food, unit: 'kg/yr' },
          { label: 'ENERGY', val: data.energy, unit: 'kg/yr' },
        ].map(({ label, val, unit }) => (
          <div key={label} style={s.card}>
            <div style={s.cardTitle}>{label}</div>
            <span style={s.bigNum}>{val.toLocaleString()}</span>
            <span style={s.bigUnit}>{unit}</span>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '20px' }}>
        <div style={s.card}>
          <div style={s.cardTitle}>BREAKDOWN</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" strokeWidth={0}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
            {pieData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#9dbf9d' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: COLORS[i] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>

        <div style={s.card}>
          <div style={s.cardTitle}>VS BENCHMARKS</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: '#5a8a5a', fontSize: 12, fontFamily: 'var(--mono)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5a8a5a', fontSize: 11, fontFamily: 'var(--mono)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div style={s.aiCard}>
        <div style={s.aiHeader}>
          <div style={s.aiIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={s.aiTitle}>AI-Powered Insights</div>
            <div style={s.aiSub}>Personalized recommendations from Claude</div>
          </div>
        </div>

        {loading ? (
          <div style={{ color: '#5a8a5a', fontFamily: 'var(--mono)', fontSize: '14px' }}>
            Analyzing your footprint...
          </div>
        ) : (
          <div style={s.aiText}>{aiInsight}</div>
        )}
      </div>

      <div style={s.btnRow}>
        <button style={s.btnPrimary} onClick={onRecalculate}>Recalculate</button>
        <button style={s.btnSecondary} onClick={getAIInsight}>Refresh AI insights ↺</button>
      </div>
    </div>
  );
}
