"use client";

import { useState, useEffect } from "react";
import { Clock, Check } from "lucide-react";
import { CartItem } from "@/lib/types";

interface PizzaTrackerProps {
  orderId: string;
  estimatedTime: string;
  total: number;
  items: CartItem[];
}

const STAGES = ["Order Placed", "Prep", "Quality Check", "Out for Delivery"];

export function PizzaTracker({ orderId, estimatedTime, total, items }: PizzaTrackerProps) {
  const [currentStage, setCurrentStage] = useState(0);

  // Auto-advance stages for demo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const remaining = Math.max(0, parseInt(estimatedTime) - currentStage * 8);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-dominos-border overflow-hidden">
      {/* Header */}
      <div className="bg-dominos-blue px-4 py-3">
        <h2 className="text-white font-bold text-sm uppercase tracking-wide">
          Your Order #{orderId}
        </h2>
      </div>

      <div className="p-4">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-2">
          {STAGES.map((stage, i) => (
            <div key={stage} className="flex items-center flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
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
              {i < STAGES.length - 1 && (
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
          {STAGES.map((stage, i) => (
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
            Arriving in ~{remaining} min
          </span>
        </div>

        {/* Order Items */}
        <div className="border-t border-dominos-border pt-3 space-y-1.5">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="text-dominos-dark">
                {item.quantity}x {item.name}
                {item.crust ? ` (${item.crust})` : ""}
              </span>
              <span className="text-dominos-medium">₹{item.line_price}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold pt-2 border-t border-dominos-border">
            <span>Total</span>
            <span className="text-dominos-red">₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
