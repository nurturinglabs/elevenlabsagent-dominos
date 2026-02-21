"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, PhoneOff, Phone } from "lucide-react";
import { CartItem } from "@/lib/types";

interface VoiceAgentProps {
  onCartUpdate: (items: CartItem[], subtotal: number, gst: number, delivery_fee: number, total: number) => void;
  onHighlightItem: (itemId: string) => void;
  onOfferApplied: (offerName: string, discount: number) => void;
  onOrderConfirmed: (orderId: string, estimatedTime: string, total: number) => void;
  onDeliveryTypeSet: (type: "delivery" | "pickup") => void;
}

export function VoiceAgent({
  onCartUpdate,
  onHighlightItem,
  onOfferApplied,
  onOrderConfirmed,
  onDeliveryTypeSet,
}: VoiceAgentProps) {
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

  const conversation = useConversation({
    onConnect: () => {
      setCallDuration(0);
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    },
    onDisconnect: () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    },
    onError: (error: unknown) => {
      console.error("Conversation error:", error);
    },
    clientTools: {
      update_cart: (params: Record<string, unknown>) => {
        console.log("update_cart raw params:", JSON.stringify(params, null, 2));
        try {
          let items: unknown = params.items;
          // Handle string JSON
          if (typeof items === "string") {
            items = JSON.parse(items);
          }
          // If items is still not an array, try parsing the entire params as the cart
          if (!Array.isArray(items)) {
            // Maybe the agent sent a single item or the whole payload differently
            if (params.name || params.menu_id) {
              // Single item sent as flat params
              items = [params];
            } else {
              items = [];
            }
          }
          onCartUpdate(
            items as CartItem[],
            Number(params.subtotal || 0),
            Number(params.gst || 0),
            Number(params.delivery_fee || 0),
            Number(params.total || 0)
          );
        } catch (e) {
          console.error("Failed to parse cart update:", e, "params:", params);
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
      set_delivery_type: (params: Record<string, unknown>) => {
        const type = String(params.delivery_type || "delivery") as "delivery" | "pickup";
        onDeliveryTypeSet(type);
        return `Delivery type set to ${type}`;
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

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#1a1a2e] rounded-xl overflow-hidden">
      {/* Compact call header */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Domino's avatar */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="w-2 h-2 rounded-[2px] bg-dominos-red" />
            <div className="w-2 h-2 rounded-[2px] bg-dominos-blue" />
            <div className="w-2 h-2 rounded-[2px] bg-dominos-blue" />
            <div className="w-2 h-2 rounded-[2px] bg-dominos-red" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white text-sm font-bold">Domino&apos;s Pizza</h2>
          <p className="text-white/40 text-xs">Koramangala, Bengaluru</p>
        </div>
        {/* Call status */}
        <div className="shrink-0">
          {isConnected ? (
            <span className="text-green-400 text-xs font-mono">{formatTime(callDuration)}</span>
          ) : isConnecting ? (
            <span className="text-yellow-400 text-xs animate-pulse">Calling...</span>
          ) : null}
        </div>
      </div>

      {/* Orb + status (only when connected or connecting) */}
      {(isConnected || isConnecting) && (
        <div className="flex flex-col items-center py-3">
          <div className="relative">
            {isConnected && (
              <>
                <div
                  className={`absolute inset-0 rounded-full ${isSpeaking ? "bg-dominos-red/20" : "bg-dominos-blue/20"}`}
                  style={{ animation: "callPulse 2s ease-out infinite" }}
                />
                <div
                  className={`absolute inset-0 rounded-full ${isSpeaking ? "bg-dominos-red/10" : "bg-dominos-blue/10"}`}
                  style={{ animation: "callPulse 2s ease-out infinite 0.5s" }}
                />
              </>
            )}
            <div
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isConnected
                  ? isSpeaking
                    ? "bg-dominos-red shadow-[0_0_20px_rgba(227,24,55,0.4)]"
                    : "bg-dominos-blue shadow-[0_0_20px_rgba(0,100,145,0.4)]"
                  : "bg-white/20"
              }`}
            >
              {isConnected && isSpeaking ? (
                <div className="flex items-center gap-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-[2px] bg-white rounded-full"
                      style={{ animation: `soundBar 0.8s ease-in-out infinite ${i * 0.1}s`, height: "8px" }}
                    />
                  ))}
                </div>
              ) : isConnected ? (
                <Mic className="w-6 h-6 text-white" />
              ) : (
                <Phone className="w-5 h-5 text-white animate-pulse" />
              )}
            </div>
          </div>
          <p className="text-white/40 text-[11px] mt-2">
            {isSpeaking ? "Speaking..." : isConnected ? "Listening..." : "Connecting..."}
          </p>
        </div>
      )}

      {/* Call controls */}
      <div className="px-4 py-3 flex justify-center">
        {!isConnected ? (
          <button
            onClick={handleStart}
            disabled={isConnecting}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isConnecting
                ? "bg-yellow-500/80 shadow-yellow-500/20"
                : "bg-green-500 hover:bg-green-600 shadow-green-500/30"
            } disabled:bg-gray-600 disabled:shadow-none`}
          >
            <Phone className="w-5 h-5 text-white" />
          </button>
        ) : (
          <div className="flex items-center gap-6">
            <button
              onClick={() => {}}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                conversation.micMuted ? "bg-white/20" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {conversation.micMuted ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-white" />
              )}
            </button>
            <button
              onClick={handleStop}
              className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors shadow-lg shadow-red-600/30"
            >
              <PhoneOff className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Not connected placeholder */}
      {!isConnected && !isConnecting && (
        <p className="text-center text-white/25 text-xs pb-3">
          Tap to call and place your order
        </p>
      )}

      <style jsx>{`
        @keyframes callPulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes soundBar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>
    </div>
  );
}
