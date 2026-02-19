"use client";

import { ShoppingCart, Minus, Plus } from "lucide-react";
import { CartItem } from "@/lib/types";

interface CartProps {
  items: CartItem[];
  subtotal: number;
  gst: number;
  deliveryFee: number;
  total: number;
  offerBanner: { name: string; discount: number } | null;
  onPlaceOrder: () => void;
}

export function Cart({
  items,
  subtotal,
  gst,
  deliveryFee,
  total,
  offerBanner,
  onPlaceOrder,
}: CartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-dominos-border overflow-hidden">
      {/* Header */}
      <div className="bg-dominos-blue px-4 py-3">
        <h2 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Your Order
        </h2>
      </div>

      {/* Offer Applied Banner */}
      {offerBanner && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-2 animate-slide-in">
          <p className="text-xs font-bold text-green-700">
            🎉 {offerBanner.name} applied! You save ₹{offerBanner.discount}
          </p>
        </div>
      )}

      <div className="p-4">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-10 h-10 text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-dominos-medium">
              Talk to order! Say something like
            </p>
            <p className="text-xs text-gray-400 mt-1 italic">
              &quot;ek medium Farmhouse cheese burst pe&quot;
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-dominos-dark">
                    {item.name}
                  </p>
                  <p className="text-xs text-dominos-medium">
                    {[item.size, item.crust].filter(Boolean).join(" · ")}
                    {item.extra_toppings && item.extra_toppings.length > 0 && (
                      <span> + {item.extra_toppings.join(", ")}</span>
                    )}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <button className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-gray-500 hover:border-dominos-red hover:text-dominos-red">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-gray-500 hover:border-dominos-red hover:text-dominos-red">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-dominos-red">
                    ₹{item.line_price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Price Breakdown */}
        <div className="border-t border-dominos-border pt-3 space-y-1.5">
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
          <div className="flex justify-between text-sm font-bold text-dominos-dark pt-1.5 border-t border-dominos-border">
            <span>TOTAL</span>
            <span className="text-dominos-red">₹{total}</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={onPlaceOrder}
          disabled={items.length === 0}
          className="w-full bg-dominos-red hover:bg-red-700 disabled:bg-gray-300 text-white font-bold text-sm py-3 rounded-lg mt-4 transition-colors"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}
