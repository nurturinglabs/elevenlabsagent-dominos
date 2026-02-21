"use client";

import { useState, useEffect } from "react";
import { Clock, Check, Package, Bike } from "lucide-react";
import { CartItem } from "@/lib/types";

interface PizzaTrackerProps {
  orderId: string;
  estimatedTime: string;
  total: number;
  items: CartItem[];
  deliveryType: "delivery" | "pickup";
}

const DELIVERY_STAGES = ["Order Placed", "Prep", "Quality Check", "Out for Delivery"];
const PICKUP_STAGES = ["Order Placed", "Prep", "Quality Check", "Ready for Pickup"];

export function PizzaTracker({ orderId, estimatedTime, total, items, deliveryType }: PizzaTrackerProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const stages = deliveryType === "pickup" ? PICKUP_STAGES : DELIVERY_STAGES;

  // Auto-advance stages for demo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 30000);
    return () => clearInterval(timer);
  }, [stages.length]);

  const remaining = Math.max(0, parseInt(estimatedTime) - currentStage * 8);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-dominos-border overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-dominos-blue px-4 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-sm uppercase tracking-wide">
            Order Confirmed
          </h2>
          <span className="text-white/80 text-xs font-mono">#{orderId}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col min-h-0">
        {/* Delivery Type Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
            deliveryType === "delivery"
              ? "bg-dominos-blue/10 text-dominos-blue"
              : "bg-amber-50 text-amber-700"
          }`}>
            {deliveryType === "delivery" ? (
              <Bike className="w-3.5 h-3.5" />
            ) : (
              <Package className="w-3.5 h-3.5" />
            )}
            {deliveryType === "delivery" ? "Delivery" : "Pickup"}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-2">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  i <= currentStage
                    ? "bg-dominos-blue text-white"
                    : "bg-gray-200 text-gray-400"
                } ${i === currentStage ? "animate-pulse-blue" : ""}`}
              >
                {i < currentStage ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  i + 1
                )}
              </div>
              {i < stages.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-1 rounded ${
                    i < currentStage ? "bg-dominos-blue" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Stage Labels */}
        <div className="flex justify-between mb-4">
          {stages.map((stage, i) => (
            <span
              key={stage}
              className={`text-[10px] text-center flex-1 ${
                i === currentStage
                  ? "text-dominos-blue font-bold"
                  : i < currentStage
                  ? "text-dominos-blue/60"
                  : "text-gray-400"
              }`}
            >
              {stage}
            </span>
          ))}
        </div>

        {/* ETA */}
        <div className="flex items-center gap-1.5 justify-center mb-4 text-dominos-medium">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-sm">
            {deliveryType === "delivery"
              ? `Arriving in ~${remaining} min`
              : `Ready in ~${remaining} min`}
          </span>
        </div>

        {/* Order Items */}
        <div className="border-t border-dominos-border pt-3 flex-1 overflow-y-auto min-h-0">
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-dominos-dark">
                  {item.quantity}x {item.name}
                  {item.size ? ` (${item.size})` : ""}
                  {item.crust ? ` · ${item.crust}` : ""}
                </span>
                <span className="text-dominos-medium shrink-0 ml-2">₹{item.line_price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-bold pt-3 mt-3 border-t border-dominos-border">
            <span>Total</span>
            <span className="text-dominos-red">₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
