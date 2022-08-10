import { useEffect, useMemo, useState } from "react";
import type { PlasmoContentScript } from "plasmo";
import cssText from "data-text:~/contents/Overlay/styles.css";

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
}

function handleOnWindowCursorMove(event) {

}

const LineReader = () => {
  const [overlaySettings, setOverlaySettings] = useState(null);
  const [offset, setOffset] = useState([0, 0]);
  const [positionInsideOverlay, setPositionInsideOverlay] = useState([0, 0]);
  const [isMoving, setIsMoving] = useState(false);
  
  const moveFn = useMemo(() => (e) => {
    console.log('move:', positionInsideOverlay, e.clientX, e.clientY, [
      positionInsideOverlay[0] + e.clientX,
      positionInsideOverlay[1] + e.clientY
    ])
    setOffset([
      positionInsideOverlay[0] + e.clientX,
      positionInsideOverlay[1] + e.clientY
    ]);
  }, [positionInsideOverlay]);

  useEffect(() => {
    chrome.storage.sync.get('appState').then(({ appState }) => {
      setOverlaySettings(appState.overlay);
    });
  }, []);

  function handleOnMouseUp(e) {
    console.log('up:', offset, e.clientX, e.clientY, [
      offset[0] - e.clientX,
      offset[1] - e.clientY
    ])
    setPositionInsideOverlay([
      offset[0] - e.clientX,
      offset[1] - e.clientY
    ]);
    window.removeEventListener('mousemove', handleOnOverlayMove, true);
    setIsMoving(false);
    // setPositionInsideOverlay([0, 0])
  }

  function handleOnMouseDown(e) {
    console.log('down:', offset, e.clientX, e.clientY, [
      e.clientX - offset[0],
      e.clientY - offset[1]
    ]);
    setPositionInsideOverlay([
      e.clientX - offset[0],
      e.clientY - offset[1]
    ]);
    setIsMoving(true);
    window.addEventListener('mousemove', handleOnOverlayMove, true);
  }

  function handleOnOverlayMove(e) {
    console.log('move:', isMoving, positionInsideOverlay, e.clientX, e.clientY, [
      positionInsideOverlay[0] + e.clientX,
      positionInsideOverlay[1] + e.clientY
    ])
    if(!isMoving){
      return;
    }
    setOffset([
      positionInsideOverlay[0] + e.clientX,
      positionInsideOverlay[1] + e.clientY
    ]);
  }

  return (
    overlaySettings &&
    overlaySettings.enabled &&
    <div
      className="floating-overlay"
      style={{
        backgroundColor: overlaySettings.color,
        top: offset[1],
        position: 'fixed'
      }}
      onMouseUp={handleOnMouseUp}
      onMouseDown={handleOnMouseDown}
    />
  )
}

export default LineReader;