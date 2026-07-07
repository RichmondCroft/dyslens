# Scenario: Popup navigation

**Covered by:** `e2e/popup-navigation.spec.ts`

## Preconditions
The extension popup is open on its home page.

## Steps
1. Click the "Text Settings" menu item.
2. Click the back button.

## Expected result
Clicking the menu item navigates to the Text Settings page. Clicking back
returns to the home page.
