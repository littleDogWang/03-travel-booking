// Public reference only. Keep customer records, inventory and business actions out of this module.
export const SCENARIO_KNOWLEDGE = {
  "source": {
    "kind": "Static public airport reference",
    "checkedOn": "2026-11-05",
    "scope": "Airport names, codes and locations only. No route schedules, carriers, prices, seats or exact driving times are included."
  },
  "timeZone": "America/New_York",
  "destination": "Bar Harbor and Acadia National Park, Maine, United States",
  "airports": [
    {
      "code": "BHB",
      "name": "Hancock County–Bar Harbor Airport",
      "location": "Between Ellsworth and Bar Harbor, Maine",
      "timeZone": "America/New_York",
      "comparison": "Local airport to compare for a shorter onward trip to Bar Harbor; whether a convenient flight operates on the travel date must be checked separately.",
      "source": "https://www.bhbairport.com/"
    },
    {
      "code": "BGR",
      "name": "Bangor International Airport",
      "location": "Bangor, Maine",
      "timeZone": "America/New_York",
      "comparison": "Regional alternative in Bangor. Compare the actual flight itinerary and onward ground transportation against BHB.",
      "source": "https://flybangor.com/"
    },
    {
      "code": "PWM",
      "name": "Portland International Jetport",
      "location": "Portland, Maine",
      "timeZone": "America/New_York",
      "comparison": "An alternative for a trip that also includes Portland or southern Maine; reaching Bar Harbor requires a longer onward journey than the local airport.",
      "source": "https://portlandjetport.org/"
    }
  ],
  "comparisonChecklist": [
    "Actual origin and final destination",
    "Flight itinerary and connection count from a live travel source",
    "Ground transportation and whether a car is needed",
    "Total flight plus ground cost and travel time",
    "Baggage, child and accessibility needs",
    "Exact fare rules supplied by the provider"
  ]
} as const;
