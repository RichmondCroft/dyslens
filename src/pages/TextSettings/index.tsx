import styled from "styled-components";
import changeText from "../../chrome-utils/changeText";
import COLORS from "../../constants/Colors";
import SIZE from "../../constants/Size";
const StyledTextSettingsContainer = styled.div`
  display: flex;
  flex-flow: column;
  padding: ${SIZE.XX_SMALL}px ${SIZE.SMALL}px;
  width: fit-content;
  margin: auto;
  background: ${COLORS.WARM_WHITE};
  border: 1px solid ${COLORS.GRAY};
  box-shadow: ${SIZE.ZERO}px ${SIZE.XX_SMALL}px ${SIZE.XX_SMALL}px
    ${COLORS.SPECIAL};
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
      <p>The quick brown fox jumps over the lazy dog</p>
      <div>
        <select onChange={handleTextChange}>
          <option value="0">Select Font:</option>
          <option value="1">Open Sans</option>
        </select>
      </div>
      {/* <button onClick={handleTextChange}>change text</button> */}
      <StyledSliderContainer>
        <label htmlFor="sizePx">Size:</label>
        <input type="range" id="sizePx" name="sizePx" min="0" max="100" />
      </StyledSliderContainer>
    </StyledTextSettingsContainer>
  );
}
