import React, { useMemo } from 'react';
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
  aiHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  aiIcon: {
    width: '32px', height: '32px', background: 'rgba(74,222,128,0.15)', borderRadius: '8px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  aiTitle: { fontSize: '15px', fontWeight: 600, color: '#e8f5e8' },
  aiSub: { fontSize: '12px', color: '#5a8a5a' },
  tipItem: {
    display: 'flex', gap: '14px', padding: '14px 0',
    borderBottom: '1px solid rgba(74,222,128,0.08)',
  },
  tipNum: {
    fontFamily: 'var(--mono)', fontSize: '13px', color: '#4ade80',
    fontWeight: 600, minWidth: '24px', paddingTop: '2px',
  },
  tipTitle: { fontSize: '14px', fontWeight: 600, color: '#e8f5e8', marginBottom: '4px' },
  tipDesc: { fontSize: '13px', color: '#6b9f6b', lineHeight: 1.6 },
  btnRow: { display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' },
  btnPrimary: {
    padding: '14px 28px', background: '#4ade80', color: '#060d06', border: 'none',
    borderRadius: '100px', fontSize: '15px', fontFamily: 'var(--sans)', fontWeight: 600, cursor: 'pointer',
  },
  srOnly: {
    position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px',
    overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
  },
};

const getRating = (total) => {
  if (total < 1500) return { label: 'Excellent 🌿', color: '#4ade80' };
  if (total < 2500) return { label: 'Good 🌱', color: '#86efac' };
  if (total < 4000) return { label: 'Average ⚡', color: '#fbbf24' };
  return { label: 'High Impact 🔥', color: '#f87171' };
};

const getPersonalizedTips = (data) => {
  const tips = [];

  if (data.carKm > 30) {
    tips.push({
      title: 'Switch to public transport 3 days/week',
      desc: `You drive ${data.carKm} km/day — that's ${data.transport} kg CO₂/year just from transport. Taking the bus or metro 3 days a week could save up to 400 kg CO₂ annually and reduce your transport footprint by 30%.`,
    });
  } else if (data.flights > 3) {
    tips.push({
      title: 'Reduce short-haul flights',
      desc: `Your ${data.flights} flights/year contribute significantly to your footprint. Consider trains for distances under 500km — a train emits 90% less CO₂ than a flight on the same route.`,
    });
  } else {
    tips.push({
      title: 'Great job on low transport emissions!',
      desc: `Your transport footprint of ${data.transport} kg/year is already below average. Try cycling or walking for short trips under 3km to reduce it even further.`,
    });
  }

  const dietTips = {
    meatHeavy: { title: 'Try Meatless Mondays', desc: 'A meat-heavy diet produces up to 3,300 kg CO₂/year. Cutting meat just one day a week can save 300+ kg CO₂ annually — equivalent to driving 1,200 km less.' },
    omnivore: { title: 'Reduce red meat to twice a week', desc: 'Beef produces 20x more emissions than vegetables. Swapping red meat for chicken or fish twice a week could reduce your food footprint by 15-20%, saving ~400 kg CO₂/year.' },
    flexitarian: { title: 'Go vegetarian 4 days a week', desc: 'You\'re already doing great! Pushing to vegetarian 4 days a week could save an additional 200 kg CO₂ annually while improving your health.' },
    vegetarian: { title: 'Excellent diet choice!', desc: 'Your vegetarian diet saves ~1,100 kg CO₂/year compared to a meat-heavy diet. Try buying local and seasonal produce to reduce your food footprint even further.' },
    vegan: { title: 'Outstanding — lowest food footprint!', desc: 'Your vegan diet is the single most impactful dietary choice for the planet, saving up to 1,800 kg CO₂/year. Share your journey to inspire others!' },
  };
  tips.push(dietTips[data.diet] || dietTips.omnivore);

  if (data.electricity > 200) {
    tips.push({
      title: 'Switch to LED and smart appliances',
      desc: `Your electricity usage of ${data.electricity} kWh/month generates ${data.energy} kg CO₂/year. Replacing all bulbs with LEDs and using a smart power strip can reduce consumption by 20%, saving ~${Math.round(data.energy * 0.2)} kg CO₂ annually.`,
    });
  } else if (data.gas > 3) {
    tips.push({
      title: 'Optimize your LPG cooking habits',
      desc: `Using ${data.gas} LPG cylinders/month is above average. Using pressure cookers, covering pots while cooking, and using the right burner size can reduce LPG usage by 25%, saving money and emissions.`,
    });
  } else {
    tips.push({
      title: 'Your home energy use is efficient!',
      desc: `At ${data.electricity} kWh/month, you're below the Indian average of 250 kWh. Consider installing solar panels — a 1kW system in India can offset 1,500 kg CO₂/year and pays for itself in 4-5 years.`,
    });
  }

  return tips;
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
  const pieData = useMemo(() => [
    { name: 'Transport', value: data.transport },
    { name: 'Food', value: data.food },
    { name: 'Energy', value: data.energy },
  ], [data.transport, data.food, data.energy]);

  const barData = useMemo(() => [
    { name: 'You', value: data.total, fill: '#4ade80' },
    { name: 'India avg', value: 1900, fill: '#1e3a1e' },
    { name: 'Global avg', value: 4700, fill: '#2a4a2a' },
  ], [data.total]);

  const rating = useMemo(() => getRating(data.total), [data.total]);
  const tips = useMemo(() => getPersonalizedTips(data), [data]);

  return (
    <main style={s.page} role="main" aria-label="Carbon footprint results">
      <header style={s.header}>
        <div style={s.tag}>YOUR CARBON FOOTPRINT REPORT</div>
        <h1 style={s.title}>
          You emit <span style={s.titleNum}>{data.total.toLocaleString()} kg</span><br />
          of CO₂ per year
        </h1>
        <span style={s.badge(rating.color)} role="status">{rating.label}</span>
      </header>

      <section style={s.grid} aria-label="Footprint breakdown by category">
        {[
          { label: 'TRANSPORT', val: data.transport, unit: 'kg/yr' },
          { label: 'FOOD', val: data.food, unit: 'kg/yr' },
          { label: 'ENERGY', val: data.energy, unit: 'kg/yr' },
        ].map(({ label, val, unit }) => (
          <div key={label} style={s.card}>
            <div style={s.cardTitle}>{label}</div>
            <span style={s.bigNum}>{val.toLocaleString()}</span>
            <span style={s.bigUnit}>{unit}</span>
            <span style={s.srOnly}>{label}: {val.toLocaleString()} kilograms per year</span>
          </div>
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '20px' }} aria-label="Charts">
        <div style={s.card}>
          <h2 style={s.cardTitle}>BREAKDOWN</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart role="img" aria-label="Pie chart showing emission breakdown">
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" strokeWidth={0}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
            {pieData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#9dbf9d' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: COLORS[i] }} aria-hidden="true" />
                {d.name}: {d.value.toLocaleString()} kg
              </div>
            ))}
          </div>
        </div>

        <div style={s.card}>
          <h2 style={s.cardTitle}>VS BENCHMARKS</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} role="img" aria-label="Bar chart comparing your footprint to India and global averages">
              <XAxis dataKey="name" tick={{ fill: '#5a8a5a', fontSize: 12, fontFamily: 'var(--mono)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5a8a5a', fontSize: 11, fontFamily: 'var(--mono)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section style={s.aiCard} aria-labelledby="ai-insights-heading">
        <div style={s.aiHeader}>
          <div style={s.aiIcon} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h2 id="ai-insights-heading" style={s.aiTitle}>AI-Powered Insights</h2>
            <div style={s.aiSub}>Personalized recommendations based on your data</div>
          </div>
        </div>

        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {tips.map((tip, i) => (
            <li key={i} style={{ ...s.tipItem, borderBottom: i < tips.length - 1 ? '1px solid rgba(74,222,128,0.08)' : 'none' }}>
              <div style={s.tipNum} aria-hidden="true">0{i + 1}</div>
              <div>
                <div style={s.tipTitle}>{tip.title}</div>
                <div style={s.tipDesc}>{tip.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div style={s.btnRow}>
        <button style={s.btnPrimary} onClick={onRecalculate} type="button" aria-label="Recalculate your carbon footprint">Recalculate</button>
      </div>
    </main>
  );
}
