import styled from "styled-components";
import changeFont from "../../chrome-utils/changeFont";

const StyledTextSettingsContainer = styled.div``;

function handleFontOnClick() {
  changeFont();
}

export default function TextSettings() {
  return (
    <StyledTextSettingsContainer data-testid="textSettingsContainer">
      this is the text settings
      <button onClick={handleFontOnClick}>click me</button>
    </StyledTextSettingsContainer>
  );
}
