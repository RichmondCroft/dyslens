# Scenario: Overlay tint applies color to the page

**Covered by:** `e2e/overlay.spec.ts`

## Preconditions
A page is open with the extension's content scripts injected.

## Steps
1. In the popup, navigate to Overlay Tint.
2. Enable the overlay.
3. Select a color.

## Expected result
A floating overlay element appears on the page with the selected background
color.
