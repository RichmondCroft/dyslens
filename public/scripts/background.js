// This is the main file which will contain all the logic

// listen to Local storage changes


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");


    const el = document.createElement('div');
    el.innerText ="HIIIIIIIII";
    document.appendChild(el);

    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});


  }
);