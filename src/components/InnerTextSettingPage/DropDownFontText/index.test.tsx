import { fireEvent, render, screen } from "@testing-library/react";

import changeText from "../../../chrome-utils/changeText";
import DropDownFontText from ".";

jest.mock("../../../chrome-utils/changeText", () => {
  return jest.fn();
});

describe("test drop down font text function", () => {
  it.only("handleTextChange fn should call changeText fn properly", () => {
    render(<DropDownFontText />);
    const dropDownmenu = screen.getByTestId("drop-down-font-text");
    fireEvent.change(dropDownmenu, { target: { value: "OpenSans" } });
    expect(changeText).toHaveBeenCalled();
  });
});
