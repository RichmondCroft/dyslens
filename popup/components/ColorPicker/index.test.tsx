import { fireEvent, render, screen } from '@testing-library/react';

import ColorPicker from './index';

const RED = '#d3322e';
const BLACK = '#1e1e1e';

// jsdom doesn't expand the `border` shorthand for getComputedStyle() when it
// comes from a styled-components stylesheet rule, so assert directly against
// the CSS text styled-components injects into <head> instead.
function isSelected(element: HTMLElement) {
  const css = Array.from(document.querySelectorAll('style[data-styled]'))
    .map((style) => style.textContent)
    .join('\n');
  const dynamicClass = Array.from(element.classList).find((cls) => !cls.startsWith('sc-'));
  const rule = css.match(new RegExp(`\\.${dynamicClass}\\{([^}]*)\\}`));
  return !!rule && /border:3px/.test(rule[1]);
}

describe('ColorPicker', () => {
  it('marks the clicked color as selected and reports it via onChange', () => {
    const onChange = jest.fn();
    render(<ColorPicker testId="picker" onChange={onChange} />);

    expect(isSelected(screen.getByTestId(RED))).toBe(false);
    fireEvent.click(screen.getByTestId(RED));

    expect(onChange).toHaveBeenCalledWith(RED);
    expect(isSelected(screen.getByTestId(RED))).toBe(true);
  });

  // Regression test for issue #148: ColorPicker seeds its selected color from
  // the `color` prop via `useState(color)` only once at mount, and never
  // resyncs if the prop changes afterwards (e.g. appData updated externally
  // while the popup is open). Expected to fail until that bug is fixed - kept
  // as `test.failing` so the suite documents the bug without going red.
  test.failing('updates the selected color when the color prop changes after mount', () => {
    const onChange = jest.fn();
    const { rerender } = render(<ColorPicker testId="picker" color={RED} onChange={onChange} />);
    expect(isSelected(screen.getByTestId(RED))).toBe(true);

    rerender(<ColorPicker testId="picker" color={BLACK} onChange={onChange} />);

    expect(isSelected(screen.getByTestId(BLACK))).toBe(true);
    expect(isSelected(screen.getByTestId(RED))).toBe(false);
  });
});
