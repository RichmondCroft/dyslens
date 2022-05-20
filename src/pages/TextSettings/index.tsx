import styled from "styled-components";

import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
import ColorPicker from "../../components/ColorPicker";
import Toggle from "../../components/Toggle";
import { useContext } from "react";
import StoreContext from "../../storage/StoreContext";
import DropDown from "../../components/DropDown";
import { FONTS } from "../../constants/fonts";
import ComponentContainer from "../../components/ComponentContainer";

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

const Spacer = styled.div`
  padding: ${SIZE.XX_SMALL}px 0;
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
      <Spacer />
      <ComponentContainer label="Enable">
        <Toggle on={appData.text.enabled} onStateChange={handleOnEnableChange} />
      </ComponentContainer>
      <Spacer />
      <ComponentContainer label="Font Family">
        <DropDown items={fontList}
          onChange={handleOnFontChange}
          noSelectionItem={{ displayValue: 'Select a font', value: 'no-selection' }}
          value={appData.text.fontFamily}
        />
      </ComponentContainer>
      <Spacer />
      <ComponentContainer label="Text Color">
        <ColorPicker color={appData.text.textColor} onChange={handleOnColorChange} />
      </ComponentContainer>
    </StyledTextSettingsContainer>
  );
}
