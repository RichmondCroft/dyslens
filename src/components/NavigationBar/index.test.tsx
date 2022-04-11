import { render, screen, getNodeText } from "@testing-library/react";
import { expect } from "@jest/globals";

import NavigationBar from ".";

describe("testing navigation bar component", () => {
  it.only("should render <navigationBar/>", () => {
    render(<NavigationBar />);
    const element = screen.getByTestId("navBarContainer");
    expect(element.childNodes.length).toBe(2);

    const containDyslensText = screen.getByTestId("dyslensText");
    expect(containDyslensText).toHaveTextContent("dyslens");
  });
});
