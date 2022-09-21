import { Switch } from "@mui/material";
import { ChangeEvent, useContext } from "react";
import styled from "styled-components";

import ColorPicker from "../../components/ColorPicker";
import ComponentContainer from "../../components/ComponentContainer";
import StoreContext from "../../storage/StoreContext";

export default function OverlayTint() {
  const { appData, setAppState } = useContext(StoreContext)

  function handleOnToggleStateChange(_event: ChangeEvent<HTMLInputElement>, checked: boolean) {
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
      <ComponentContainer label="Enabled" horizontal>
        <Switch data-testId="overlay-tint-switch" checked={appData.overlay.enabled} onChange={handleOnToggleStateChange} />
      </ComponentContainer>
      <ComponentContainer label="Color">
        <ColorPicker testId="overlay-tint-color-picker" color={appData.overlay.color} onChange={handleOnColorChange} />
      </ComponentContainer>
    </div>
  );
}
