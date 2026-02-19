import { NextResponse } from "next/server";
import { allMenuItems, crusts, vegToppings, nonVegToppings } from "@/lib/menu-data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = allMenuItems.find(i => i.id === id);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  return NextResponse.json({
    ...item,
    crusts: item.prices ? crusts : undefined,
    available_toppings: item.prices
      ? { veg: vegToppings, non_veg: nonVegToppings }
      : undefined,
  });
}
