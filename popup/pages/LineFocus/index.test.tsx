import { expect } from "@jest/globals";
import { screen, render } from "@testing-library/react";

import TestWrapper from "../../test-utils/TestWrapper";
import LineFocus from ".";

describe("testing LineFocus component", () => {
  it("should render <LineFocus/>", () => {
    render(
      <TestWrapper>
        <LineFocus />
      </TestWrapper>
    );
    let lineFocusContainer = screen.getByTestId("lineFocusContainer");
    expect(lineFocusContainer).toBeTruthy();
  });
});
