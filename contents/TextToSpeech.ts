function cancelSpeechIfSpeaking() {
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
  }
}

async function handleOnMouseUp() {
  // In some cases the text selection/de-selection will not happen immediately
  // or synchronously to handle this situation I have added timeout
  setTimeout(async () => {
    cancelSpeechIfSpeaking();

    var selectedText = window.getSelection().toString();
    if (!selectedText.trim()) {
      return;
    }

    const { appState } = await chrome.storage.sync.get('appState');

    let utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.pitch = appState?.textToSpeech?.pitch || 1;
    utterance.rate = appState?.textToSpeech?.rate || 1;
    utterance.volume = appState?.textToSpeech?.volume || 1;

    let voice = null;
    if (appState?.textToSpeech?.voice) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find((v) => v.name === appState?.textToSpeech?.voice)
      voice = selectedVoice;
    }

    utterance.voice = voice;

    speechSynthesis.speak(utterance);
  }, 10);
}

async function applyTextToSpeechSettings() {
  const { appState } = await chrome.storage.sync.get('appState');
  if (appState && appState.textToSpeech && appState.textToSpeech.enabled) {
    document.addEventListener('mouseup', handleOnMouseUp);
  }
  else {
    document.removeEventListener('mouseup', handleOnMouseUp);
  }
}

(function () {
  chrome.storage.onChanged.addListener(applyTextToSpeechSettings);
  applyTextToSpeechSettings();
})()

export { };