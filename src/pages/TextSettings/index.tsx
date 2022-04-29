import styled from "styled-components";
import { useState, ChangeEvent } from "react";
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

export default function TextSettings() {
  const [font, setFont] = useState("Open Sans");
  function handleTextChange(e: ChangeEvent<HTMLSelectElement>) {
    console.log("inside function button clicked");
    setFont(e.target.value);
    changeText(e.target.value);
  }
  return (
    <StyledTextSettingsContainer data-testid="textSettingsContainer">
      <p>The quick brown fox jumps over the lazy dog</p>
      <div>
        <select value={font} onChange={handleTextChange}>
          <option value="Select Font">Select Font:</option>
          <option value="OpenSans">Open Sans</option>
          <option value="ComicSans">Comic Sans</option>
        </select>
      </div>
      <StyledSliderContainer>
        <label htmlFor="sizePx">Size:</label>
        <input type="range" id="sizePx" name="sizePx" min="0" max="100" />
      </StyledSliderContainer>
    </StyledTextSettingsContainer>
  );
}
