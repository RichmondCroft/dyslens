import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";

import TestWrapper from "../../test-utils/TestWrapper";
import NavigationMenu from ".";

describe("test navigationMenu component", () => {
  it("should render navigationMenu component", () => {
    render(<TestWrapper><NavigationMenu /></TestWrapper>);
    const element = screen.getByTestId("menuItemContainer");
    expect(element.childNodes.length).toBe(2);
  });
});
