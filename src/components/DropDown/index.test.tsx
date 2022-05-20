import { fireEvent, render, screen } from "@testing-library/react";

import DropDown from ".";

const MOCK_LIST = [{
  displayValue: 'Display Value 1',
  value: 'value-1'
}, {
  displayValue: 'Display Value 2',
  value: 'value-2'
}];

it("should render the dropdown as expected", () => {
  const handleOnChange = jest.fn();

  render(<DropDown items={MOCK_LIST} onChange={handleOnChange} />);

  const dropDown = screen.getByTestId("drop-down");
  expect(dropDown).toBeInTheDocument();
  expect(dropDown.children.length).toBe(2);
});

it("should trigger onChange when an item is selected", () => {
  const handleOnChange = jest.fn();

  render(<DropDown items={MOCK_LIST} onChange={handleOnChange} />);

  const dropDown = screen.getByTestId("drop-down");
  fireEvent.change(dropDown, { target: { value: MOCK_LIST[1].value } })

  expect(handleOnChange).toHaveBeenCalledWith(MOCK_LIST[1].value);
});

it("should display default value", () => {
  const handleOnChange = jest.fn();

  render(<DropDown 
    items={MOCK_LIST} 
    onChange={handleOnChange} 
    noSelectionItem={{displayValue: 'Default Font', value: 'default-font' }} 
  />);

  const dropDown = screen.getByTestId("drop-down");
  fireEvent.change(dropDown, { target: { value: 'default-font' } })

  expect(dropDown.children.length).toBe(3);
  expect(handleOnChange).toHaveBeenCalledWith();
});
