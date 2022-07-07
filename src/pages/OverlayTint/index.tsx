import { useContext } from "react";
import styled from "styled-components";
import BackButton from "../../components/BackButton";

import ColorPicker from "../../components/ColorPicker";
import ComponentContainer from "../../components/ComponentContainer";
import NavigationBar from "../../components/NavigationBar";
import Toggle from "../../components/Toggle";
import StoreContext from "../../storage/StoreContext";

export default function OverlayTint() {
  const { appData, setAppState } = useContext(StoreContext)

  function handleOnToggleStateChange(checked: boolean) {
    setAppState({
      ...appData,
      overlay: {
        ...appData.overlay,
        enabled: checked
      }
    })
  }

  function handleOnColorChange(newColor: string) {
    setAppState({
      ...appData,
      overlay: {
        ...appData.overlay,
        color: newColor
      }
    })
  }

  return (
    <div data-testid="overLayTintContainer">
      <NavigationBar>
        <BackButton/>
      </NavigationBar>
      <ComponentContainer label="Enabled" horizontal>
        <Toggle on={appData.overlay.enabled} onStateChange={handleOnToggleStateChange} />
      </ComponentContainer>
      <ComponentContainer label="Color">
        <ColorPicker color={appData.overlay.color} onChange={handleOnColorChange} />
      </ComponentContainer>
    </div>
  );
}
