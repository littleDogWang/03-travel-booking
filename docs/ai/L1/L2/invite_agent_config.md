# Scenario Agent Configuration

> Read when changing Travel Itinerary Support's prompt, tools, provider chain or turn detection.

## Source Files

- `scenarios/10-travel-booking/config.ts`: role, workflow, guardrails and greeting.
- `scenarios/index.ts`: selected prompt and default/tool mode context.
- `scenarios/tool-contracts.ts`: optional tool origin validation, schemas and server-bound scope.
- `app/api/invite-agent/route.ts`: actual SDK builder and session options.
- `scenarios/runtime-profile.ts`: non-secret configured provider/model display.

There are no generic Ada/ADA_PROMPT constants to edit. Use the scenario config and prompt assembly actually imported by the invite route.

## Request And Startup

The invite body contains `requester_id` and `channel_name`.

The server reads the App ID and App Certificate, builds AgoraClient with the selected area, and creates an Agent. The configured pipeline is Deepgram nova-3, OpenAI gpt-4o-mini and MiniMax speech_2_6_turbo. Copy the route's current builder pattern and createSession options; do not add an extra client argument or reproduce older SDK signatures.

The browser and invite route share DEFAULT_AGENT_UID. RTM, transcript/error delivery and metrics remain enabled. Session startup returns the Agent ID, creation timestamp and state; ending uses that same Agent ID.

## Prompt And Tools

Default behavior: The prompt contains fixed fictional orders. Matching identity permits itinerary discussion, but the assistant cannot update records or submit a request.

Tool behavior: `lookup_travel_order` reads a matching order; `update_travel_order` records a confirmed request in process memory. Failed tools cannot fall back to inline order data.

`lookup_travel_order` calls `GET /api/scenarios/10-travel-booking/orders` with `order_id` and `traveler_key`. `update_travel_order` posts the identity, action, request_id and confirmed=true, plus an allowed new_departure for a change. The fixture's original departure is November 5, 2026 at 09:00 EST; its listed change is November 6 at 09:00 EST. These dates do not roll forward.

`change_requested` and `cancel_requested` are request states, not a completed ticket change, cancellation or refund. No airline schedule, fare, seat inventory, payment or live traveler-authentication system is connected.

## Provider And Turn Detection Changes

Edit the actual constructor blocks and turnDetection.config fields in the invite route. Provider BYOK examples are opt-in; keys stay server-side and are not part of the default two-key environment contract. For recruitment, preserve the configured 1,500 ms end-of-speech pause and 50-message LLM history unless intentionally changing interview pacing.

## Verification

Run `pnpm run verify:api`, `pnpm run verify:scenario` and canonical `pnpm run verify`. Real microphone pacing, interruptions and cloud HTTP execution require separate acceptance; mock Agent startup cannot establish those outcomes.

## See Also

- [Interfaces](../06_interfaces.md)
- [Workflows](../05_workflows.md)
- [Token model](token_model.md)
