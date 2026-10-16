# 10 Travel booking

`travel.json` is the mock itinerary. The API requires matching traveler
identity for lookup and `confirmed=true` for change or cancellation requests.
Request IDs make repeated operations idempotent; a request is not a confirmed
transport-system change.


## Local conversation and optional tools

Default conversations append travel.json as fixed fictional order data. Require the exact order ID and matching traveler key before disclosing itinerary details; never reveal the key to help a caller match. Discuss status, listed change options and user intent without changing records or submitting requests. A public HTTPS tool origin enables existing lookup/update tools and omits inline orders; failures cannot be masked by local data. Even a successful change_requested or cancel_requested response is a request, not a completed ticket change, cancellation or refund.

TOP_TEN_SCENARIO_TOOL_BASE_URL is optional. Only an explicitly configured public HTTPS endpoint enables tools; malformed, HTTP, localhost and local/private origins leave tools disabled. URL validation does not prove network reachability. No tunnel, knowledge base or database is needed for the default conversation. Local checks do not establish live speech or cloud callback acceptance.

## U.S. example data

The fictional itinerary is New York (JFK) to Los Angeles (LAX). Departure and change options use `America/New_York`; November dates use EST (`-05:00`). These are local fixtures, not a live airline schedule.
