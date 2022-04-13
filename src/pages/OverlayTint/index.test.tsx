import { expect } from "@jest/globals";
import { screen, render } from "@testing-library/react";

import TestWrapper from "../../test-utils/TestWrapper";
import OverLayTint from ".";

describe("testing OverLayTint component", () => {
  it.only("should render <OverLayTint/>", () => {
    render(
      <TestWrapper>
        <OverLayTint />
      </TestWrapper>
    );
    let overLayTintContainer = screen.getByTestId("overLayTintContainer");
    expect(overLayTintContainer).toBeTruthy();
  });
});
