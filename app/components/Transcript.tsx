"use client";

import { useEffect, useRef } from "react";

export interface TranscriptMessage {
  role: "agent" | "user";
  message: string;
  timestamp: Date;
}

interface TranscriptProps {
  messages: TranscriptMessage[];
  isListening: boolean;
}

export function Transcript({ messages, isListening }: TranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-sm text-dominos-medium">
          &quot;Hi! Domino&apos;s mein aapka swagat hai!&quot;
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Say something like &quot;ek medium Farmhouse cheese burst pe&quot;
        </p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto scrollbar-thin space-y-2"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] px-3 py-1.5 rounded-xl text-sm ${
              msg.role === "user"
                ? "bg-dominos-blue text-white rounded-br-sm"
                : "bg-white border border-gray-200 text-dominos-dark rounded-bl-sm"
            }`}
          >
            {msg.message}
          </div>
        </div>
      ))}
      {isListening && (
        <div className="flex justify-end">
          <div className="bg-dominos-blue/10 text-dominos-blue px-3 py-1.5 rounded-xl rounded-br-sm text-xs">
            Listening...
          </div>
        </div>
      )}
    </div>
  );
}
