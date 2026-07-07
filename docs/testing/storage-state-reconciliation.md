# Scenario: Storage state reconciliation backfills missing keys

**Covered by:** `popup/storage/chrome-storage/index.test.ts`
**Layer:** unit
**Related issue:** #150

## Preconditions
`chrome.storage.sync` contains an `appState` object that is missing one or
more top-level keys present in `initialState` (e.g. saved before a new
feature was added, so the newer key was never persisted).

## Steps
1. Seed `chrome.storage.sync` with an `appState` object missing the
   `textToSpeech` key.
2. Call `fetchAppStateFromStorage()`.

## Expected result
The returned state has `textToSpeech` backfilled from `initialState`, and the
reconciled (backfilled) state is persisted back to `chrome.storage.sync` so
future reads don't need to reconcile again.
