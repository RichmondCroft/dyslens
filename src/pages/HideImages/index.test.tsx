import { expect } from "@jest/globals";
import { screen, render } from "@testing-library/react";

import TestWrapper from "../../test-utils/TestWrapper";
import HideImages from ".";

describe("testing HideImage component", () => {
  it("should render <HideImage/>", () => {
    render(
      <TestWrapper>
        <HideImages />
      </TestWrapper>
    );
    let hideImageContainer = screen.getByTestId("hideImageContainer");
    expect(hideImageContainer).toBeTruthy();
  });
});
