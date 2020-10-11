import React from 'react';
import { render } from '@testing-library/react';
import Popup from './popup';

test('renders brand', () => {
  const { getByText } = render(<Popup />);
  const brand = getByText(/Couch Sync/i);
  expect(brand).toBeInTheDocument();
});
