import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Test error');
};

const GoodChild = () => <div>All good</div>;

// Suppress console.error noise from intentional error in this test
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

test('renders children when there is no error', () => {
  render(
    <ErrorBoundary>
      <GoodChild />
    </ErrorBoundary>
  );
  expect(screen.getByText(/All good/i)).toBeInTheDocument();
});

test('renders fallback UI when a child component throws', () => {
  render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );
  expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  expect(screen.getByText(/Try again/i)).toBeInTheDocument();
});
