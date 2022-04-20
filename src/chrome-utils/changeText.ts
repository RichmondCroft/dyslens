export default async function changeText() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id ? tab.id : 1111 },
    func: getTextFont,
  });
}

function getTextFont() {
  var style = document.createElement("style");
  const cssStyle = `
    @font-face { 
        font-family: "OpenSans-Regular"; 
        src: url("${chrome.runtime.getURL("OpenSans-Regular.ttf")}");
    }
  `;
  const styling = `
  *{
    font-Family:"OpenSans-Regular" !important;
    letter-spacing:1px;
  }
  p{
    font-weight: 400 !important;
  }
  
  `;
  style.appendChild(document.createTextNode(cssStyle));
  style.appendChild(document.createTextNode(styling));

  document.getElementsByTagName("head")[0].appendChild(style);
}
