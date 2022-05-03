import { useState, ChangeEvent } from "react";
import styled from "styled-components";

import changeText from "../../../chrome-utils/changeText";
import SIZE from "../../../constants/Size";

const StyledDropMenu = styled.div`
  padding: ${SIZE.X_SMALL}px ${SIZE.XX_SMALL}px;
`;

export default function DropDownFontText() {
  const [font, setFont] = useState("Open Sans");
  function handleTextChange(e: ChangeEvent<HTMLSelectElement>) {
    setFont(e.target.value);
    changeText(e.target.value);
  }
  return (
    <StyledDropMenu>
      <select value={font} onChange={handleTextChange}>
        <option value="Select Font">Select Font:</option>
        <option value="OpenSans">Open Sans</option>
        <option value="ComicSans">Comic Sans</option>
      </select>
    </StyledDropMenu>
  );
}
