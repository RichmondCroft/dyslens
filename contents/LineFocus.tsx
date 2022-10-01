import React, { useRef, useState, useEffect } from 'react'
import type { PlasmoContentScript } from "plasmo";
import cssText from "data-text:~/contents/css/line-focus.css";

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
      let y = position.y + event.movementY;
      if ((position.y + event.movementY) < 0) {
        y = 0;
      }
      if ((position.y + event.movementY) > (window.innerHeight - lineFocusSettings.height)) {
        y = window.innerHeight - lineFocusSettings.height;
      }
      setPosition({
        x: 0,
        y
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