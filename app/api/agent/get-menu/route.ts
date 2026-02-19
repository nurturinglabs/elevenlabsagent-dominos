import { NextRequest, NextResponse } from "next/server";
import { getMenuByCategory } from "@/lib/menu-data";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const category = body.category || "all";

  if (category === "all") {
    const menu = {
      "veg-pizza": getMenuByCategory("veg-pizza").map(i => ({ name: i.name, type: i.type, prices: i.prices, description: i.description })),
      "non-veg-pizza": getMenuByCategory("non-veg-pizza").map(i => ({ name: i.name, type: i.type, prices: i.prices, description: i.description })),
      sides: getMenuByCategory("sides").map(i => ({ name: i.name, type: i.type, price: i.price, description: i.description })),
      desserts: getMenuByCategory("desserts").map(i => ({ name: i.name, price: i.price, description: i.description })),
      beverages: getMenuByCategory("beverages").map(i => ({ name: i.name, price: i.price, size: i.size })),
    };
    return NextResponse.json(menu);
  }

  const items = getMenuByCategory(category).map(i => ({
    name: i.name,
    type: i.type,
    prices: i.prices,
    price: i.price,
    description: i.description,
  }));

  return NextResponse.json({ [category]: items });
}
