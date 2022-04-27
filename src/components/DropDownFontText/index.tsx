import { useState, ChangeEvent } from "react";
export default function DropDownFontText() {
  const [font, setFont] = useState("");
  function handleTextChange(e: ChangeEvent<HTMLSelectElement>) {
    setFont(e.currentTarget.value);
  }

  return (
    <div>
      <select onChange={handleTextChange}>
        <option value={font}>Select Font:</option>
        <option value={font}>Open Sans</option>
      </select>
    </div>
  );
}
