import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from '../../src/pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<NotFoundPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
