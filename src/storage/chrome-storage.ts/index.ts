import COLORS from "../../constants/colors";
import { StorageData } from "../StoreContext";

const initialState = {
  enabled: false,
  text: {
  },
  overlay: {
    enabled: false,
    color: COLORS.LIGHT_YELLOW
  }
}

export function saveAppState(appState: StorageData) {
  return chrome.storage.sync.set({ appState });
}

export async function fetchAppStateFromStorage(): Promise<StorageData> {
  return new Promise(async (resolve) => {
    const data = await chrome.storage.sync.get('appState');
    if (data && data.appState) {
      resolve(data.appState as StorageData)
      return;
    }
    else {
      await chrome.storage.sync.set({ appState: initialState });
      resolve(initialState)
    }
  });
}