# Travel and transportation booking acceptance criteria

## Required checks

- Identity and order must match before itinerary lookup.
- Lookup results match the fixed order data.
- Rescheduling and cancellation require explicit user confirmation.
- Tool failures preserve the original order state.
- Repeated rescheduling/cancellation requests do not produce duplicate changes.
- The Agent distinguishes submitted requests from confirmed changes.

## Suggested cases

1. Look up a valid itinerary.
2. Identity mismatch.
3. Reschedule to an available time.
4. Reschedule to an unavailable time.
5. Retry after failed cancellation.
6. Submit the same change request repeatedly.

## Evidence

- Order state snapshots before and after changes.
- Tool calls, confirmation text and request IDs.
- Records showing failures did not incorrectly modify state.
