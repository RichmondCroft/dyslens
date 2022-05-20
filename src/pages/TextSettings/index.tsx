import styled from "styled-components";

import ChangeSize from "../../components/InnerTextSettingPage/ChangeSize";
import DropDownFontText from "../../components/InnerTextSettingPage/DropDownFontText";
import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
import ColorPicker from "../../components/ColorPicker";
import Toggle from "../../components/Toggle";
import { useContext } from "react";
import StoreContext from "../../storage/StoreContext";
import DropDown from "../../components/DropDown";
import { FONTS } from "../../constants/fonts";

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

const fontList = Object.values(FONTS).map((font) => ({
  displayValue: font.displayName,
  value: font.name
}))

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

  function handleOnFontChange(fontFamily?: string) {
    setAppState({
      ...appData,
      text: {
        ...appData.text,
        fontFamily
      }
    })
  }

  return (
    <StyledTextSettingsContainer data-testid="textSettingsContainer">
      <Toggle on={appData.text.enabled} onStateChange={handleOnEnableChange} />
      <p>The quick brown fox jumps over the lazy dog</p>
      <DropDown items={fontList}
        onChange={handleOnFontChange}
        noSelectionItem={{ displayValue: 'Select a font', value: 'no-selection' }}
        value={appData.text.fontFamily}
      />
      <ChangeSize />
      <ColorPicker color={appData.text.textColor} onChange={handleOnColorChange} />
    </StyledTextSettingsContainer>
  );
}
