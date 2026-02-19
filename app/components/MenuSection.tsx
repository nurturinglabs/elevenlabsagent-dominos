"use client";

import { useState, useCallback } from "react";
import { MenuCard } from "./MenuCard";
import { vegPizzas, nonVegPizzas, sides, desserts, beverages } from "@/lib/menu-data";

interface MenuSectionProps {
  highlightedItemId: string | null;
}

type Filter = "all" | "veg" | "non-veg";

const categories = [
  { id: "cat-veg-pizza", label: "Veg Pizzas" },
  { id: "cat-nonveg-pizza", label: "Non-Veg Pizzas" },
  { id: "cat-sides", label: "Sides" },
  { id: "cat-desserts", label: "Desserts" },
  { id: "cat-beverages", label: "Beverages" },
];

export function MenuSection({ highlightedItemId }: MenuSectionProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const showVeg = filter === "all" || filter === "veg";
  const showNonVeg = filter === "all" || filter === "non-veg";

  const scrollToCategory = useCallback((catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(catId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Build visible categories based on filter
  const visibleCategories = categories.filter((c) => {
    if (c.id === "cat-veg-pizza" && !showVeg) return false;
    if (c.id === "cat-nonveg-pizza" && !showNonVeg) return false;
    return true;
  });

  return (
    <div>
      {/* Sticky header: title + filters + category tabs */}
      <div className="sticky top-0 z-10 bg-dominos-light pb-3 -mx-6 px-6 pt-1">
        {/* Title row + veg/non-veg filter */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-dominos-dark uppercase">Menu</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter(filter === "veg" ? "all" : "veg")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border-2 text-xs font-bold transition-colors ${
                filter === "veg"
                  ? "border-veg bg-green-50 text-veg"
                  : "border-gray-300 text-gray-400 hover:border-veg"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-veg" />
              VEG
            </button>
            <button
              onClick={() => setFilter(filter === "non-veg" ? "all" : "non-veg")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border-2 text-xs font-bold transition-colors ${
                filter === "non-veg"
                  ? "border-nonveg bg-orange-50 text-nonveg"
                  : "border-gray-300 text-gray-400 hover:border-nonveg"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-nonveg" />
              NON-VEG
            </button>
          </div>
        </div>

        {/* Category quick-jump tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {visibleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                activeCategory === cat.id
                  ? "bg-dominos-blue text-white border-dominos-blue"
                  : "bg-white text-dominos-dark border-dominos-border hover:border-dominos-blue"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Veg Pizzas */}
      {showVeg && (
        <div className="mb-4" id="cat-veg-pizza">
          <h3 className="text-[11px] font-bold text-dominos-medium uppercase tracking-wider border-b border-dominos-border pb-1.5 mb-2">
            Veg Pizzas
          </h3>
          <div className="space-y-1.5">
            {vegPizzas.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                highlighted={highlightedItemId === item.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Non-Veg Pizzas */}
      {showNonVeg && (
        <div className="mb-4" id="cat-nonveg-pizza">
          <h3 className="text-[11px] font-bold text-dominos-medium uppercase tracking-wider border-b border-dominos-border pb-1.5 mb-2">
            Non-Veg Pizzas
          </h3>
          <div className="space-y-1.5">
            {nonVegPizzas.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                highlighted={highlightedItemId === item.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sides */}
      <div className="mb-4" id="cat-sides">
        <h3 className="text-[11px] font-bold text-dominos-medium uppercase tracking-wider border-b border-dominos-border pb-1.5 mb-2">
          Sides & More
        </h3>
        <div className="space-y-1.5">
          {sides
            .filter((s) => (filter === "veg" ? s.type === "veg" : filter === "non-veg" ? s.type === "non-veg" : true))
            .map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                highlighted={highlightedItemId === item.id}
              />
            ))}
        </div>
      </div>

      {/* Desserts */}
      {showVeg && (
        <div className="mb-4" id="cat-desserts">
          <h3 className="text-[11px] font-bold text-dominos-medium uppercase tracking-wider border-b border-dominos-border pb-1.5 mb-2">
            Desserts
          </h3>
          <div className="space-y-1.5">
            {desserts.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                highlighted={highlightedItemId === item.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Beverages */}
      <div className="mb-4" id="cat-beverages">
        <h3 className="text-[11px] font-bold text-dominos-medium uppercase tracking-wider border-b border-dominos-border pb-1.5 mb-2">
          Beverages
        </h3>
        <div className="space-y-1.5">
          {beverages.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              highlighted={highlightedItemId === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
