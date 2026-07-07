# Scenario: DropDown resyncs to an externally changed value prop

**Covered by:** `popup/components/DropDown/index.test.tsx`
**Layer:** unit
**Related issue:** #147 (regression test — currently failing by design)

## Preconditions
`DropDown` is rendered with `value={A}` and displays `A`'s label.

## Steps
1. Render `DropDown` with `value={A}`.
2. Re-render the same component with `value={B}` (simulating `appData`
   changing for a reason other than this component's own `onChange`).

## Expected result
The dropdown should display `B`'s label.

## Current (buggy) behavior
`DropDown` seeds its displayed value from the `value` prop via
`useState(value)` only once at mount and never resyncs afterwards, so it
keeps displaying `A`'s label after the prop changes to `B`. This test is
written with Jest's `test.failing` so it documents the bug and will start
passing (and need its `test.failing` removed) once issue #147 is fixed.
