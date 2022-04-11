import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";

import NavigationMenu from ".";

describe("test navigationMenu component", () => {
  it.only("should render navigationMenu component", () => {
    render(<NavigationMenu />);
    const element = screen.getByTestId("menuItemContainer");
    expect(element.childNodes.length).toBe(5);
  });
});
