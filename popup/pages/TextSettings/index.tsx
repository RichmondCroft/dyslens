import styled from "styled-components";

import COLORS from "../../constants/colors";
import SIZE from "../../constants/size";
import ColorPicker from "../../components/ColorPicker";
import { ChangeEvent, useContext } from "react";
import StoreContext from "../../storage/StoreContext";
import DropDown from "../../components/DropDown";
import { FONTS } from "../../constants/fonts";
import ComponentContainer from "../../components/ComponentContainer";
import { Switch } from "@mui/material";

const StyledTextSettingsContainer = styled.div`
`;

const DropDownContainer = styled.div`
  margin-top: ${SIZE.X_SMALL}px;
`;

const fontListOptions =
  Object.values(FONTS).map((font) => ({
    displayValue: font.displayName,
    value: font.name
  }));

export default function TextSettings() {
  const { appData, setAppState } = useContext(StoreContext);

  function handleOnEnableChange(_event: ChangeEvent<HTMLInputElement>, checked: boolean) {
    setAppState({
      ...appData,
      text: {
        ...appData.text,
        enabled: checked
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
      <ComponentContainer label="Enable" horizontal>
        <Switch
          checked={appData.text.enabled}
          onChange={handleOnEnableChange}
          data-testId="text-settings-switch"
        />
      </ComponentContainer>
      <ComponentContainer label="Font Family">
        <DropDownContainer>
          <DropDown items={fontListOptions}
            onChange={handleOnFontChange}
            noSelectionItem={{ displayValue: 'default page font', value: "" }}
            value={appData.text.fontFamily || ""}
            testId="text-settings-switch"
          />
        </DropDownContainer>
      </ComponentContainer>
      <ComponentContainer label="Text Color">
        <ColorPicker
          color={appData.text.textColor}
          onChange={handleOnColorChange}
          testId="text-settings-color-picker"
        />
      </ComponentContainer>
    </StyledTextSettingsContainer>
  );
}
