import { useState, ChangeEvent } from "react";

import changeText from "../../../chrome-utils/changeText";

export default function DropDownFontText() {
  const [font, setFont] = useState("Open Sans");
  function handleTextChange(e: ChangeEvent<HTMLSelectElement>) {
    setFont(e.target.value);
    changeText(e.target.value);
  }
  return (
    <div>
      <select value={font} onChange={handleTextChange}>
        <option value="Select Font">Select Font:</option>
        <option value="OpenSans">Open Sans</option>
        <option value="ComicSans">Comic Sans</option>
      </select>
    </div>
  );
}
