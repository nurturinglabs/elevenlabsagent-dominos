"use client";

import { useState, useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { Transcript, TranscriptMessage } from "./Transcript";
import { CartItem } from "@/lib/types";

interface VoiceAgentProps {
  onCartUpdate: (items: CartItem[], subtotal: number, gst: number, delivery_fee: number, total: number) => void;
  onHighlightItem: (itemId: string) => void;
  onOfferApplied: (offerName: string, discount: number) => void;
  onOrderConfirmed: (orderId: string, estimatedTime: string, total: number) => void;
}

export function VoiceAgent({
  onCartUpdate,
  onHighlightItem,
  onOfferApplied,
  onOrderConfirmed,
}: VoiceAgentProps) {
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

  const conversation = useConversation({
    onConnect: () => {
      setMessages([]);
    },
    onMessage: (message: { source: string; message: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          role: message.source === "ai" ? "agent" : "user",
          message: message.message,
          timestamp: new Date(),
        },
      ]);
    },
    onError: (error: unknown) => {
      console.error("Conversation error:", error);
    },
    clientTools: {
      update_cart: (params: Record<string, unknown>) => {
        try {
          const items = typeof params.items === "string" ? JSON.parse(params.items) : params.items || [];
          onCartUpdate(
            items,
            Number(params.subtotal || 0),
            Number(params.gst || 0),
            Number(params.delivery_fee || 0),
            Number(params.total || 0)
          );
        } catch {
          console.error("Failed to parse cart update");
        }
        return "Cart updated on screen";
      },
      highlight_menu_item: (params: Record<string, unknown>) => {
        onHighlightItem(String(params.item_id || ""));
        return "Menu item highlighted";
      },
      show_offer_applied: (params: Record<string, unknown>) => {
        onOfferApplied(
          String(params.offer_name || ""),
          Number(params.discount_amount || 0)
        );
        return "Offer animation shown to customer";
      },
      show_order_confirmed: (params: Record<string, unknown>) => {
        onOrderConfirmed(
          String(params.order_id || ""),
          String(params.estimated_time || "30"),
          Number(params.total || 0)
        );
        return "Order tracker shown to customer";
      },
    },
  });

  const handleStart = useCallback(async () => {
    if (!agentId || agentId === "your_agent_id_here") {
      alert("Please configure your ElevenLabs Agent ID in .env.local");
      return;
    }
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ agentId, connectionType: "webrtc" });
    } catch (error) {
      console.error("Failed to start:", error);
    }
  }, [agentId, conversation]);

  const handleStop = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting";
  const isSpeaking = conversation.isSpeaking;
  const notConfigured = !agentId || agentId === "your_agent_id_here";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-dominos-border p-5">
      <h2 className="text-sm font-bold text-dominos-blue uppercase tracking-wide mb-4">
        Voice Ordering
      </h2>

      {/* Orb */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isConnected
              ? isSpeaking
                ? "bg-dominos-red scale-110 animate-pulse-blue"
                : "bg-dominos-blue animate-glow-blue"
              : isConnecting
              ? "bg-dominos-blue/60 animate-pulse"
              : "bg-gray-200"
          }`}
        >
          <Mic className={`w-8 h-8 ${isConnected || isConnecting ? "text-white" : "text-gray-400"}`} />
        </div>
        <p className="text-xs font-medium text-dominos-medium">
          {notConfigured
            ? "Configure Agent ID"
            : isConnecting
            ? "Connecting..."
            : isConnected && isSpeaking
            ? "Speaking..."
            : isConnected
            ? "Listening..."
            : "Tap to start ordering"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center mb-4">
        {!isConnected ? (
          <button
            onClick={handleStart}
            disabled={isConnecting || notConfigured}
            className="bg-dominos-red hover:bg-red-700 disabled:bg-gray-300 text-white font-bold text-sm px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors"
          >
            <Mic className="w-4 h-4" />
            {isConnecting ? "Connecting..." : "Start Order"}
          </button>
        ) : (
          <>
            <button
              onClick={handleStop}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors"
            >
              <PhoneOff className="w-4 h-4" />
              End
            </button>
            <button
              onClick={() => {}}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
            >
              {conversation.micMuted ? (
                <MicOff className="w-4 h-4 text-gray-500" />
              ) : (
                <Mic className="w-4 h-4 text-dominos-blue" />
              )}
            </button>
          </>
        )}
      </div>

      {/* Transcript */}
      <Transcript messages={messages} isListening={isConnected && !isSpeaking} />
    </div>
  );
}
