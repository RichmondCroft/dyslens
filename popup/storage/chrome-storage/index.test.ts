import { fetchAppStateFromStorage, initialState, saveAppState } from './index';

describe('chrome-storage', () => {
  beforeEach(async () => {
    await chrome.storage.sync.clear();
  });

  describe('fetchAppStateFromStorage', () => {
    it('seeds and returns initialState when storage is empty', async () => {
      const state = await fetchAppStateFromStorage();

      expect(state).toEqual(initialState);
      const { appState } = await chrome.storage.sync.get('appState');
      expect(appState).toEqual(initialState);
    });

    it('returns a stored appState untouched when it already has every key', async () => {
      const storedState = {
        ...initialState,
        overlay: { ...initialState.overlay, enabled: true, opacity: 0.8 },
      };
      await chrome.storage.sync.set({ appState: storedState });

      const state = await fetchAppStateFromStorage();

      expect(state).toEqual(storedState);
    });

    it('backfills a missing top-level key from initialState and persists the reconciled result', async () => {
      const { textToSpeech, ...partialState } = initialState;
      await chrome.storage.sync.set({ appState: partialState });

      const state = await fetchAppStateFromStorage();

      expect(state.textToSpeech).toEqual(initialState.textToSpeech);
      const { appState: persisted } = await chrome.storage.sync.get('appState');
      expect(persisted.textToSpeech).toEqual(initialState.textToSpeech);
    });
  });

  describe('saveAppState', () => {
    it('persists the given state and notifies onChanged listeners', async () => {
      const listener = jest.fn();
      chrome.storage.onChanged.addListener(listener);

      const nextState = { ...initialState, text: { ...initialState.text, enabled: true } };
      await saveAppState(nextState);

      expect(listener).toHaveBeenCalled();
      const [changes] = listener.mock.calls[0];
      expect(changes.appState.newValue).toEqual(nextState);

      const { appState } = await chrome.storage.sync.get('appState');
      expect(appState).toEqual(nextState);
    });
  });
});
