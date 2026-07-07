# Scenario: Text settings apply font and color to the page

**Covered by:** `e2e/text-settings.spec.ts`

## Preconditions
A page is open with the extension's content scripts injected.

## Steps
1. In the popup, navigate to Text Settings.
2. Enable text settings.
3. Select a font (e.g. Comic Sans).
4. Select a text color.

## Expected result
The page's text (e.g. the sample page's header) is rendered in the selected
font family and color.
