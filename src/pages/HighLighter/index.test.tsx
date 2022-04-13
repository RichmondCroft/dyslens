import { expect } from "@jest/globals";
import { screen, render } from "@testing-library/react";

import TestWrapper from "../../test-utils/TestWrapper";
import HighLighter from ".";

describe("testing HighLighter component", () => {
  it.only("should render <HighLighter/>", () => {
    render(
      <TestWrapper>
        <HighLighter />
      </TestWrapper>
    );
    let highLighterContainer = screen.getByTestId("highLighterContainer");
    expect(highLighterContainer).toBeTruthy();
  });
});
