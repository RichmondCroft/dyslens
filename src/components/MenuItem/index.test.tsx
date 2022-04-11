import React, { ReactNode } from "react";
import {
  render,
  screen,
  fireEvent,
  getNodeText,
  within,
  getByText,
} from "@testing-library/react";
import { expect } from "@jest/globals";

import MenuItem from ".";
import { MemoryRouter } from "react-router-dom";
import {
  faA,
  faClone,
  faHighlighter,
  faImage,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: ReactNode;
};

function TestWrapper({ children }: Props) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe("testing menuItem component", () => {
  it("should render the <menuItem/>with Text Settings ", () => {
    render(
      <TestWrapper>
        <MenuItem
          textHeading="Text Settings"
          messageOverView="Modify text settings"
          icon={faA}
          to="/text-settings"
        />
      </TestWrapper>
    );
    const element = screen.getByTestId("menuItemBox");
    expect(element.childNodes.length).toBe(3);
  });

  it("should render the <menuItem/> with Overlay Tint", () => {
    render(
      <TestWrapper>
        <MenuItem
          textHeading="Overlay Tint"
          messageOverView="Display an overlay to 
        make the Text readable"
          icon={faClone}
          to="/overlay-tint"
        />
      </TestWrapper>
    );
    const element = screen.getByTestId("menuItemBox");
    expect(element.childNodes.length).toBe(3);
  });

  it("should render the <menuItem/> with highlighter", () => {
    render(
      <TestWrapper>
        <MenuItem
          textHeading="Highlighter"
          messageOverView="Highlight the hovered box"
          icon={faHighlighter}
          to="/highlighter"
        />
      </TestWrapper>
    );
    const element = screen.getByTestId("menuItemBox");
    expect(element.childNodes.length).toBe(3);
  });

  it("should render the <menuItem/> with Line focus", () => {
    render(
      <TestWrapper>
        <MenuItem
          textHeading="LineFocus"
          messageOverView="Creates a line overlay for focus"
          icon={faWindowMaximize}
          to="/line-focus"
        />
      </TestWrapper>
    );
    const element = screen.getByTestId("menuItemBox");
    expect(element.childNodes.length).toBe(3);
  });
  it("should render the <menuItem/> with hide images", () => {
    render(
      <TestWrapper>
        <MenuItem
          textHeading="Hide Images"
          messageOverView="Hides images and gifs from the page"
          icon={faImage}
          to="/hide-images"
        />
      </TestWrapper>
    );
    const element = screen.getByTestId("menuItemBox");
    expect(element.childNodes.length).toBe(3);
  });
});
