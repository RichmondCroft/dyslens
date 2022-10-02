import { Slider, Switch } from "@mui/material";
import { ChangeEvent, useContext, useMemo } from "react";
import { throttle } from 'lodash';

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

  function handleOnOpacityChange(_event: Event, newValue: number) {
    setAppState({
      ...appData,
      overlay: {
        ...appData.overlay,
        opacity: newValue
      }
    })
  }
  const throttledHandleOnOpacityChange = useMemo(() => throttle(handleOnOpacityChange, 500), [appData]);

  return (
    <div data-testid="overLayTintContainer">
      <ComponentContainer label="Enabled" horizontal>
        <Switch data-testId="overlay-tint-switch" checked={appData.overlay.enabled} onChange={handleOnToggleStateChange} />
      </ComponentContainer>
      <ComponentContainer label="Opacity">
        <Slider
          value={appData.overlay.opacity}
          min={0}
          max={1}
          step={0.05}
          onChange={throttledHandleOnOpacityChange}
        />
      </ComponentContainer>
      <ComponentContainer label="Color">
        <ColorPicker testId="overlay-tint-color-picker" color={appData.overlay.color} onChange={handleOnColorChange} />
      </ComponentContainer>
    </div>
  );
}
