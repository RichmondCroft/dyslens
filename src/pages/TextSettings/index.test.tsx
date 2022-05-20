import { expect } from "@jest/globals";
import { screen, render, fireEvent } from "@testing-library/react";

import TestWrapper from "../../test-utils/TestWrapper";
import TextSettings from ".";
import COLORS from "../../constants/colors";
import StoreContext from "../../storage/StoreContext";

describe("testing TextSettings component", () => {
  it("should render <TextSettings/>", () => {
    render(
      <TestWrapper>
        <TextSettings />
      </TestWrapper>
    );
    let textSettingsContainer = screen.getByTestId("textSettingsContainer");
    expect(textSettingsContainer).toBeTruthy();
  });

  it("should update text color in state", () => {
    const appData = {
      enabled: false,
      text: {
        enabled: false
      },
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };
    const setAppState = jest.fn();
    render(
      <StoreContext.Provider value={{appData, setAppState}} >
        <TextSettings />
      </StoreContext.Provider>
    );

    fireEvent.click(screen.getByTestId(COLORS.GRAY));

    expect(setAppState).toHaveBeenCalledWith({
      ...appData,
      text: {
        ...appData.text,
        textColor: COLORS.GRAY
      }
    });
  });

  it("should update text settings enable in the memory", () => {
    const appData = {
      enabled: false,
      text: {
        enabled: false
      },
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };
    const setAppState = jest.fn();
    render(
      <StoreContext.Provider value={{appData, setAppState}} >
        <TextSettings />
      </StoreContext.Provider>
    );

    fireEvent.click(screen.getByTestId('toggle'));

    expect(setAppState).toHaveBeenCalledWith({
      ...appData,
      text: {
        ...appData.text,
        enabled: true
      }
    });
  });

  it("should update font family enable in the memory", () => {
    const appData = {
      enabled: false,
      text: {
        enabled: false
      },
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };
    const setAppState = jest.fn();
    render(
      <StoreContext.Provider value={{appData, setAppState}} >
        <TextSettings />
      </StoreContext.Provider>
    );

    fireEvent.change(screen.getByTestId('drop-down'), { target: { value: 'OpenSans' } });

    expect(setAppState).toHaveBeenCalledWith({
      ...appData,
      text: {
        ...appData.text,
        fontFamily: 'OpenSans'
      }
    });
  });
});
