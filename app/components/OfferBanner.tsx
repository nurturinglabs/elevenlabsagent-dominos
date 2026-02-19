"use client";

import { useState, useEffect } from "react";
import { offerBannerTexts } from "@/lib/offers";

export function OfferBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offerBannerTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-dominos-red to-red-700 text-white py-2 px-4 text-center overflow-hidden">
      <p className="text-sm font-bold animate-slide-in" key={current}>
        {offerBannerTexts[current]}
      </p>
    </div>
  );
}
