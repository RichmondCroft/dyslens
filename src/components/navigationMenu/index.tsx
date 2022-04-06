import react from "react";
import MenuItem from "./../menuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFontAwesomeFlag,
  faFontAwesome,
  faImage,
  faClone,
  faA,
  faHighlighter,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

export default function NavigationMenu() {
  return (
    <div>
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
    </div>
  );
}
