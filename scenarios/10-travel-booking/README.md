# 10 Travel booking

`travel.json` is the mock itinerary. The API requires matching traveler
identity for lookup and `confirmed=true` for change or cancellation requests.
Request IDs make repeated operations idempotent; a request is not a confirmed
transport-system change.
