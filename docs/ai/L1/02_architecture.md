# 02 Architecture

> Topology and state ownership for Travel Itinerary Support.

## Components

One Next.js App Router process serves the browser and routes. RTC carries audio; RTM carries transcript, Agent state, metrics and errors. The server SDK manages the cloud STT/LLM/TTS Agent. Scenario files define the business behavior.

## Data And Event Flow

The user start action creates any necessary scenario session, fetches the combined RTC/RTM token and bootstraps RTM plus invite. RTC/microphone hooks wait for the StrictMode guard. Toolkit events feed transcript and Inspector. Renew both token identities consistently; end calls stop, logs out RTM and unmounts hook-owned resources.

The invite body contains `requester_id` and `channel_name`.

`lookup_travel_order` calls `GET /api/scenarios/10-travel-booking/orders` with `order_id` and `traveler_key`. `update_travel_order` posts the identity, action, request_id and confirmed=true, plus an allowed new_departure for a change. The fixture's original departure is November 5, 2026 at 09:00 EST; its listed change is November 6 at 09:00 EST. These dates do not roll forward.

## Ownership Boundaries

LandingPage owns pre-call bootstrap/RTM; ConversationComponent owns joined RTC/toolkit subscriptions. Token/invite/stop routes own privileged operations. `scenarios/10-travel-booking/` owns business rules/data; tool-contracts owns server-bound tool execution scope. Session evidence and manually selected outcomes are not automatic proof of business completion.

## Runtime Modes

Local development runs one Next.js process at http://localhost:3000 using `.env.local`. Native production uses `pnpm run build` then `pnpm run start`. Docker runs the same app as non-root UID 1001 on port 3000, without a reverse proxy inside the image. Tool-mode orders and replay records live in process-local Maps. Use one long-lived Node process for a consistent demo; restart resets state. Shared durable storage and real traveler authorization are required before multi-instance or real booking-system use.

Docker embeds the public App ID at build and receives the certificate only at runtime. It copies the actual runtime fixtures and supplies a non-root-owned data directory. File-backed scenarios require a retained writable volume; process-local scenarios require a single long-lived process. See [full architecture](../../../ARCHITECTURE.md).

## Related Deep Dives

- [Lifecycle](L2/conversation_lifecycle.md)
- [Tokens](L2/token_model.md)
