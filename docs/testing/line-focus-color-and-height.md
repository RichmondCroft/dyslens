# Scenario: Line focus applies color and height to the page

**Covered by:** `e2e/line-focus.spec.ts`

## Preconditions
A page is open with the extension's content scripts injected.

## Steps
1. In the popup, navigate to Line Focus.
2. Enable line focus.
3. Select a color.
4. Adjust the height slider.

## Expected result
A line-focus overlay element appears on the page with the selected
background color and height.
