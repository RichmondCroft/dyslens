import ColorsLists from "~popup/constants/colorsList";
import type { AppData } from "../StoreContext";

export const initialState: AppData = {
  enabled: false,
  text: {
    enabled: false,
    textColor: undefined,
    fontFamily: 'OpenDyslexic',
  },
  overlay: {
    enabled: false,
    color: ColorsLists[0],
    opacity: 0.5
  },
  lineFocus: {
    enabled: false,
    color: ColorsLists[0],
    opacity: 0.5,
    height: 100
  },
  textToSpeech: {
    enabled: false,
    pitch: 1,
    rate: 1,
    voice: undefined,
    volume: 1
  }
}

export function saveAppState(appState: AppData) {
  return chrome.storage.sync.set({ appState });
}

export async function fetchAppStateFromStorage(): Promise<AppData> {
  return new Promise(async (resolve) => {
    const data = await chrome.storage.sync.get('appState');
    if (data && data.appState) {
      resolve(data.appState as AppData)
      return;
    }
    else {
      await chrome.storage.sync.set({ appState: initialState });
      resolve(initialState)
    }
  });
}