import { NextRequest, NextResponse } from "next/server";
import { findItemByName, crusts, vegToppings, nonVegToppings } from "@/lib/menu-data";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const itemName = body.item_name;

  if (!itemName) {
    return NextResponse.json({ error: "item_name required" }, { status: 400 });
  }

  const item = findItemByName(itemName);
  if (!item) {
    return NextResponse.json({
      error: `Item "${itemName}" not found. Try searching for a similar name.`,
    });
  }

  return NextResponse.json({
    name: item.name,
    type: item.type,
    description: item.description,
    prices: item.prices,
    price: item.price,
    size: item.size,
    toppings: item.toppings,
    crust_options: item.prices ? crusts.map(c => ({ name: c.name, extra_cost: c.extra_cost, sizes: c.available_sizes })) : undefined,
    extra_toppings_available: item.prices ? { veg: vegToppings, non_veg: nonVegToppings } : undefined,
  });
}
