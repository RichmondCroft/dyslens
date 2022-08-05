import cssText from "data-text:~/contents/index.css"

const FLOATING_DIV_ID = 'floating-overlay';
const TEXT_STYLE_ID = 'text-style-id';

function renderFloatingOverlay({ color }) {
  const floatingDiv = document.createElement('div');
  floatingDiv.id = FLOATING_DIV_ID;
  floatingDiv.classList.add('floating-overlay');
  floatingDiv.style.background = color;
  document.body.appendChild(floatingDiv);

  floatingDiv.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

  let offset = [0, 0];

  function mouseUp(e) {
    offset = [
      floatingDiv.offsetLeft - e.clientX,
      floatingDiv.offsetTop - e.clientY
    ];
    window.removeEventListener('mousemove', handleOnOverlayMove, true);
  }

  function mouseDown(e) {
    offset = [
      floatingDiv.offsetLeft - e.clientX,
      floatingDiv.offsetTop - e.clientY
    ];
    window.addEventListener('mousemove', handleOnOverlayMove, true);
  }

  function handleOnOverlayMove(e) {
    floatingDiv.style.position = 'fixed';
    floatingDiv.style.top = e.clientY + offset[1] + 'px';
  }
}

function removeFloatingOverlay() {
  const overlay = document.getElementById(FLOATING_DIV_ID);
  overlay.remove();
}

function addTextStyles(textSettings) {
  if (!textSettings.enabled) {
    return;
  }

  let url = chrome.runtime.getURL(`assets/fonts/${textSettings.fontFamily}-Regular.ttf`);
  const css = `
    ${textSettings.fontFamily ? `
      @font-face {
        font-family: ${textSettings.fontFamily};
        src: url("${url}");
      }
      `
      :
      ''
    }

    * {
      ${textSettings.textColor ? `color: ${textSettings.textColor} !important;` : ''} 
      ${textSettings.fontFamily ? `font-family: ${textSettings.fontFamily} !important;` : ''} 
    }
  `;
  const head = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.id = TEXT_STYLE_ID;
  head.appendChild(styleEl);
  styleEl.appendChild(document.createTextNode(css));
}

function removeTextStyles() {
  const styleEl = document.getElementById(TEXT_STYLE_ID);
  if (styleEl) {
    styleEl.remove();
  }
}

function handleOnStorageChange(changes, areaName) {
  const newState = changes.appState.newValue;
  const oldState = changes.appState.oldValue;

  if (newState.overlay.enabled !== oldState.overlay.enabled) {
    // change in state
    newState.overlay.enabled ? renderFloatingOverlay(newState.overlay) : removeFloatingOverlay();
  }

  if (newState.overlay.color !== oldState.overlay.color) {
    const overlay = document.getElementById(FLOATING_DIV_ID);
    if (overlay) {
      overlay.style.background = newState.overlay.color;
    }
  }

  if (
    newState.text.enabled !== oldState.text.enabled ||
    newState.text.fontFamily !== oldState.text.fontFamily ||
    newState.text.textColor !== oldState.text.textColor
  ) {
    removeTextStyles();
    addTextStyles(newState.text);
  }
}

(async function () {
  chrome.storage.onChanged.addListener(handleOnStorageChange)

  const { appState } = await chrome.storage.sync.get('appState');
  if (!appState) {
    throw 'storage data not found';
  }

  if (appState.overlay.enabled) {
    renderFloatingOverlay(appState.overlay);
  }

  if (appState.text.enabled) {
    addTextStyles(appState.text);
  }
})()


export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default {};