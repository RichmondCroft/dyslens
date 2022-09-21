import { Slider, Switch } from "@mui/material";
import { ChangeEvent, useContext, useMemo } from "react";
import { throttle } from 'lodash';

import ColorPicker from "../../components/ColorPicker";
import ComponentContainer from "../../components/ComponentContainer";
import StoreContext from "../../storage/StoreContext";

export default function LineFocus() {
  const { appData, setAppState } = useContext(StoreContext);

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

  function handleOnOpacityChange(_event: Event, newValue: number) {
    setAppState({
      ...appData,
      lineFocus: {
        ...appData.lineFocus,
        opacity: newValue
      }
    })
  }
  const throttledHandleOnOpacityChange = useMemo(() => throttle(handleOnOpacityChange, 100), [appData]);

  function handleOnHeightChange(e: ChangeEvent<HTMLInputElement>) {
    setAppState({
      ...appData,
      lineFocus: {
        ...appData.lineFocus,
        height: parseInt(e.target.value)
      }
    })
  }
  const throttledHandleOnHeightChange = useMemo(() => throttle(handleOnHeightChange, 100), [appData]);


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
          value={appData.lineFocus.opacity}
          min={0}
          max={1}
          step={0.05}
          onChange={throttledHandleOnOpacityChange}
        />
      </ComponentContainer>
      <ComponentContainer label="Height">
        <Slider
          value={appData.lineFocus.height}
          min={10}
          max={500}
          onChange={throttledHandleOnHeightChange}
        />
      </ComponentContainer>
    </div>
  );
}
