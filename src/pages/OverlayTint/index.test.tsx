import { screen, render, fireEvent } from "@testing-library/react";

import OverLayTint from ".";

describe("testing OverLayTint component", () => {
  it("should render <OverLayTint/>", () => {
    render(<OverLayTint />);
    let overLayTintContainer = screen.getByTestId("overLayTintContainer");
    expect(overLayTintContainer).toBeInTheDocument();
    
    let toggle = screen.getByTestId("toggle");
    expect(toggle).toBeInTheDocument();
  });
  
  it("should print console log when clicked on the toggle", () => {
    const originalLog = global.console.log;
    global.console.log = jest.fn();
    
    render(<OverLayTint />);

    let toggle = screen.getByTestId("toggle");
    fireEvent.click(toggle)
    expect(global.console.log).toHaveBeenCalled();
    
    global.console.log = originalLog
  });
});
