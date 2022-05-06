import { fireEvent, render, screen } from "@testing-library/react";

import changeText from "../../../chrome-utils/changeText";
import DropDownFontText from ".";

jest.mock("../../../chrome-utils/changeText");

describe("test drop down font text function", () => {
  it.only("handleTextChange fn should call changeText fn properly", () => {
    const changeTextImplementation = () => {};
    const mockFn = jest.fn(changeText);

    render(<DropDownFontText />);

    expect(mockFn).toHaveBeenCalled();
  });
});
