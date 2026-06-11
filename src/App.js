import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import Calculator from './components/Calculator';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [page, setPage] = useState('landing');
  const [footprintData, setFootprintData] = useState(null);

  const goToCalculator = useCallback(() => setPage('calculator'), []);

  const handleCalculated = useCallback((data) => {
    setFootprintData(data);
    setPage('dashboard');
  }, []);

  return (
    <ErrorBoundary>
      {page === 'landing' && <LandingPage onStart={goToCalculator} />}
      {page === 'calculator' && <Calculator onDone={handleCalculated} />}
      {page === 'dashboard' && (
        <Dashboard data={footprintData} onRecalculate={goToCalculator} />
      )}
    </ErrorBoundary>
  );
}
