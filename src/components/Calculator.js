import React, { useState } from 'react';

// CO2 calculation formulas (kg CO2 per year)
const calcFootprint = (inputs) => {
  // Transport
  const carKm = inputs.carKm * 365 * 0.21;           // 0.21 kg CO2/km avg petrol
  const flightsKg = inputs.flights * 255;              // 255 kg per short-haul flight
  const bikeKg = inputs.bike * 365 * 0.003;           // negligible but real

  // Food
  const dietMap = { vegan: 1500, vegetarian: 1700, flexitarian: 2200, omnivore: 2800, meatHeavy: 3300 };
  const foodKg = dietMap[inputs.diet] || 2200;

  // Home energy
  const electricityKg = inputs.electricity * 12 * 0.82;  // 0.82 kg CO2/kWh (India grid)
  const gasKg = inputs.gas * 12 * 2.04;                  // LPG cylinders

  const transport = Math.round(carKm + flightsKg - bikeKg);
  const food = Math.round(foodKg);
  const energy = Math.round(electricityKg + gasKg);
  const total = transport + food + energy;

  return { transport, food, energy, total };
};

const s = {
  page: { minHeight: '100vh', padding: '40px 24px', maxWidth: '700px', margin: '0 auto' },
  header: { marginBottom: '40px' },
  back: { background: 'none', border: 'none', color: '#5a8a5a', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px', padding: 0 },
  step: { fontFamily: 'var(--mono)', fontSize: '12px', color: '#4ade80', letterSpacing: '0.1em', marginBottom: '8px' },
  title: { fontFamily: 'var(--serif)', fontSize: '36px', fontWeight: 300, color: '#e8f5e8' },
  progress: { display: 'flex', gap: '6px', marginTop: '20px' },
  progressDot: (active, done) => ({
    height: '3px', flex: 1, borderRadius: '2px',
    background: done ? '#4ade80' : active ? 'rgba(74,222,128,0.5)' : 'rgba(74,222,128,0.15)',
    transition: 'all 0.3s',
  }),
  card: {
    background: '#0f1c0f', border: '1px solid #1e3a1e', borderRadius: '16px',
    padding: '32px', marginBottom: '20px',
  },
  sectionTitle: { fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300, color: '#e8f5e8', marginBottom: '6px' },
  sectionSub: { fontSize: '13px', color: '#5a8a5a', marginBottom: '28px' },
  field: { marginBottom: '24px' },
  label: { display: 'block', fontSize: '14px', color: '#9dbf9d', marginBottom: '10px', fontWeight: 500 },
  sublabel: { fontSize: '12px', color: '#5a8a5a', marginLeft: '8px', fontWeight: 400 },
  row: { display: 'flex', gap: '12px', alignItems: 'center' },
  input: {
    width: '100%', background: '#111f11', border: '1px solid #1e3a1e', borderRadius: '10px',
    padding: '12px 16px', color: '#e8f5e8', fontSize: '16px', fontFamily: 'var(--mono)',
    outline: 'none', transition: 'border-color 0.2s',
  },
  unit: { fontSize: '13px', color: '#5a8a5a', fontFamily: 'var(--mono)', whiteSpace: 'nowrap' },
  slider: { width: '100%', accentColor: '#4ade80', cursor: 'pointer' },
  sliderVal: { fontFamily: 'var(--mono)', fontSize: '20px', color: '#4ade80', minWidth: '48px', textAlign: 'right' },
  dietGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' },
  dietBtn: (sel) => ({
    padding: '12px 10px', borderRadius: '10px', border: `1px solid ${sel ? '#4ade80' : '#1e3a1e'}`,
    background: sel ? 'rgba(74,222,128,0.1)' : '#111f11', color: sel ? '#4ade80' : '#9dbf9d',
    cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--sans)', fontWeight: sel ? 600 : 400,
    transition: 'all 0.15s', textAlign: 'center',
  }),
  navRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' },
  btnPrimary: {
    padding: '14px 28px', background: '#4ade80', color: '#060d06', border: 'none',
    borderRadius: '100px', fontSize: '15px', fontFamily: 'var(--sans)', fontWeight: 600,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
  },
  btnSecondary: {
    padding: '14px 24px', background: 'none', color: '#9dbf9d', border: '1px solid #1e3a1e',
    borderRadius: '100px', fontSize: '15px', fontFamily: 'var(--sans)', cursor: 'pointer',
  },
  liveScore: {
    background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)',
    borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '20px',
  },
  liveLabel: { fontSize: '13px', color: '#5a8a5a' },
  liveNum: { fontFamily: 'var(--mono)', fontSize: '24px', color: '#4ade80', fontWeight: 500 },
};

const DIETS = [
  { key: 'vegan', label: '🌱 Vegan' },
  { key: 'vegetarian', label: '🥗 Vegetarian' },
  { key: 'flexitarian', label: '🐟 Flexitarian' },
  { key: 'omnivore', label: '🍖 Omnivore' },
  { key: 'meatHeavy', label: '🥩 Meat-heavy' },
];

