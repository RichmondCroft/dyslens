function insertCss(fontName: string) {
  let url = chrome.runtime.getURL(`fonts/${fontName}-Regular.ttf`);
  return `
    @font-face {
      font-family: ${fontName};
      src: url("${url}");
    }

    * {
      font-family: ${fontName} !important;
    }
  `;
}

export default async function changeText(value: string) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.id) {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: insertCss(value),
    });
  }
  else {
    throw "Current tab id was not found";
  }
}
