# Travel and transportation booking design

## Positioning

Priority P10. Implement last because it combines live lookup, modification, cancellation and consistency across multiple states.

## Target flow

The user provides identity and itinerary information. The Agent looks up simulated orders, explains itinerary status and submits rescheduling or cancellation requests after explicit confirmation. Unconfirmed or failed actions preserve the original order state.

## First release scope

- Data: fixed orders, itineraries and available times.
- Tools: order lookup, simulated rescheduling and simulated cancellation.
- Channel: Web/RTC; real telephone/IVR integration comes later.
- Excluded: real ticketing/transportation systems, multiple providers, payments and cross-system compensation.

## Failure handling

Identity mismatches, nonexistent orders, unavailable rescheduling, failed cancellation and repeated requests must return explicit states. The Agent must not claim success solely from user statements.
