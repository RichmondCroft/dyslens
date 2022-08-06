import { fireEvent, render, screen } from "@testing-library/react";
import ColorPicker from ".";
import COLORS from "../../constants/colors";

it('should render the component and trigger change when color selection is changed', () => {
  const mockOnChange = jest.fn();

  render(<ColorPicker onChange={mockOnChange} />);
  
  expect(screen.getByTestId('color-picker')).toBeInTheDocument();
  
  fireEvent.click(screen.getByTestId(COLORS.GRAY));
  
  expect(mockOnChange).toBeCalledWith(COLORS.GRAY);
});