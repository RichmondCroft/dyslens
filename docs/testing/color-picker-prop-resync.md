# Scenario: ColorPicker resyncs to an externally changed color prop

**Covered by:** `popup/components/ColorPicker/index.test.tsx`
**Layer:** unit
**Related issue:** #148 (regression test — currently failing by design)

## Preconditions
`ColorPicker` is rendered with `color={A}` and shows `A` as selected.

## Steps
1. Render `ColorPicker` with `color={A}`.
2. Re-render the same component with `color={B}` (simulating `appData`
   changing for a reason other than this component's own `onChange`, e.g.
   external state reconciliation).

## Expected result
`B` should be shown as selected and `A` should no longer be shown as
selected.

## Current (buggy) behavior
`ColorPicker` seeds its selected color from the `color` prop via
`useState(color)` only once at mount and never resyncs afterwards, so `A`
remains visually selected after the prop changes to `B`. This test is written
with Jest's `test.failing` so it documents the bug and will start passing
(and need its `test.failing` removed) once issue #148 is fixed.
