export default async function changeTextColor(color: string) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if(tab.id) {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id ? tab.id : 1111 },
      css: insertTextColor(color),
    });
  }
  else {
    throw "Current tab id not found."
  }
}

function insertTextColor(colorText: string) {
  let css = `
    @font-face {
      color: ${colorText};
      
    }
  
    * {
      color: ${colorText} !important;
    }
  `;
  return css;
}
