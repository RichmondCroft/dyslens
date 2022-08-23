import COLORS from "../../constants/colors";
import type { AppData } from "../StoreContext";

const initialState = {
  enabled: false,
  text: {
    enabled: false
  },
  overlay: {
    enabled: false,
    color: COLORS.LIGHT_YELLOW,
    opacity: 0.5
  },
  lineFocus: {
    enabled: false,
    color: COLORS.LIGHT_YELLOW,
    opacity: 0.5,
    height: 200
  }
}

export function saveAppState(appState: AppData) {
  return chrome.storage.sync.set({ appState });
}

export async function fetchAppStateFromStorage(): Promise<AppData> {
  return new Promise(async (resolve) => {
    const data = await chrome.storage.sync.get('appState');
    console.log('data', data);
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