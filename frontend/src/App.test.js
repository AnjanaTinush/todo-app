import { render, screen } from '@testing-library/react';

// Mock axios to avoid importing ESM module from node_modules during tests
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: [] }),
  post: jest.fn().mockResolvedValue({ data: {} }),
  put: jest.fn().mockResolvedValue({ data: {} }),
  delete: jest.fn().mockResolvedValue({ data: {} }),
}));

import App from './App';

test('renders header title TaskHub', async () => {
  render(<App />);
  // wait for Home's async loadTasks effect to settle (it shows empty state)
  await screen.findByText(/No tasks yet!/i);

  const titles = screen.getAllByText(/TaskHub/i);
  expect(titles.length).toBeGreaterThan(0);
});
