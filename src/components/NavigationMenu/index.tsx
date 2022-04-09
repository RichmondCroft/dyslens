import react from "react";
import styled from "styled-components";
import MenuItem from "./../MenuItem";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../constants/Colors";

import {
  faClone,
  faA,
  faHighlighter,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";
import SIZE from "../../constants/Size";

const MenuItemContainer = styled.div`
  padding: ${SIZE.XX_SMALL}px ${SIZE.SMALL}px;
  background-color: ${COLORS.WARM_WHITE};
`;

export default function NavigationMenu() {
  return (
    <MenuItemContainer>
      <MenuItem
        textHeading="Text Settings"
        messageOverView="Modify text settings"
        icon={faA}
      />
      <MenuItem
        textHeading="Overlay Tint"
        messageOverView="Display an overlay to 
        make the Text readable"
        icon={faClone}
      />
      <MenuItem
        textHeading="Highlighter"
        messageOverView="Highlight the hovered box"
        icon={faHighlighter}
      />
      <MenuItem
        textHeading="LineFocus"
        messageOverView="Creates a line overlay for focus"
        icon={faWindowMaximize}
      />
      <MenuItem
        textHeading="Hide Images"
        messageOverView="Hides images and gifs from the page"
        icon={faImage}
      />
    </MenuItemContainer>
  );
}
