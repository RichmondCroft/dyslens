import { useEffect, useMemo, useState } from "react";
import type { PlasmoContentScript } from "plasmo";
import cssText from "data-text:~/contents/css/overlay.css";

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  document.head.appendChild(style);
}

export const getRootContainer = () => {
  getStyle();
  const rootContainer = document.createElement('div');
  document.body.appendChild(rootContainer);
  return rootContainer;
}

const Overlay = () => {
  const [overlaySettings, setOverlaySettings] = useState(null);

  function handleOnStorageChange(changes, _areaName) {
    const newState = changes.appState.newValue;
    setOverlaySettings(newState.overlay);
  }

  useEffect(() => {
    chrome.storage.sync.get('appState').then(({ appState }) => {
      if (!appState) return;
      setOverlaySettings(appState.overlay);
    });

    chrome.storage.onChanged.addListener(handleOnStorageChange);
  }, [setOverlaySettings, handleOnStorageChange]);

  return (
    overlaySettings &&
    overlaySettings.enabled &&
    <div
      className="floating-overlay"
      data-testid="floating-overlay"
      style={{
        backgroundColor: overlaySettings.color,
      }}
    />
  )
}

export default Overlay;