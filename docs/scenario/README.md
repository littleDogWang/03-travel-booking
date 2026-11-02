# Travel Booking Assistant

Talk through travel plans, itinerary questions and possible next steps.

## Conversation flow

Ask what travel question the caller wants to discuss. Use only itinerary details the caller chooses to provide in this conversation. Clarify origin, destination, travel date, local time zone and desired change only when relevant. Help the caller organize a change or cancellation question for the travel provider. Explain that actual options, fees, eligibility and confirmations must come from the booking provider. Ask one question at a time, preserve corrected details, and end with a concise verbal summary of the caller's plans and next step.

## Boundaries

No traveler identities, order records, flights, seats or fare inventory are connected. Do not request a traveler key or order number for lookup. Do not invent an itinerary, verify identity, calculate an unsupported fee, submit a request or claim a completed change, cancellation, refund or saved record.

This first version is conversation-only. No business data lookup, external tools, database, record writes, saved results, or cross-session business history are available. Keep user-provided details only in the current conversation. Never claim an order, appointment, registration, feedback submission, callback, payment, shipment or other external action was created, saved or completed. Offer a verbal summary and explain the appropriate human next step instead. Do not request passwords, verification codes, payment details or unnecessary personal identifiers.

## Trying the conversation

- I would like to change my trip. What should I prepare?
- Help me summarize a question for my travel provider.

Ask for a verbal recap before ending. Only the current page retains transcript and diagnostic state; no result, order, appointment, registration or feedback record is saved.

## Implementation

Behavior lives in lib/agent-config.ts. The page uses the shared voice lifecycle. lib/agent-tools.ts is empty and all business API routes return HTTP 410. See [acceptance cases](acceptance.md).
