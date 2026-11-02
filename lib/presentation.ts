import type { ScenarioPresentation } from '@/types/presentation';
export type { ScenarioPresentation } from '@/types/presentation';

export const presentation: ScenarioPresentation = {
  "id": "03-travel-booking",
  "name": "Travel Booking Assistant",
  "purpose": "Scenario voice conversation",
  "headline": [
    "Travel plans, made clearer."
  ],
  "summary": "Talk through travel plans, itinerary questions and possible next steps.",
  "featuresHeading": "In this conversation",
  "features": [
    {
      "emoji": "💬",
      "title": "Itinerary discussion"
    },
    {
      "emoji": "🎙️",
      "title": "Change-request guidance"
    },
    {
      "emoji": "📝",
      "title": "Verbal next-step summary"
    }
  ],
  "builtWith": [
    "Agora Conversational AI",
    "Agents SDK",
    "Next.js"
  ],
  "startLabel": "Review travel plans",
  "boundaryShort": "Conversation only. No booking lookup, itinerary change, cancellation or saved request.",
  "outcomes": [
    {
      "id": "helpful",
      "label": "The conversation helped"
    },
    {
      "id": "needs-guidance",
      "label": "I need more guidance"
    }
  ],
  "developer": {
    "sourceUrl": "https://github.com/littleDogWang/03-travel-booking",
    "runCommand": "pnpm install --frozen-lockfile\npnpm run doctor\npnpm run dev",
    "skillsCommand": "npx skills add github:AgoraIO/skills",
    "assistantPrompt": "Work in this existing 03-travel-booking voice demo. Preserve Agora RTC/RTM lifecycle and the conversation-only first-version boundary. Adapt the assistant instructions and static public background without adding business tools, records, data APIs or persistence.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://www.npmjs.com/package/agora-agents",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
    "skillsUrl": "https://github.com/AgoraIO/skills",
    "extensionPoints": [
      {
        "title": "Change the conversation",
        "path": "lib/agent-config.ts"
      },
      {
        "title": "Choose models and voice",
        "path": "lib/runtime-profile.ts"
      },
      {
        "title": "Adapt scenario UI copy",
        "path": "lib/presentation.ts"
      }
    ]
  }
};

export function getScenarioPresentation(): ScenarioPresentation { return presentation; }
