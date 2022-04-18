export default async function changeFont() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id ? tab.id : 1111 },
    func: getTextFont,
  });
}

function getTextFont() {
  var style = document.createElement("style");
  // creates a problem, it applies to all bt what if the webside has a transparent overlay div (eg. mdn website)
  const cssStyle = `
      * {
        background-color: #FEFBEB !important;
        color: black !important;
      }
    `;

  style.appendChild(document.createTextNode(cssStyle));
  document.getElementsByTagName("head")[0].appendChild(style);
}
