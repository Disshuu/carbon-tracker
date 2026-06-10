import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders landing page heading', () => {
  render(<App />);
  const heading = screen.getByText(/Know your impact/i);
  expect(heading).toBeInTheDocument();
});

test('renders calculate button', () => {
  render(<App />);
  const button = screen.getByText(/Calculate my footprint/i);
  expect(button).toBeInTheDocument();
});

test('renders EcoTrace branding', () => {
  render(<App />);
  const brand = screen.getByText(/EcoTrace/i);
  expect(brand).toBeInTheDocument();
});
