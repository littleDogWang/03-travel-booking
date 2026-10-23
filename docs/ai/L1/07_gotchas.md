# 07 Gotchas

> High-impact setup and business-state pitfalls.

## Setup Pitfalls

- pnpm 8 does not match lockfile 9; use declared pnpm 9.15.9.
- Missing .env.local values fail doctor; do not log or paste credentials.
- Docker needs a running engine and the public App ID at build time. A runtime-only ID cannot repair an already-built client bundle.
- A private/localhost callback URL cannot be used as a cloud business-tool origin.

## Runtime Pitfalls

The prompt contains fixed fictional orders. Matching identity permits itinerary discussion, but the assistant cannot update records or submit a request.

`change_requested` and `cancel_requested` are request states, not a completed ticket change, cancellation or refund. No airline schedule, fare, seat inventory, payment or live traveler-authentication system is connected.

Tool-mode orders and replay records live in process-local Maps. Use one long-lived Node process for a consistent demo; restart resets state. Shared durable storage and real traveler authorization are required before multi-instance or real booking-system use.

Keep combined token privileges, StrictMode initialization, toolkit readiness and hook-owned cleanup. A missing transcript is an RTM/event question, not evidence that the model never responded. Tool failures cannot silently fall back to fixture success.

## Documentation Or Contract Drift

The repository identity must be `littleDogWang/10-travel-booking`, while upstream attribution remains separate. Keep invite fields, data paths, time zones, Docker volume behavior and pnpm/verification commands synchronized. Run `pnpm run verify:template` for structure/link drift and the canonical checks for source behavior.

## Related Deep Dives

- [Lifecycle](L2/conversation_lifecycle.md)
- [Transcript pipeline](L2/transcript_pipeline.md)
