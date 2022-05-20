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
  background: ${COLORS.WARM_WHITE};
  border: 1px solid ${COLORS.GRAY};
  box-shadow: ${SIZE.ZERO}px ${SIZE.XX_SMALL}px ${SIZE.XX_SMALL}px
    ${COLORS.SPECIAL};
`;

const DropDownContainer = styled.div`
  margin-top: ${SIZE.X_SMALL}px;
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

  return (
    <StyledTextSettingsContainer data-testid="textSettingsContainer">
      <ComponentContainer label="Enable" horizontal>
        <Toggle on={appData.text.enabled} onStateChange={handleOnEnableChange} />
      </ComponentContainer>
      <ComponentContainer label="Font Family">
        <DropDownContainer>
          <DropDown items={fontList}
            onChange={handleOnFontChange}
            noSelectionItem={{ displayValue: 'Select a font', value: 'no-selection' }}
            value={appData.text.fontFamily}
          />
        </DropDownContainer>
      </ComponentContainer>
      <ComponentContainer label="Text Color">
        <ColorPicker color={appData.text.textColor} onChange={handleOnColorChange} />
      </ComponentContainer>
    </StyledTextSettingsContainer>
  );
}
