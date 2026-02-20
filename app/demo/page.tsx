"use client";

import { useState, useCallback } from "react";
import { Header } from "../components/Header";
import { OfferBanner } from "../components/OfferBanner";
import { VoiceAgent } from "../components/VoiceAgent";
import { Cart } from "../components/Cart";
import { PizzaTracker } from "../components/PizzaTracker";
import { MenuSection } from "../components/MenuSection";
import { FDENotes } from "../components/FDENotes";
import { CartItem } from "@/lib/types";
import { ShoppingCart, Mic, UtensilsCrossed } from "lucide-react";

type MobileTab = "agent" | "menu" | "cart";

export default function DemoPage() {
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(
    null
  );
  const [offerBanner, setOfferBanner] = useState<{
    name: string;
    discount: number;
  } | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderId: string;
    estimatedTime: string;
    total: number;
  } | null>(null);
  const [mobileTab, setMobileTab] = useState<MobileTab>("agent");

  const handleCartUpdate = useCallback(
    (
      items: CartItem[],
      sub: number,
      g: number,
      df: number,
      t: number
    ) => {
      setCartItems(items);
      setSubtotal(sub);
      setGst(g);
      setDeliveryFee(df);
      setTotal(t);
    },
    []
  );

  const handleHighlightItem = useCallback((itemId: string) => {
    setHighlightedItemId(itemId);
    const el = document.getElementById(`menu-${itemId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => setHighlightedItemId(null), 3000);
  }, []);

  const handleOfferApplied = useCallback(
    (name: string, discount: number) => {
      setOfferBanner({ name, discount });
      setTimeout(() => setOfferBanner(null), 5000);
    },
    []
  );

  const handleOrderConfirmed = useCallback(
    (orderId: string, estimatedTime: string, orderTotal: number) => {
      setOrderConfirmed({ orderId, estimatedTime, total: orderTotal });
    },
    []
  );

  const handlePlaceOrder = useCallback(async () => {
    if (cartItems.length === 0) return;
    try {
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((i) => ({
            name: i.name,
            size: i.size,
            crust: i.crust,
            extra_toppings: i.extra_toppings,
            quantity: i.quantity,
          })),
          delivery_type: deliveryType,
        }),
      });
      const data = await res.json();
      if (data.order_id) {
        setOrderConfirmed({
          orderId: data.order_id,
          estimatedTime: data.estimated_delivery,
          total: data.total,
        });
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  }, [cartItems, deliveryType]);

  const cartOrTracker = orderConfirmed ? (
    <PizzaTracker
      orderId={orderConfirmed.orderId}
      estimatedTime={orderConfirmed.estimatedTime}
      total={orderConfirmed.total}
      items={cartItems}
    />
  ) : (
    <Cart
      items={cartItems}
      subtotal={subtotal}
      gst={gst}
      deliveryFee={deliveryFee}
      total={total}
      offerBanner={offerBanner}
      onPlaceOrder={handlePlaceOrder}
    />
  );

  return (
    <div className="h-screen flex flex-col bg-dominos-light">
      <Header
        deliveryType={deliveryType}
        onToggleDelivery={setDeliveryType}
      />
      <OfferBanner />

      {/* DESKTOP */}
      <main className="hidden lg:flex flex-1 overflow-hidden">
        <div className="w-[400px] shrink-0 border-r border-dominos-border overflow-y-auto bg-white/50">
          <div className="p-4 space-y-4">
            <VoiceAgent
              onCartUpdate={handleCartUpdate}
              onHighlightItem={handleHighlightItem}
              onOfferApplied={handleOfferApplied}
              onOrderConfirmed={handleOrderConfirmed}
            />
            {cartOrTracker}
            <FDENotes />
            <p className="text-center text-xs text-dominos-medium py-2">
              Built by Umesh — ElevenLabs FDE Portfolio Project
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <MenuSection highlightedItemId={highlightedItemId} />
          </div>
        </div>
      </main>

      {/* MOBILE */}
      <main className="lg:hidden flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {mobileTab === "agent" && (
            <div className="p-4 space-y-4">
              <VoiceAgent
                onCartUpdate={handleCartUpdate}
                onHighlightItem={handleHighlightItem}
                onOfferApplied={handleOfferApplied}
                onOrderConfirmed={handleOrderConfirmed}
              />
            </div>
          )}
          {mobileTab === "menu" && (
            <div className="p-4">
              <MenuSection highlightedItemId={highlightedItemId} />
            </div>
          )}
          {mobileTab === "cart" && (
            <div className="p-4">
              {cartOrTracker}
              <div className="mt-4">
                <FDENotes />
              </div>
            </div>
          )}
        </div>

        <nav className="shrink-0 bg-white border-t border-dominos-border flex">
          <button
            onClick={() => setMobileTab("agent")}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold transition-colors ${
              mobileTab === "agent"
                ? "text-dominos-red"
                : "text-dominos-medium"
            }`}
          >
            <Mic className="w-5 h-5" />
            Order
          </button>
          <button
            onClick={() => setMobileTab("menu")}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold transition-colors ${
              mobileTab === "menu"
                ? "text-dominos-red"
                : "text-dominos-medium"
            }`}
          >
            <UtensilsCrossed className="w-5 h-5" />
            Menu
          </button>
          <button
            onClick={() => setMobileTab("cart")}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold transition-colors relative ${
              mobileTab === "cart"
                ? "text-dominos-red"
                : "text-dominos-medium"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
            {cartItems.length > 0 && (
              <span className="absolute top-1.5 right-1/2 translate-x-4 -translate-y-0.5 bg-dominos-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </nav>
      </main>
    </div>
  );
}
