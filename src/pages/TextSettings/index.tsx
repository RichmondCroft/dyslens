import styled from "styled-components";

import ChangeSize from "../../components/InnerTextSettingPage/ChangeSize";
import DropDownFontText from "../../components/InnerTextSettingPage/DropDownFontText";
import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
import ColorPicker from "../../components/ColorPicker";

const StyledTextSettingsContainer = styled.div`
  display: flex;
  flex-flow: column;
  padding: ${SIZE.XX_SMALL}px ${SIZE.SMALL}px;
  margin: auto;
  background: ${COLORS.WARM_WHITE};
  border: 1px solid ${COLORS.GRAY};
  box-shadow: ${SIZE.ZERO}px ${SIZE.XX_SMALL}px ${SIZE.XX_SMALL}px
    ${COLORS.SPECIAL};
`;

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
