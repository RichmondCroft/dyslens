import styled from "styled-components";
import changeText from "../../chrome-utils/changeText";

const StyledTextSettingsContainer = styled.div`
  max-width: 150px;
  height: 150px;
`;
function handleTextChange() {
  console.log("inside function button clicked");
  changeText();
}

export default function TextSettings() {
  return (
    <StyledTextSettingsContainer data-testid="textSettingsContainer">
      <button onClick={handleTextChange}>change text</button>
      <input type="range"></input>
    </StyledTextSettingsContainer>
  );
}
