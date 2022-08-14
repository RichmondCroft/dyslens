chrome.storage.sync.get('appState').then(({ appState }) => {
  console.log('appState', appState);
});

export default {};