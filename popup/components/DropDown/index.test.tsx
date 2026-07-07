import { render, screen } from '@testing-library/react';

import DropDown from './index';

const items = [
  { displayValue: 'Comic Sans', value: 'ComicSans' },
  { displayValue: 'Open Sans', value: 'OpenSans' },
];

describe('DropDown', () => {
  it('renders the label matching the given value', () => {
    render(<DropDown items={items} value="ComicSans" onChange={jest.fn()} testId="font" />);

    expect(screen.getByTestId('font-form')).toHaveTextContent('Comic Sans');
  });

  // Regression test for issue #147: DropDown seeds its displayed value from
  // the `value` prop via `useState(value)` only once at mount, and never
  // resyncs if the prop changes afterwards (e.g. appData updated externally
  // while the popup is open). Expected to fail until that bug is fixed.
  test.failing('updates the displayed value when the value prop changes after mount', () => {
    const { rerender } = render(
      <DropDown items={items} value="ComicSans" onChange={jest.fn()} testId="font" />
    );
    expect(screen.getByTestId('font-form')).toHaveTextContent('Comic Sans');

    rerender(<DropDown items={items} value="OpenSans" onChange={jest.fn()} testId="font" />);

    expect(screen.getByTestId('font-form')).toHaveTextContent('Open Sans');
  });
});
