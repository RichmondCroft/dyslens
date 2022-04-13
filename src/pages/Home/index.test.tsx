import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import TestWrapper from "../../test-utils/TestWrapper";
import Home from ".";

describe("testing Home page", () => {
  it("should render Home page", () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    let HomePageContainer = screen.getByTestId("homePageContainer");
    expect(HomePageContainer.childNodes.length).toBe(2);
  });
});
