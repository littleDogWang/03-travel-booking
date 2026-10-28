import type { ScenarioPresentation } from '@/types/presentation';
export type { ScenarioPresentation } from '@/types/presentation';

export const presentation: ScenarioPresentation = {
  "id": "03-travel-booking",
  "name": "Travel Booking Assistant",
  "purpose": "Itinerary lookup and travel options",
  "headline": [
    "Travel plans, made clearer."
  ],
  "summary": "Review your example itinerary and discuss change or cancellation options.",
  "featuresHeading": "Beyond starter",
  "features": [
    {
      "emoji": "🧳",
      "title": "Itinerary lookup"
    },
    {
      "emoji": "🔎",
      "title": "Traveler verification"
    },
    {
      "emoji": "✈️",
      "title": "Change & cancellation options"
    }
  ],
  "builtWith": [
    "Agora Conversational AI",
    "Agents SDK",
    "Next.js"
  ],
  "startLabel": "Review travel plans",
  "boundaryShort": "Exact order and traveler match required. Requests do not complete ticket changes or refunds.",
  "outcomes": [
    {
      "id": "reviewed",
      "label": "I understand my travel options"
    },
    {
      "id": "needs-help",
      "label": "I need more help"
    }
  ],
  "developer": {
    "sourceUrl": "https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs",
    "runCommand": "pnpm install\nagora login\nagora project use <your-project>\nagora project env write .env.local\npnpm dev",
    "skillsCommand": "npx skills add github:AgoraIO/skills",
    "assistantPrompt": "Use Agora Skills to work in the existing 03-travel-booking scenario checkout. Preserve the working Agora session lifecycle and business contracts. Help me adapt its business data and assistant instructions for my workflow.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://www.npmjs.com/package/agora-agents",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
    "skillsUrl": "https://github.com/AgoraIO/skills",
    "extensionPoints": [
      {
        "title": "Change assistant instructions",
        "path": "lib/agent-config.ts"
      },
      {
        "title": "Adapt travel.json",
        "path": "lib/travel-booking/travel.json"
      },
      {
        "title": "Choose models and voice",
        "path": "app/api/invite-agent/route.ts"
      },
      {
        "title": "Adapt scenario UI content",
        "path": "lib/presentation.ts"
      }
    ]
  }
};

export function getScenarioPresentation(): ScenarioPresentation {
  return presentation;
}
