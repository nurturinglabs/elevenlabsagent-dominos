"use client";

import { MapPin } from "lucide-react";

interface HeaderProps {
  deliveryType: "delivery" | "pickup";
  onToggleDelivery: (type: "delivery" | "pickup") => void;
}

export function Header({ deliveryType, onToggleDelivery }: HeaderProps) {
  return (
    <header className="bg-dominos-blue text-white">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-dominos-red" />
              <div className="w-2.5 h-2.5 rounded-sm bg-dominos-blue" />
              <div className="w-2.5 h-2.5 rounded-sm bg-dominos-blue" />
              <div className="w-2.5 h-2.5 rounded-sm bg-dominos-red" />
            </div>
          </div>
          <span className="text-lg font-extrabold tracking-tight hidden sm:block">
            PIZZA VOICE AI
          </span>
          <span className="text-lg font-extrabold tracking-tight sm:hidden">
            VOICE AI
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Location */}
          <div className="hidden sm:flex items-center gap-1 text-sm text-white/80">
            <MapPin className="w-3.5 h-3.5" />
            <span>Koramangala, Bangalore</span>
          </div>

          {/* Delivery Toggle */}
          <div className="flex bg-white/15 rounded-full p-0.5">
            <button
              onClick={() => onToggleDelivery("delivery")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                deliveryType === "delivery"
                  ? "bg-white text-dominos-blue"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => onToggleDelivery("pickup")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                deliveryType === "pickup"
                  ? "bg-white text-dominos-blue"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Pickup
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
