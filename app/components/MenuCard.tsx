"use client";

import { MenuItem } from "@/lib/types";

interface MenuCardProps {
  item: MenuItem;
  highlighted: boolean;
}

export function MenuCard({ item, highlighted }: MenuCardProps) {
  const priceRange = item.prices
    ? `₹${item.prices.regular}–${item.prices.large}`
    : `₹${item.price}`;

  return (
    <div
      id={`menu-${item.id}`}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all ${
        highlighted
          ? "border-dominos-blue bg-blue-50 shadow-md animate-glow-blue"
          : "border-dominos-border bg-white hover:border-gray-300"
      }`}
    >
      {/* Veg/Non-veg indicator */}
      <span
        className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center shrink-0 ${
          item.type === "veg" ? "border-veg" : "border-nonveg"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            item.type === "veg" ? "bg-veg" : "bg-nonveg"
          }`}
        />
      </span>

      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-dominos-dark truncate">
          {item.name}
          {item.size ? ` (${item.size})` : ""}
        </p>
        <p className="text-[10px] text-dominos-medium truncate">
          {item.description}
        </p>
      </div>

      {/* Price */}
      <span className="text-xs font-bold text-dominos-red whitespace-nowrap shrink-0">
        {priceRange}
      </span>
    </div>
  );
}
