# 04 Conventions

> Runtime and change rules for this independent scenario.

## Code Style

Use English TypeScript/documentation and existing ESLint conventions. Keep examples fictional and U.S.-based, with explicit IANA time zones and date-correct offsets. Use pinned pnpm 9.15.9; do not rewrite the lockfile with another major.

## Runtime Patterns

Keep StrictMode `isReady` and stable RTC client ownership. Hook cleanup owns leave, microphone closing and publication. Toolkit initialization follows RTC join/RTM readiness. Preserve local-user UID remap and interrupted turns. Tailwind 4 scans actual components through app/globals.css; do not recreate old HSL-channel wrappers.

`lookup_travel_order` calls `GET /api/scenarios/10-travel-booking/orders` with `order_id` and `traveler_key`. `update_travel_order` posts the identity, action, request_id and confirmed=true, plus an allowed new_departure for a change. The fixture's original departure is November 5, 2026 at 09:00 EST; its listed change is November 6 at 09:00 EST. These dates do not roll forward.

`change_requested` and `cancel_requested` are request states, not a completed ticket change, cancellation or refund. No airline schedule, fare, seat inventory, payment or live traveler-authentication system is connected.

## Testing Patterns

Use mocked API/scenario checks for deterministic contracts and isolated temporary storage for writes. `pnpm run verify` is canonical; `pnpm run verify:docker` separately checks image/startup/route behavior. Real speech and cloud callbacks remain independent. For UI changes, render and inspect actual desktop/mobile states; do not infer visuals from source.

## Documentation Changes

Synchronize README, AGENTS, ARCHITECTURE, public/internal recipes and affected L1/L2 files when workflows, environment, state or interfaces change. Update L0's review date. Every L1 file ends in Related Deep Dives. Use conventional commits only when explicitly requested; remote writes need their own authorization.

## Related Deep Dives

- [StrictMode](L2/strict_mode_lifecycle.md)
- [Transcript pipeline](L2/transcript_pipeline.md)
