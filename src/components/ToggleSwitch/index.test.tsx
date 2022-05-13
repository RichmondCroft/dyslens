import { render, screen, fireEvent } from "@testing-library/react";
import ToggleSwitch from ".";

describe("should render Toggle Switch component", () => {
  it("renders toggle switch component", () => {
    render(<ToggleSwitch on={true} />);
    const labelElement = screen.getByTestId("label-input");
    expect(labelElement).toBeInTheDocument();
  });

  it("display enabled status", () => {
    render(<ToggleSwitch on={true} />);
    const labelElement = screen.getByTestId("label-input") as HTMLInputElement;
    expect(labelElement.checked).toBe(true);
  });

  it("display disabled status", () => {
    render(<ToggleSwitch on={false} />);
    const labelElement = screen.getByTestId("label-input") as HTMLInputElement;
    expect(labelElement.checked).toBe(false);
  });

  it("should trigger state change", () => {
    const callback = jest.fn();
    render(<ToggleSwitch on={true} onStateChange={callback} />);
    const labelElement = screen.getByTestId("label-input");
    fireEvent.click(labelElement);
    fireEvent.click(labelElement);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, false);
    expect(callback).toHaveBeenNthCalledWith(2, true);
  });
});
