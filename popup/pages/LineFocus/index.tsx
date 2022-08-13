import { useContext } from "react";

import ColorPicker from "../../components/ColorPicker";
import ComponentContainer from "../../components/ComponentContainer";
import Toggle from "../../components/Toggle";
import StoreContext from "../../storage/StoreContext";

export default function LineFocus() {
  const { appData, setAppState } = useContext(StoreContext)

  function handleOnToggleStateChange(checked: boolean) {
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
    <div data-testid="overLayTintContainer">
      <ComponentContainer label="Enabled" horizontal>
        <Toggle on={appData.overlay.enabled} onStateChange={handleOnToggleStateChange} />
      </ComponentContainer>
      <ComponentContainer label="Color">
        <ColorPicker color={appData.overlay.color} onChange={handleOnColorChange} />
      </ComponentContainer>
    </div>
  );
}
