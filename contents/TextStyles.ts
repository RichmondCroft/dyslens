const TEXT_STYLE_ID = 'text-style-id';

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

  if (appState.text.enabled) {
    addTextStyles(appState.text);
  }
})()

export default {};