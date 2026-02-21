import { NextRequest, NextResponse } from "next/server";
import { calculateOrder } from "@/lib/price-calculator";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    console.error("[calculate-price] Failed to parse request body");
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  console.log("[calculate-price] Received:", JSON.stringify(body));

  let items = body.items;
  const deliveryType = body.delivery_type || body.deliveryType || "delivery";

  if (typeof items === "string") {
    try {
      // ElevenLabs agent sometimes sends Python-style single quotes
      const cleaned = items.replace(/'/g, '"');
      items = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: "Invalid items JSON" }, { status: 400 });
    }
  }

  // If no items array, try to build one from the body itself
  if (!items || !Array.isArray(items)) {
    if (body.name || body.item_name) {
      items = [{
        name: body.name || body.item_name,
        size: body.size || "medium",
        quantity: body.quantity || 1,
      }];
    } else {
      return NextResponse.json({ error: "items array required" }, { status: 400 });
    }
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
