import {render, screen} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';

import {Home} from '..';

describe('Home', () => {
  it('should render home page', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const linkElement = screen.getByText(/login/i);

    expect(linkElement).toBeInTheDocument();
  });
});
