# Travel Itinerary Support Architecture

## System Overview

A voice itinerary assistant for a fictional New York (JFK) to Los Angeles (LAX) order. It checks the exact order and traveler key before disclosing details, explains the departure in its configured time zone, and can record a change or cancellation request when tools are enabled.

One Next.js process owns the browser application and its HTTP routes. Agora cloud owns the managed STT → LLM → TTS pipeline; the browser is not a local speech/model runtime. The default provider configuration is recorded in the invite route and `scenarios/runtime-profile.ts`.

## Component Topology

```text
Browser microphone <-> Agora RTC <-> managed Agent
Browser transcript <- Agora RTM <- managed Agent
Browser -- HTTPS --> Next.js token / invite / stop routes
Agent -- optional public HTTPS --> same Next.js scenario routes
Scenario routes -> process-local state
```

## Request And Event Flow

1. The user's start action bootstraps scenario state when needed, then fetches a combined RTC/RTM token.
2. The browser logs into/subscribes to RTM and invites the managed Agent. The invite body contains `requester_id` and `channel_name`.
3. RTC hooks join and publish the microphone after the StrictMode guard; the toolkit binds both transports.
4. Audio travels over RTC. Transcript, Agent state, errors and reported latency travel over RTM.
5. `lookup_travel_order` calls `GET /api/scenarios/10-travel-booking/orders` with `order_id` and `traveler_key`. `update_travel_order` posts the identity, action, request_id and confirmed=true, plus an allowed new_departure for a change. The fixture's original departure is November 5, 2026 at 09:00 EST; its listed change is November 6 at 09:00 EST. These dates do not roll forward.
6. Renewal keeps the joined RTC UID, RTM login UID and channel consistent.
7. Ending stops the Agent, logs out RTM and unmounts hook-owned RTC/microphone resources. Retained evidence is not itself a saved business result.

## Ownership Boundaries

- `components/LandingPage.tsx`: browser startup, RTM bootstrap, renewal and end orchestration.
- `components/ConversationComponent.tsx`: RTC/microphone hooks, toolkit events and transcript snapshots.
- `app/api/generate-agora-token/route.ts`: RTM-capable token creation.
- `app/api/invite-agent/route.ts`: privileged Agent configuration and startup.
- `scenarios/10-travel-booking/`: source of truth for scenario-specific rules and data.
- `scenarios/tool-contracts.ts`: available tools, parameter schemas and server-bound call scope.
- `lib/conversation.ts`: transcript UID/text normalization.

## Authentication And Secrets

The App Certificate stays in the Next.js server environment. Tokens are scoped/expiring; the browser receives tokens rather than the certificate. The public App ID is embedded into the client build and must match the server's project. Sample endpoints do not implement production user authentication. Business capabilities/session IDs limit example scope where implemented; they are not real customer/patient identity verification.

## Runtime Modes

Local development runs one Next.js process at http://localhost:3000 using `.env.local`. Native production uses `pnpm run build` then `pnpm run start`. Docker runs the same app as non-root UID 1001 on port 3000, without a reverse proxy inside the image. Tool-mode orders and replay records live in process-local Maps. Use one long-lived Node process for a consistent demo; restart resets state. Shared durable storage and real traveler authorization are required before multi-instance or real booking-system use.

```bash
docker build --build-arg NEXT_PUBLIC_AGORA_APP_ID=YOUR_AGORA_APP_ID -t 10-travel-booking:local .
docker run --rm -p 3000:3000 --env-file .env.local 10-travel-booking:local
```

Replace `YOUR_AGORA_APP_ID` with the public App ID used in `.env.local`. Next.js embeds that identifier in the browser bundle, so changing projects requires rebuilding the image. The App Certificate is supplied only at container runtime. A container restart does not preserve process memory. This image does not add a shared state service.

`pnpm run verify:docker` independently builds the image with synthetic credentials, starts an isolated localhost-bound container, checks the home page and a scenario route, then removes only that container. It does not contact Agora or prove a live voice session.

## API And External Contracts

The invite body contains `requester_id` and `channel_name`.

The token route returns `{ token, uid, channel }`; stop accepts `{ agent_id }` and handles an already-stopping session idempotently. The prompt contains fixed fictional orders. Matching identity permits itinerary discussion, but the assistant cannot update records or submit a request. `lookup_travel_order` reads a matching order; `update_travel_order` records a confirmed request in process memory. Failed tools cannot fall back to inline order data.

See [Interfaces](docs/ai/L1/06_interfaces.md), [internal recipe](docs/ai/RECIPE.md) and [scenario guide](scenarios/10-travel-booking/README.md) for contracts. Static checks, native startup, Docker startup and complete live speech/tool outcomes are separate evidence.
