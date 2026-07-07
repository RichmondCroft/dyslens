# Scenario: hexToRgb conversion

**Covered by:** `utils/hexToRgb.test.ts`
**Layer:** unit
**Related issue:** #150

## Preconditions
None — pure function.

## Steps
1. Call `hexToRgb(hex)` with a valid 6-digit hex color string (with and
   without a leading `#`, and in mixed case).
2. Call `hexToRgb(hex)` with an invalid string.

## Expected result
- Valid hex strings resolve to the `rgb(r, g, b)` string form that
  `getComputedStyle(...).color`/`.backgroundColor` returns in the e2e suite's
  assertions (this is what makes the two comparable).
- Case doesn't affect the result.
- An invalid string returns `null`.
