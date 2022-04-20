import styled from "styled-components";
import changeText from "../../chrome-utils/changeText";

const StyledTextSettingsContainer = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 150px;
  height: 150px;
`;

const StyledSliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  width: 350px;
  height: 97px;
`;

function handleTextChange() {
  console.log("inside function button clicked");
  changeText();
}

export default function TextSettings() {
  return (
    <StyledTextSettingsContainer data-testid="textSettingsContainer">
      <button onClick={handleTextChange}>change text</button>
      <StyledSliderContainer>
        <label htmlFor="sizePx">Size:</label>
        <input type="range" id="sizePx" name="sizePx" min="0" max="100" />
      </StyledSliderContainer>
    </StyledTextSettingsContainer>
  );
}
