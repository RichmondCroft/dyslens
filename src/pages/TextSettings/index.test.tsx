import { expect } from "@jest/globals";
import { screen, render } from "@testing-library/react";

import TestWrapper from "../../test-utils/TestWrapper";
import TextSettings from ".";

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
});
