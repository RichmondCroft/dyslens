# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Dyslens is a Chrome extension (Manifest V3) that makes the web more accessible for people with dyslexia. It lets a reader toggle text styling (dyslexia-friendly fonts/colors), a screen overlay/tint, line-focus highlighting, and text-to-speech on any page. Built with [Plasmo](https://docs.plasmo.com/) (React + TypeScript framework for Chrome extensions).

## Commands

```
npm install       # install dependencies
npm run dev        # plasmo dev — builds unpacked extension to build/chrome-mv3-dev with watch mode
npm run build       # plasmo build — production build
npm run e2e        # jest --detectOpenHandles — runs Puppeteer e2e tests against the built extension
```

There is no separate lint/typecheck script; `plasmo build`/`plasmo dev` runs the TypeScript compiler as part of the build.

### Running e2e tests

- e2e tests (`e2e/launch.test.ts`) drive the **built** extension with Puppeteer, so run `npm run build` (or have a `build/chrome-mv3-dev` from `npm run dev`) before `npm run e2e`.
- `e2e/constants.ts` hardcodes `EXTENSION_ID` and `POPUP_FILE` (the popup's hashed filename). These are derived from the current build output — if the build output changes (e.g. popup bundle hash changes), these constants must be updated or the e2e tests will fail to find the extension pages.
- e2e tests spin up a local static server (`e2e/testPageServer.ts`) on port 3000 (`TEST_PAGE_SERVER_PORT`) serving `e2e/test-pages/basic-page.html`, and drive both the popup page and the served page in the same Puppeteer browser instance.

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
