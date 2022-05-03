import changeText from "../../chrome-utils/changeText";

function handleTextChange() {
  changeText();
}

export default function TextSettings() {
  return (
    <div data-testid="textSettingsContainer">
      <button onClick={handleTextChange}>change text</button>
    </div>
  );
}
