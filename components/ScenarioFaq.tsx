'use client';

import { ChevronDown } from 'lucide-react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const questions = [
  {
    "question": "How do I start a conversation?",
    "answer": "Choose Review travel plans and allow microphone access when your browser asks. Speak in English and describe what you need. You can mute the microphone or end the conversation with the voice controls."
  },
  {
    "question": "What should I say?",
    "answer": "Tell the assistant your departure city, destination and travel preferences. For example: “I am planning a trip from New York to Los Angeles. What should I consider before booking?” You can also discuss terms from an itinerary you describe."
  },
  {
    "question": "Does it search live flights or fares?",
    "answer": "No. Airport information is static reference material. This demo does not search live routes, seats or prices, or access a personal itinerary. Confirm schedules, availability and fares with the airline or travel provider."
  },
  {
    "question": "Can it book, change or cancel my trip?",
    "answer": "No. The assistant can talk through options and explain questions to ask your provider, but cannot create a booking, change an itinerary, cancel a ticket, issue a refund or save a travel request. Do not share identity documents or payment details."
  },
  {
    "question": "Can I change what I said?",
    "answer": "Yes. Tell the assistant which detail to correct, ask it to repeat or clarify an answer, or request a verbal recap. Details are used within the current conversation; this demo does not save business results or remember them across sessions."
  },
  {
    "question": "What if my microphone does not work?",
    "answer": "Check that microphone access is allowed for this page and that the correct input device is selected in your browser or system settings. Make sure the microphone is not muted, then try Review travel plans again."
  }
];

export function ScenarioFaq() {
  return (
    <DialogContent className="demo-inspector demo-faq-drawer">
      <DialogHeader className="demo-faq-heading">
        <DialogTitle>Frequently asked questions</DialogTitle>
        <DialogDescription>How to get started, what to ask, and what to expect.</DialogDescription>
      </DialogHeader>
      <div className="demo-faq-list">
        {questions.map(({ question, answer }) => (
          <details className="demo-faq-item" key={question}>
            <summary>
              <span>{question}</span>
              <ChevronDown className="demo-faq-chevron" size={16} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </DialogContent>
  );
}
