// This is the content file run on each page

// Trigger the changes for the tab and send message to background script

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
// });


(async function () {
  const data = await chrome.storage.sync.get('appState');
  if (!data) {
    throw 'storage data not found';
  }

  // if(data.enabled){}
  // if(data.overlay.enabled){
  const floatingDiv = document.createElement('div');
  floatingDiv.classList.add('floating-overlay');
  document.body.appendChild(floatingDiv);
  // }

  floatingDiv.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

  function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
  }

  function mouseDown(e) {
    window.addEventListener('mousemove', divMove, true);
  }

  function divMove(e) {
    floatingDiv.style.position = 'fixed';
    floatingDiv.style.top = e.clientY + 'px';
    // floatingDiv.style.left = e.clientX + 'px';
  }
})()