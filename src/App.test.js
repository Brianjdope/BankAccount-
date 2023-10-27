import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Slack-like UI elements', () => {
  render(<App />);

  // Example: Test for the presence of a specific Slack-like element
  const teamNameElement = screen.getByText(/Your Team Name/i);
  expect(teamNameElement).toBeInTheDocument();

  // Add more test cases for other Slack-like elements as needed
});
