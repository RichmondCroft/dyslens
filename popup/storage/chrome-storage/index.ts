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

async function setInitialState(): Promise<AppData> {
  await chrome.storage.sync.set({ appState: initialState });
  return initialState;
}

async function verifyAndReconciliationOfState(appState: AppData): Promise<AppData> {
  let shouldUpdateChromeStore = false;
  for (let key in initialState) {
    if (!appState[key]) {
      appState[key] = initialState[key];
      shouldUpdateChromeStore = true;
    } else {
      appState[key] = appState[key];
    }
  }

  if (shouldUpdateChromeStore) {
    await saveAppState(appState);
  }

  return appState;
}

export async function fetchAppStateFromStorage(): Promise<AppData> {
  return new Promise(async (resolve) => {
    const data = await chrome.storage.sync.get('appState');
    if (data && data.appState) {
      const reconciledState = await verifyAndReconciliationOfState(data.appState);
      resolve(reconciledState)
    }
    else {
      await chrome.storage.sync.set({ appState: initialState });
      resolve(initialState)
    }
  });
}