function insertCss(fontName: string) {
  let url = chrome.runtime.getURL(`${fontName}-Regular.ttf`);
  console.log(url);
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
  console.log(value);
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.insertCSS({
    target: { tabId: tab.id ? tab.id : 1111 },
    css: insertCss(value),
  });
}

// export default async function changeText() {
//   console.log("inside async fn");
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   console.log("tab.id", tab.id);
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id ? tab.id : 1111 },
//     func: getTextFont,
//   });
// }

// function getTextFont() {
//   var style = document.createElement("style");
//   const cssStyle = `
//     @font-face {
//         font-family: "OpenSans-Regular";
//         src: url("${chrome.runtime.getURL("OpenSans-Regular.ttf")}");
//     }
//   `;
//   const styling = `
//   *{
//     font-Family:"OpenSans-Regular" !important;
//     letter-spacing:1px;
//   }
//   p{
//     font-weight: 400 !important;
//   }

//   `;
//   style.appendChild(document.createTextNode(cssStyle));
//   style.appendChild(document.createTextNode(styling));

//   document.getElementsByTagName("head")[0].appendChild(style);
// }
