import react from "react";
import styled from "styled-components";
import MenuItem from "./../MenuItem";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../constants/Colors";
import TextSettings from "../../pages/TextSettings";

import {
  faClone,
  faA,
  faHighlighter,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

const MenuItemContainer = styled.div`
  padding: 4px 12px;
  background-color: ${COLORS.WARM_WHITE};
`;

export default function NavigationMenu() {
  return (
    <MenuItemContainer>
      <MenuItem
        textHeading="Text Settings"
        messageOverView="Modify text settings"
        icon={faA}
        to="./text-settings"
        element={<TextSettings />}
      />
      <MenuItem
        textHeading="Overlay Tint"
        messageOverView="Display an overlay to 
        make the Text readable"
        icon={faClone}
        to="./overlay-tint"
        element={<TextSettings />}
      />
      <MenuItem
        textHeading="Highlighter"
        messageOverView="Highlight the hovered box"
        icon={faHighlighter}
        to="./highlighter"
        element={<TextSettings />}
      />
      <MenuItem
        textHeading="LineFocus"
        messageOverView="Creates a line overlay for focus"
        icon={faWindowMaximize}
        to="./line-focus"
        element={<TextSettings />}
      />
      <MenuItem
        textHeading="Hide Images"
        messageOverView="Hides images and gifs from the page"
        icon={faImage}
        to="./hide-images"
        element={<TextSettings />}
      />
    </MenuItemContainer>
  );
}
