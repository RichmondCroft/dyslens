import { useState, ChangeEvent } from "react";
import styled from "styled-components";

import changeText from "../../../chrome-utils/changeText";
import SIZE from "../../../constants/Size";
import { FONTS } from "../../../constants/Fonts";

const StyledDropMenu = styled.div`
  padding: ${SIZE.X_SMALL}px ${SIZE.XX_SMALL}px;
`;

const fontList = [{
    name: 'selectFont',
    displayName: 'Select Font'
  },
  ...Object.values(FONTS)
];

export default function DropDownFontText() {
  const [font, setFont] = useState("Open Sans");
  function handleTextChange(e: ChangeEvent<HTMLSelectElement>) {
    setFont(e.target.value);
    changeText(e.target.value);
  }
  return (
    <StyledDropMenu>
      <select value={font} onChange={handleTextChange}>
        {
          fontList.map((fontItem) =>  
            <option key={fontItem.name} value={fontItem.name}>{fontItem.displayName}</option>
          )
        }
      </select>
    </StyledDropMenu>
  );
}
