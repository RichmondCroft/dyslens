export function refreshActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
}