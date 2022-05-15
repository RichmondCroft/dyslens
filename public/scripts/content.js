// This is the content file run on each page

// Trigger the changes for the tab and send message to background script

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
// });

const FLOATING_DIV_ID = 'floating-overlay';

function renderFloatingOverlay() {
  const floatingDiv = document.createElement('div');
  floatingDiv.id = FLOATING_DIV_ID;
  floatingDiv.classList.add('floating-overlay');
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

function handleOnStorageChange(changes, areaName) {
  const newState = changes.appState.newValue;
  const oldState = changes.appState.oldValue;
  
  if(newState.overlay.enabled !== oldState.overlay.enabled){
    // change in state
    newState.overlay.enabled ? renderFloatingOverlay() : removeFloatingOverlay();
  }
}

(async function () {
  chrome.storage.onChanged.addListener(handleOnStorageChange)

  const {appState} = await chrome.storage.sync.get('appState');
  if (!appState) {
    throw 'storage data not found';
  }

  if (appState.overlay.enabled) {
    renderFloatingOverlay();
  }
})()