import React, { CSSProperties, useRef, useState, useEffect } from 'react'
import type { PlasmoContentScript } from "plasmo";
import cssText from "data-text:~/contents/css/line-focus.css";

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
}

const quickAndDirtyStyle: CSSProperties = {
  width: "100%",
  height: "200px",
  background: "#FF9900",
  color: "#FFFFFF",
  position: "fixed"
}

const DraggableComponent = () => {
  const [pressed, setPressed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [lineFocusSettings, setLineFocusSettings] = useState(null);
  const ref = useRef<HTMLDivElement>()

  function handleOnStorageChange(changes, _areaName) {
    const newState = changes.appState.newValue;
    setLineFocusSettings(newState.lineFocus);
  }

  useEffect(() => {
    chrome.storage.sync.get('appState').then(({ appState }) => {
      if (!appState) return;
      setLineFocusSettings(appState.lineFocus);
    });

    chrome.storage.onChanged.addListener(handleOnStorageChange);
  }, [setLineFocusSettings, handleOnStorageChange]);

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
  }, [position])

  const onMouseMove = (event) => {
    if (pressed) {
      setPosition({
        x: 0,
        y: position.y + event.movementY
      })
    }
  }

  const style = lineFocusSettings && lineFocusSettings.enabled ? {
    height: `${lineFocusSettings.height}px`,
    backgroundColor: lineFocusSettings.color,
    opacity: lineFocusSettings.opacity
  } : {};

  return (
    lineFocusSettings && lineFocusSettings.enabled && <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="line-focus"
      />
  )
}

export default DraggableComponent