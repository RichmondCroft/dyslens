import styled from "styled-components";

import ChangeSize from "../../components/InnerTextSettingPage/ChangeSize";
import DropDownFontText from "../../components/InnerTextSettingPage/DropDownFontText";
import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
import ColorPicker from "../../components/ColorPicker";
import Toggle from "../../components/Toggle";
import { useContext } from "react";
import StoreContext from "../../storage/StoreContext";

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
  const { appData, setAppState } = useContext(StoreContext);

  function handleOnEnableChange(val: boolean) {
    setAppState({
      ...appData,
      text: {
        ...appData.text,
        enabled: val
      }
    })
  }

  function handleOnColorChange(color: string) {
    setAppState({
      ...appData,
      text: {
        ...appData.text,
        textColor: color
      }
    })
  }

  return (
    <StyledTextSettingsContainer data-testid="textSettingsContainer">
      <Toggle on={appData.text.enabled} onStateChange={handleOnEnableChange} />
      <p>The quick brown fox jumps over the lazy dog</p>
      <DropDownFontText />
      <ChangeSize />
      <ColorPicker color={appData.text.textColor} onChange={handleOnColorChange} />
    </StyledTextSettingsContainer>
  );
}
