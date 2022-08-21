import { Switch } from "@mui/material";
import { ChangeEvent, useContext } from "react";

import ColorPicker from "../../components/ColorPicker";
import ComponentContainer from "../../components/ComponentContainer";
import StoreContext from "../../storage/StoreContext";

export default function LineFocus() {
  const { appData, setAppState } = useContext(StoreContext)

  function handleOnToggleStateChange(_event: ChangeEvent<HTMLInputElement>, checked: boolean) {
    setAppState({
      ...appData,
      lineFocus: {
        ...appData.lineFocus,
        enabled: checked
      }
    })
  }

  function handleOnColorChange(newColor: string) {
    setAppState({
      ...appData,
      lineFocus: {
        ...appData.lineFocus,
        color: newColor
      }
    })
  }

  return (
    <div data-testid="lineFocusContainer">
      <ComponentContainer label="Enabled" horizontal>
        <Switch checked={appData.lineFocus.enabled} onChange={handleOnToggleStateChange} />
      </ComponentContainer>
      <ComponentContainer label="Color">
        <ColorPicker color={appData.lineFocus.color} onChange={handleOnColorChange} />
      </ComponentContainer>
    </div>
  );
}
