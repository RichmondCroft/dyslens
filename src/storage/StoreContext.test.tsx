import { render, screen } from '@testing-library/react';
import React from 'react';

import COLORS from '../constants/colors';
import StoreContext from './StoreContext';

describe('src/storage/StoreContext.ts', () => {
  it('should propagate initialised values', () => {
    const mockValue = {
      enabled: false,
      text: {
      },
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };

    const ContextConsumer = () => {
      const store = React.useContext(StoreContext);
      return <div data-testid='store-value'>{JSON.stringify(store)}</div>
    }

    render(
      <StoreContext.Provider value={mockValue}>
        <ContextConsumer />
      </StoreContext.Provider>
    );

    const div = screen.getByTestId('store-value');
    expect(div.textContent).toBe(JSON.stringify(mockValue))
  });
})