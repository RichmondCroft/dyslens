import { Slider, Switch } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";

import ColorPicker from "../../components/ColorPicker";
import ComponentContainer from "../../components/ComponentContainer";
import StoreContext from "../../storage/StoreContext";

export default function LineFocus() {
  const { appData, setAppState } = useContext(StoreContext);

  const [height, setHeight] = useState(appData.lineFocus.height);
  const [opacity, setOpacity] = useState(appData.lineFocus.opacity);

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

  function handleOnOpacityChangeCommitted(_event: Event, newValue: number) {
    setAppState({
      ...appData,
      lineFocus: {
        ...appData.lineFocus,
        opacity: newValue
      }
    });
  }
  function handleOnOpacityChange(_event: Event, newValue: number) {
    setOpacity(newValue);
  }

  function handleOnHeightChangeCommitted(_event: ChangeEvent<HTMLInputElement>, newValue: number) {
    setAppState({
      ...appData,
      lineFocus: {
        ...appData.lineFocus,
        height: newValue
      }
    });
  }

  function handleOnHeightChange(_event: Event, newValue: number) {
    setHeight(newValue);
  }

  return (
    <div data-testid="lineFocusContainer">
      <ComponentContainer label="Enabled" horizontal>
        <Switch
          data-testId="line-focus-switch"
          checked={appData.lineFocus.enabled}
          onChange={handleOnToggleStateChange}
        />
      </ComponentContainer>
      <ComponentContainer label="Color">
        <ColorPicker
          testId="line-focus-color-picker"
          color={appData.lineFocus.color}
          onChange={handleOnColorChange}
        />
      </ComponentContainer>
      <ComponentContainer label="Opacity">
        <Slider
          value={opacity}
          min={0}
          max={1}
          step={0.05}
          onChange={handleOnOpacityChange}
          onChangeCommitted={handleOnOpacityChangeCommitted}
        />
      </ComponentContainer>
      <ComponentContainer label="Height">
        <Slider
          value={height}
          min={10}
          max={500}
          onChange={handleOnHeightChange}
          onChangeCommitted={handleOnHeightChangeCommitted}
        />
      </ComponentContainer>
    </div>
  );
}
