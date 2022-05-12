import { saveAppState, fetchAppStateFromStorage } from '.';
import COLORS from '../../constants/colors';

describe('src/storage/chrome-storage.ts/index.ts', () => {
  beforeAll(() => {
    global.chrome = {
      storage: {
        sync: {
          // set: async (items: any) => { },
          // get: () => { }
        } as any
      } as any
    } as any
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

    expect(global.chrome.storage.sync.set).toHaveBeenCalledWith({ appState }, expect.anything());
  });

  it('should be able to fetch data from local storage', async () => {
    const appState = {
      enabled: false,
      text: {},
      overlay: {
        enabled: false,
        color: COLORS.LIGHT_YELLOW
      }
    };

    global.chrome.storage.sync.get = jest.fn().mockImplementation((key, fn)=> {
      fn({appState})
    });

    const response = await fetchAppStateFromStorage();

    expect(global.chrome.storage.sync.get).toHaveBeenCalledWith('appState', expect.anything());
  });
});