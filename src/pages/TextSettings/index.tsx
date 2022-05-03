import styled from "styled-components";

import ChangeSize from "../../components/InnerTextSettingPage/ChangeSize";
import DropDownFontText from "../../components/InnerTextSettingPage/DropDownFontText";
import COLORS from "../../constants/Colors";
import SIZE from "../../constants/Size";
import ColorPicker from "../../components/ColorPicker";

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

// const StyledTextColorContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 350px;
//   height: 97px;
//   align-items: center;
// `;

export default function TextSettings() {
  return (
    <StyledTextSettingsContainer data-testid="textSettingsContainer">
      <p>The quick brown fox jumps over the lazy dog</p>
      <DropDownFontText />
      <ChangeSize />
      <ColorPicker />
    </StyledTextSettingsContainer>
  );
}