export default function Calculator({ onDone }) {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({
    carKm: 20, flights: 2, bike: 0,
    diet: 'omnivore',
    electricity: 150, gas: 2,
  });

  const set = (key, val) => setInputs(p => ({ ...p, [key]: val }));
  const fp = calcFootprint(inputs);

  const sections = ['Transport', 'Food', 'Home Energy'];

  const Arrow = ({ dir = 'right' }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'right' ? <path d="M5 12h14M12 5l7 7-7 7" /> : <path d="M19 12H5M12 19l-7-7 7-7" />}
    </svg>
  );

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.step}>STEP {step + 1} OF 3 · {sections[step].toUpperCase()}</div>
        <h2 style={s.title}>
          {step === 0 && 'How do you get around?'}
          {step === 1 && 'What do you eat?'}
          {step === 2 && 'Home energy use?'}
        </h2>
        <div style={s.progress}>
          {[0, 1, 2].map(i => <div key={i} style={s.progressDot(i === step, i < step)} />)}
        </div>
      </div>

      {/* Live score */}
      <div style={s.liveScore}>
        <div>
          <div style={s.liveLabel}>Your footprint so far</div>
          <div style={{ fontSize: '12px', color: '#3a6a3a', marginTop: '2px' }}>
            India avg: ~1,900 kg · Global avg: ~4,700 kg
          </div>
        </div>
        <div>
          <span style={s.liveNum}>{fp.total.toLocaleString()}</span>
          <span style={{ fontSize: '13px', color: '#5a8a5a', marginLeft: '4px' }}>kg CO₂/yr</span>
        </div>
      </div>

      {/* Step 0: Transport */}
      {step === 0 && (
        <div style={s.card}>
          <div style={s.sectionTitle}>Transport</div>
          <div style={s.sectionSub}>Your daily travel habits</div>

          <div style={s.field}>
            <label style={s.label}>
              Car / bike travel
              <span style={s.sublabel}>km per day</span>
            </label>
            <div style={s.row}>
              <input
                type="range" min={0} max={200} value={inputs.carKm}
                onChange={e => set('carKm', +e.target.value)}
                style={s.slider}
              />
              <span style={s.sliderVal}>{inputs.carKm}</span>
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>
              Flights per year
              <span style={s.sublabel}>short-haul (~2hr)</span>
            </label>
            <div style={s.row}>
              <input
                type="range" min={0} max={30} value={inputs.flights}
                onChange={e => set('flights', +e.target.value)}
                style={s.slider}
              />
              <span style={s.sliderVal}>{inputs.flights}</span>
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>
              Walk / cycle days
              <span style={s.sublabel}>days per week</span>
            </label>
            <div style={s.row}>
              <input
                type="range" min={0} max={7} value={inputs.bike}
                onChange={e => set('bike', +e.target.value)}
                style={s.slider}
              />
              <span style={s.sliderVal}>{inputs.bike}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Food */}
      {step === 1 && (
        <div style={s.card}>
          <div style={s.sectionTitle}>Diet</div>
          <div style={s.sectionSub}>Food production is ~25% of global emissions</div>

          <div style={s.field}>
            <label style={s.label}>What best describes your diet?</label>
            <div style={s.dietGrid}>
              {DIETS.map(d => (
                <button key={d.key} style={s.dietBtn(inputs.diet === d.key)} onClick={() => set('diet', d.key)}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Energy */}
      {step === 2 && (
        <div style={s.card}>
          <div style={s.sectionTitle}>Home energy</div>
          <div style={s.sectionSub}>Electricity and cooking gas usage</div>

          <div style={s.field}>
            <label style={s.label}>
              Monthly electricity
              <span style={s.sublabel}>kWh/month</span>
            </label>
            <div style={s.row}>
              <input
                type="range" min={0} max={600} step={10} value={inputs.electricity}
                onChange={e => set('electricity', +e.target.value)}
                style={s.slider}
              />
              <span style={s.sliderVal}>{inputs.electricity}</span>
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>
              LPG cylinders/month
              <span style={s.sublabel}>14.2 kg cylinders</span>
            </label>
            <div style={s.row}>
              <input
                type="range" min={0} max={8} step={0.5} value={inputs.gas}
                onChange={e => set('gas', +e.target.value)}
                style={s.slider}
              />
              <span style={s.sliderVal}>{inputs.gas}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={s.navRow}>
        {step > 0
          ? <button style={s.btnSecondary} onClick={() => setStep(s => s - 1)}>← Back</button>
          : <div />
        }
        {step < 2
          ? <button style={s.btnPrimary} onClick={() => setStep(s => s + 1)}>
              Next <Arrow />
            </button>
          : <button style={s.btnPrimary} onClick={() => onDone({ ...inputs, ...fp })}>
              See my results <Arrow />
            </button>
        }
      </div>
    </div>
  );
}
