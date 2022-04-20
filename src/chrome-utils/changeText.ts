let css = `@font-face {font-family: "OpenSans-Regular";
 src: url("${chrome.runtime.getURL("OpenSans-Regular.ttf")}");}
*{font-Family:"OpenSans-Regular" !important;
letter-spacing:1px;}
`;

export default async function changeText() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.insertCSS({
    target: { tabId: tab.id ? tab.id : 1111 },
    css: css,
  });
}
