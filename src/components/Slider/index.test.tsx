import { fireEvent, render, screen } from '@testing-library/react';

import Slider from '.';

it('should render the slider to the screen', () => {
  const handleOnChange = jest.fn();
  render(<Slider value={2} onChange={handleOnChange} />);

  const slider = screen.getByTestId('slider-input');
  expect(slider).toBeInTheDocument();
});

it('should trigger a change event on value change', () => {
  const handleOnChange = jest.fn();
  render(<Slider value={0} onChange={handleOnChange} />);

  const slider = screen.getByTestId('slider-input');

  fireEvent.change(slider, { target: { value: '2' } });
  expect(handleOnChange).toBeCalledWith(2);
});