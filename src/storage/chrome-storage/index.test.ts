import { saveAppState, fetchAppStateFromStorage } from '.';
import COLORS from '../../constants/colors';

describe('src/storage/chrome-storage/index.ts', () => {
  beforeAll(() => {
    global.chrome = {
      storage: {
        sync: {
        } as unknown as typeof chrome.storage.sync // need to convert to unknown
      } as typeof chrome.storage
    } as typeof chrome
  })

  it('should set the store value in the chrome app', () => {
    const appState = {
      enabled: false,
      text: {},
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };

    global.chrome.storage.sync.set = jest.fn();

    saveAppState(appState);

    expect(global.chrome.storage.sync.set).toHaveBeenCalledWith({ appState });
  });

  it('should be able to fetch data from local storage when data exists', async () => {
    const appState = {
      enabled: false,
      text: {},
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };

    global.chrome.storage.sync.get = jest.fn().mockImplementation((key) => Promise.resolve({ appState }));

    const response = await fetchAppStateFromStorage();

    expect(global.chrome.storage.sync.get).toHaveBeenCalledWith('appState');
    expect(response).toBe(response);
  });

  it('should be able to return initial data when data does not exists in storage', async () => {
    const appState = {
      enabled: false,
      text: {},
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };

    global.chrome.storage.sync.get = jest.fn().mockImplementation((key) => Promise.resolve());

    const response = await fetchAppStateFromStorage();

    expect(global.chrome.storage.sync.get).toHaveBeenCalledWith('appState');
    expect(response).toMatchObject({
      enabled: false,
      text: {
      },
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    });
  });
});