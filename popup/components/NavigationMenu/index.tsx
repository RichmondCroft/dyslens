import styled from "styled-components";
// import { faImage } from "@fortawesome/free-solid-svg-icons";
import {
  faClone,
  faA,
  // faHighlighter,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

import MenuItem from "./../MenuItem";
import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";

const MenuItemContainer = styled.div`
  padding: ${SIZE.XX_SMALL}px ${SIZE.SMALL}px;
`;

export default function NavigationMenu() {
  return (
    <MenuItemContainer data-testid="menuItemContainer">
      <MenuItem
        textHeading="Text Settings"
        messageOverView="Modify text settings"
        icon={faA}
        to="/text-settings"
        testId="text-settings"
      />
      <MenuItem
        textHeading="Overlay Tint"
        messageOverView="Display an overlay to 
        make the Text readable"
        icon={faClone}
        to="/overlay-tint"
        testId="overlay-tint"
      />
      <MenuItem
        textHeading="LineFocus"
        messageOverView="Creates a line overlay for focus"
        icon={faWindowMaximize}
        to="/line-focus"
        testId="line-focus"
      />
      {/* <MenuItem
        textHeading="Highlighter"
        messageOverView="Highlight the hovered box"
        icon={faHighlighter}
        to="/highlighter"
      />
      <MenuItem
        textHeading="Hide Images"
        messageOverView="Hides images and gifs from the page"
        icon={faImage}
        to="/hide-images"
      /> */}
    </MenuItemContainer>
  );
}
