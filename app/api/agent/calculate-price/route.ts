import { NextRequest, NextResponse } from "next/server";
import { calculateOrder } from "@/lib/price-calculator";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let items = body.items;
  const deliveryType = body.delivery_type || "delivery";

  if (typeof items === "string") {
    try {
      items = JSON.parse(items);
    } catch {
      return NextResponse.json({ error: "Invalid items JSON" }, { status: 400 });
    }
  }

  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: "items array required" }, { status: 400 });
  }

  const summary = calculateOrder(items, deliveryType);
  return NextResponse.json({
    items: summary.items.map(i => ({
      name: i.name,
      size: i.size,
      crust: i.crust,
      extra_toppings: i.extra_toppings,
      quantity: i.quantity,
      price: i.line_price,
    })),
    subtotal: summary.subtotal,
    gst: summary.gst,
    delivery_fee: summary.delivery_fee,
    discount: summary.discount,
    total: summary.total,
    free_delivery: summary.delivery_fee === 0 && deliveryType === "delivery",
  });
}
