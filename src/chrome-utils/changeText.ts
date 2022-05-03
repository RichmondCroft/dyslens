function insertCss(fontName: string) {
  let url = chrome.runtime.getURL(`${fontName}-Regular.ttf`);
  let css = `
  @font-face {
    font-family: ${fontName};
    src: url("${url}");
  }

  * {
    font-family: ${fontName} !important;
  }
`;
  return css;
}

export default async function changeText(value: string) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.insertCSS({
    target: { tabId: tab.id ? tab.id : 1111 },
    css: insertCss(value),
  });
}
