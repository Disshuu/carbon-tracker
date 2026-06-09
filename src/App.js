import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Calculator from './components/Calculator';
import Dashboard from './components/Dashboard';

export default function App() {
  const [page, setPage] = useState('landing');
  const [footprintData, setFootprintData] = useState(null);

  const handleCalculated = (data) => {
    setFootprintData(data);
    setPage('dashboard');
  };

  return (
    <>
      {page === 'landing' && <LandingPage onStart={() => setPage('calculator')} />}
      {page === 'calculator' && <Calculator onDone={handleCalculated} />}
      {page === 'dashboard' && <Dashboard data={footprintData} onRecalculate={() => setPage('calculator')} />}
    </>
  );
}
