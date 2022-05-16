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
  
  it("should update app state when the toggle is clicked", () => {
    const appData = {
      enabled: false,
      text: {},
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };;
    const setAppState = jest.fn();
    render(
      <StoreContext.Provider value={{appData, setAppState}} >
        <OverLayTint />
      </StoreContext.Provider>
    );

    let toggle = screen.getByTestId("toggle");
    fireEvent.click(toggle)
    expect(setAppState).toHaveBeenCalledWith({
      ...appData,
      overlay: {
        ...appData.overlay,
        enabled: true
      }
    });
  });

  it("should update app state when color is selected", () => {
    const appData = {
      enabled: false,
      text: {},
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };;
    const setAppState = jest.fn();
    render(
      <StoreContext.Provider value={{appData, setAppState}} >
        <OverLayTint />
      </StoreContext.Provider>
    );

    let colorElement = screen.getByTestId(COLORS.GRAY);
    fireEvent.click(colorElement)
    expect(setAppState).toHaveBeenCalledWith({
      ...appData,
      overlay: {
        ...appData.overlay,
        color: COLORS.GRAY
      }
    });
  });
});
