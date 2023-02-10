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
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [touchPressed, setTouchPressed] = useState(false);
  const [touchedPosition, setTouchedPosition] = useState({ x: 0, y: 0 })
  const [lineFocusSettings, setLineFocusSettings] = useState(null);
  const ref = useRef<HTMLDivElement>()

  function handleOnStorageChange(changes, _areaName) {
    const newState = changes.appState.newValue;
    setLineFocusSettings(newState.lineFocus);
  }

  useEffect(() => {
    chrome.storage.sync.get('appState').then(({ appState }) => {
      console.log("appstate", appState)
      if (!appState) return;
      setLineFocusSettings(appState.lineFocus);
    });

    chrome.storage.onChanged.addListener(handleOnStorageChange);
  }, [setLineFocusSettings]);

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${touchedPosition.x}px, ${touchedPosition.y}px)`
    }

  }, [touchPressed]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }

  }, [position])

  useEffect(() => {
    function onMouseMove(event) {
      let y = event.clientY - lineFocusSettings.height / 2
      setPosition({
        x: 0,
        y: y < 0 ? 0 : y
      });
    }

    if (pressed) {
      window.addEventListener('mousemove', onMouseMove, true);
    }
    else {
      window.removeEventListener('mousemove', onMouseMove, true);
    }



    function onTouchMove(event) {
      let y = event.touches[0].clientY - lineFocusSettings.height / 2
      setTouchedPosition({
        x: 0,
        y: y < 0 ? 0 : y
      });
    }

    if (touchPressed) {
      window.addEventListener('touchmove', onTouchMove, true);

    }
    else {
      window.removeEventListener('touchmove', onTouchMove, true);
    }

    return (() => {
      if (touchPressed) {
        window.removeEventListener('touchmove', onTouchMove, true);
      }
      else {
        window.removeEventListener('mousemove', onMouseMove, true);
      }
    })

  }, [pressed, position, touchPressed, touchedPosition, lineFocusSettings]);



  const style = lineFocusSettings && lineFocusSettings.enabled ? {
    height: `${lineFocusSettings.height}px`,
    backgroundColor: lineFocusSettings.color,
    opacity: lineFocusSettings.opacity
  } : {};

  return (
    lineFocusSettings && lineFocusSettings.enabled && <div
      ref={ref}
      style={style}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setTouchPressed(true)}
      onTouchEnd={() => setTouchPressed(false)}
      className="line-focus"
    />
  )
}

export default DraggableComponent