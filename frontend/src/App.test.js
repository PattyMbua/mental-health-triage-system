import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mental Health Triage System title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Mental Health Triage System/i);
  expect(linkElement).toBeInTheDocument();
});
