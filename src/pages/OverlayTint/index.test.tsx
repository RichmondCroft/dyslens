import { screen, render, fireEvent } from "@testing-library/react";

import OverLayTint from ".";
import COLORS from "../../constants/colors";
import StoreContext from "../../storage/StoreContext";

describe("testing OverLayTint component", () => {
  it("should render <OverLayTint/>", () => {
    render(<OverLayTint />);
    let overLayTintContainer = screen.getByTestId("overLayTintContainer");
    expect(overLayTintContainer).toBeInTheDocument();
    
    let toggle = screen.getByTestId("toggle");
    expect(toggle).toBeInTheDocument();
  });
  
  it("should print console log when clicked on the toggle", () => {
    const appState = {
      enabled: false,
      text: {},
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };;
    const setAppState = jest.fn();
    render(
      <StoreContext.Provider value={{appState, setAppState}} >
        <OverLayTint />
      </StoreContext.Provider>
    );

    let toggle = screen.getByTestId("toggle");
    fireEvent.click(toggle)
    expect(setAppState).toHaveBeenCalledWith({
      ...appState,
      overlay: {
        ...appState.overlay,
        enabled: true
      }
    });
  });
});
