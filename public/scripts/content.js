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

console.log('hi there');

(async function () {
  const data = await chrome.storage.sync.get('appState');
  if (!data) {
    throw 'storage data not found';
  }

  // if(data.enabled){}
  // if(data.overlay.enabled){
  renderFloatingOverlay();
  // }
})()