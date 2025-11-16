import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../src/components/Footer';

describe('Footer', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
