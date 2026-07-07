# Scenario: Saving app state persists and notifies listeners

**Covered by:** `popup/storage/chrome-storage/index.test.ts`
**Layer:** unit
**Related issue:** #150

## Preconditions
A listener is registered via `chrome.storage.onChanged.addListener(...)` —
this mirrors how every content script (`Overlay.tsx`, `LineFocus.tsx`,
`TextStyles.ts`, `TextToSpeech.ts`) reacts to popup changes, since
`chrome.storage.sync` is the only channel between the popup and content
scripts.

## Steps
1. Register an `onChanged` listener.
2. Call `saveAppState(nextState)` with a modified `AppData` object.

## Expected result
- `chrome.storage.sync.get('appState')` returns `nextState`.
- The registered `onChanged` listener is invoked with a `changes.appState`
  object whose `newValue` equals `nextState`.

## Note
The test environment's `chrome.storage` mock (`jest-webextension-mock`) does
not natively dispatch `onChanged` on `.set()` — a small shim
(`test/wireStorageOnChanged.ts`) restores that real-browser behavior for the
unit-test layer so this scenario can be verified.
