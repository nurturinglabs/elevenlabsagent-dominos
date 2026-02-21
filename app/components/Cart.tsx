"use client";

import { ShoppingCart } from "lucide-react";
import { CartItem } from "@/lib/types";

interface CartProps {
  items: CartItem[];
  subtotal: number;
  gst: number;
  deliveryFee: number;
  total: number;
  offerBanner: { name: string; discount: number } | null;
}

export function Cart({
  items,
  subtotal,
  gst,
  deliveryFee,
  total,
  offerBanner,
}: CartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-dominos-border overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-dominos-blue px-4 py-3 shrink-0">
        <h2 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Your Order
          {items.length > 0 && (
            <span className="ml-auto bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          )}
        </h2>
      </div>

      {/* Offer Applied Banner */}
      {offerBanner && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-2 animate-slide-in shrink-0">
          <p className="text-xs font-bold text-green-700">
            {offerBanner.name} applied! You save ₹{offerBanner.discount}
          </p>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col min-h-0">
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <ShoppingCart className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-sm font-medium text-dominos-dark">No items yet</p>
            <p className="text-xs text-dominos-medium mt-1">
              Items will appear here as you order
            </p>
            <p className="text-xs text-gray-400 mt-3 italic">
              Try saying &quot;ek medium Farmhouse cheese burst pe&quot;
            </p>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 min-h-0">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-dominos-blue bg-dominos-blue/10 w-5 h-5 rounded flex items-center justify-center shrink-0">
                        {item.quantity}x
                      </span>
                      <p className="text-sm font-semibold text-dominos-dark">
                        {item.name}
                      </p>
                    </div>
                    {(item.size || item.crust || (item.extra_toppings && item.extra_toppings.length > 0)) && (
                      <p className="text-xs text-dominos-medium mt-0.5 ml-7">
                        {[item.size, item.crust].filter(Boolean).join(" · ")}
                        {item.extra_toppings && item.extra_toppings.length > 0 && (
                          <span> + {item.extra_toppings.join(", ")}</span>
                        )}
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-bold text-dominos-dark shrink-0">
                    ₹{item.line_price}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-dominos-border pt-3 space-y-1.5 shrink-0">
              <div className="flex justify-between text-xs text-dominos-medium">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-xs text-dominos-medium">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="flex justify-between text-xs text-dominos-medium">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-dominos-dark pt-2 border-t border-dominos-border">
                <span>TOTAL</span>
                <span className="text-dominos-red text-base">₹{total}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
