import { useEffect, useMemo, useState } from "react";
import type { PlasmoContentScript } from "plasmo";
import cssText from "data-text:~/contents/css/overlay.css";

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
}

const Overlay = () => {
  const [overlaySettings, setOverlaySettings] = useState(null);

  function handleOnStorageChange(changes, _areaName) {
    const newState = changes.appState.newValue;
    setOverlaySettings(newState.overlay);
  }

  useEffect(() => {
    chrome.storage.sync.get('appState').then(({ appState }) => {
      setOverlaySettings(appState.overlay);
    });

    chrome.storage.onChanged.addListener(handleOnStorageChange);
  }, [setOverlaySettings, handleOnStorageChange]);

  return (
    overlaySettings &&
    overlaySettings.enabled &&
    <div
      className="floating-overlay"
      style={{
        backgroundColor: overlaySettings.color,
      }}
    />
  )
}

export default Overlay;