# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Dyslens is a Chrome extension (Manifest V3) that makes the web more accessible for people with dyslexia. It lets a reader toggle text styling (dyslexia-friendly fonts/colors), a screen overlay/tint, line-focus highlighting, and text-to-speech on any page. Built with [Plasmo](https://docs.plasmo.com/) (React + TypeScript framework for Chrome extensions).

## Commands

```
npm install       # install dependencies
npm run dev        # plasmo dev — builds unpacked extension to build/chrome-mv3-dev with watch mode
npm run build       # plasmo build — production build, outputs to build/chrome-mv3-prod
npm run test:unit    # jest — fast unit tests (jsdom + chrome.* API mock), no browser needed
npm run e2e        # builds the extension, then runs the Playwright e2e suite against it
```

There is no separate lint/typecheck script; `plasmo build`/`plasmo dev` runs the TypeScript compiler as part of the build.

### Unit tests (`npm run test:unit`)

- Jest + jsdom, config at `jest.config.js`. `chrome.*` APIs are mocked via `jest-webextension-mock`; `test/wireStorageOnChanged.ts` is a required companion shim — the mock library does **not** actually invoke `chrome.storage.onChanged` listeners on `.set()`, so this shim restores that real-browser behavior (needed since `chrome.storage.onChanged` is this extension's only popup↔content-script communication channel).
- Tests are co-located with source (`*.test.ts`/`*.test.tsx` next to the file they cover), not under a parallel `__tests__/` tree.
- Some tests intentionally use Jest's `test.failing` to document known bugs (e.g. `ColorPicker`/`DropDown` prop-resync issues) without failing the suite — don't "fix" these by deleting the assertion; the fix is to actually fix the underlying bug and then remove `test.failing`.

### e2e tests (`npm run e2e`)

- Playwright, config at `playwright.config.ts`, specs at `e2e/*.spec.ts`. Requires the **production** build (`build/chrome-mv3-prod`, from `npm run build`/`plasmo build`) — not `build/chrome-mv3-dev` (that's only produced by `plasmo dev`'s watch mode, which isn't suitable for a one-shot CI/test build).
- `e2e/fixtures.ts` loads the unpacked extension via `chromium.launchPersistentContext(..., { channel: 'chromium', headless: true, args: ['--disable-extensions-except=...', '--load-extension=...'] })` — Playwright's own bundled Chromium supports loading extensions headlessly. The extension ID and popup filename are derived at runtime from the launched service worker's URL and the built `manifest.json` respectively — never hardcoded, so they can't go stale across builds.
- `e2e/testPageServer.ts` is a small static file server for `e2e/test-pages/*.html`, started/stopped via `e2e/globalSetup.ts`/`globalTeardown.ts` (referenced from `playwright.config.ts`) rather than per-test lifecycle hooks.
- `docs/testing/` has one markdown scenario file per e2e test scenario (precondition/steps/expected-result), linking back to its spec file. This is for automated e2e scenarios only — unit tests aren't documented this way.

### Loading the extension manually in Chrome

After `npm run dev` or `npm run build`, load `build/chrome-mv3-dev` (or `chrome-mv3-prod`) as an unpacked extension via `chrome://extensions` → Developer mode → Load unpacked. See `docs/TechStuff.md`.

## Architecture

### State flow: popup ↔ chrome.storage.sync ↔ content scripts

This is the core pattern in the codebase and the thing to understand before changing any feature:

1. **`popup/`** is the extension popup UI (React, MUI, styled-components, react-router `MemoryRouter`). All settings live in a single `AppData` object (`popup/storage/StoreContext/index.ts`) with top-level keys: `text`, `overlay`, `lineFocus`, `textToSpeech`, each with its own `enabled` flag plus feature-specific fields (color, opacity, font, etc.).
2. `popup/storage/chrome-storage/index.ts` owns `initialState`, `fetchAppStateFromStorage()` (reads + reconciles missing keys against `initialState`, self-healing storage shape drift), and `saveAppState()` (writes the whole `appState` object to `chrome.storage.sync`).
3. `popup/App.tsx` loads state on mount via `fetchAppStateFromStorage`, holds it in React state, and exposes it plus a setter through `StoreContext`. Each settings page (`popup/pages/*`) reads/writes via this context and calls `saveAppState` on change — there's no partial-update API, the whole `AppData` blob is written each time.
4. **`contents/`** holds Plasmo content scripts injected into every page (`matches: ["<all_urls>"]`). Each one (`Overlay.tsx`, `LineFocus.tsx`, `TextStyles.ts`, `TextToSpeech.ts`) independently reads `chrome.storage.sync.get('appState')` on load and subscribes to `chrome.storage.onChanged` to react live to popup changes — there is no messaging between popup and content scripts, only storage as the shared channel.
5. **`background/index.ts`** is minimal — currently just sets an uninstall survey URL. It does not mediate state.

When adding a new feature/setting: add its shape to `AppData` and `initialState`, add a popup page under `popup/pages/` wired into `popup/App.tsx`'s `<Routes>`, and add/extend a content script that listens for the corresponding `appState` sub-key changes.

### Content script patterns

- React-based content scripts (`Overlay.tsx`, `LineFocus.tsx`) export a `config: PlasmoContentScript` with `matches`, and a `getRootContainer()` that injects a `<style>` tag (from a `data-text:` CSS import) and mounts a detached root `<div>` into `document.body` — Plasmo picks up the default export as the component to render into that container.
- Non-React content scripts (`TextStyles.ts`, `TextToSpeech.ts`) are plain IIFEs/functions that directly manipulate the DOM (inject/remove a `<style id="...">` tag) in response to storage changes, without a rendered component.
- CSS for injected UI lives alongside in `contents/css/*.css` and is imported with Plasmo's `data-text:` import syntax so it can be manually injected into the page's `<head>` (needed since content scripts render outside the normal document flow/shadow DOM boundary here).

### Fonts and constants

`popup/constants/fonts.ts` maps font names to files served from `assets/` (declared as `web_accessible_resources` in `package.json`'s `manifest` block so content scripts can `@font-face` them via `chrome.runtime.getURL`). `popup/constants/colorsList.ts` / `colors.ts` centralize the color palette used across popup pages and e2e test assertions.

## Code style

- Prettier config (`.prettierrc.cjs`): no semicolons, double quotes, 2-space indent, no trailing commas.
- Import order is enforced via `@plasmohq/prettier-plugin-sort-imports`: `@plasmohq/*` first, then `~`-aliased absolute imports (`~popup/...`, root-relative via the `~*` path alias in `tsconfig.json`), then relative imports — each group separated by a blank line.

## CI

- `.github/workflows/main.yml`: on every push/PR, runs `npm install` + `npm run build` (no test step currently wired into CI).
- `.github/workflows/submit.yml`: manual (`workflow_dispatch`) — builds and zips with pnpm, then publishes to the Chrome Web Store via `PlasmoHQ/bpp`.
