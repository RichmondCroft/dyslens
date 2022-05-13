import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from ".";

describe.only("should render Toggle component", () => {
  it("renders toggle switch component", () => {
    render(<Toggle on={true} />);
    const labelElement = screen.getByTestId("toggle");
    expect(labelElement).toBeInTheDocument();
  });

  it("display enabled status", () => {
    render(<Toggle on={true} />);
    const labelElement = screen.getByTestId("toggle") as HTMLInputElement;
    expect(labelElement.checked).toBe(true);
  });

  it("display disabled status", () => {
    render(<Toggle on={false} />);
    const labelElement = screen.getByTestId("toggle") as HTMLInputElement;
    expect(labelElement.checked).toBe(false);
  });

  it("should trigger state change", () => {
    const callback = jest.fn();
    render(<Toggle on={true} onStateChange={callback} />);
    const labelElement = screen.getByTestId("toggle");
    fireEvent.click(labelElement);
    fireEvent.click(labelElement);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, false);
    expect(callback).toHaveBeenNthCalledWith(2, true);
  });
});
