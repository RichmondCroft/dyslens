import { render, screen, getNodeText } from "@testing-library/react";
import { expect } from "@jest/globals";

import NavigationBar from ".";
import TestWrapper from "../../test-utils/TestWrapper";

describe("testing navigation bar component", () => {
  it("should render <navigationBar/>", () => {
    render(
      <TestWrapper>
        <NavigationBar />
      </TestWrapper>
    );
    const element = screen.getByTestId("navBarContainer");
    expect(element.childNodes.length).toBe(2);

    const containDyslensText = screen.getByTestId("dyslensText");
    expect(containDyslensText).toHaveTextContent("Dyslens");
  });
});
