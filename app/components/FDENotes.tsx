"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Building2 } from "lucide-react";

const notes = [
  {
    title: "Scale",
    text: "2000+ Domino's stores in India, ~1M orders/day. Voice ordering needs regional language support: Hindi, Tamil, Telugu, Kannada, Bengali, Marathi. Stateless middleware on Kubernetes, menu cached in Redis per store.",
  },
  {
    title: "Integration",
    text: "POS system (Pulse), inventory management, kitchen display system (KDS), delivery dispatch, and payment gateway (Razorpay/Paytm with OTP verification).",
  },
  {
    title: "Business Impact",
    text: "Voice agents upsell 15-20% better than app. At avg order ₹450, estimated ₹67-90 additional per voice order. At 10% voice adoption (100K orders/day): ₹67L-90L additional daily revenue. 70% automation of 50K daily call center calls.",
  },
];

export function FDENotes() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t-2 border-dominos-border bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-dominos-blue" />
          <span className="text-sm font-bold text-dominos-dark">
            FDE Notes — Enterprise Deployment Considerations
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          {notes.map((note) => (
            <div key={note.title} className="flex gap-3">
              <span className="text-dominos-blue font-bold text-xs shrink-0 mt-0.5">
                ▸ {note.title}:
              </span>
              <p className="text-xs text-dominos-medium leading-relaxed">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
