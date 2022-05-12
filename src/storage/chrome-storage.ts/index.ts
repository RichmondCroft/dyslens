import { StorageData } from "../StoreContext";

export function saveAppState(appState: StorageData) {
  chrome.storage.sync.set({ appState }, () => {
    //updated state
  });
}

export async function fetchAppStateFromStorage(): Promise<StorageData> {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get('appState', (data) => {
        resolve(data as StorageData)
      });
    } catch (error) {
      reject(error);
    }
  });
}