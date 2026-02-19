import { NextRequest, NextResponse } from "next/server";
import { calculateOrder } from "@/lib/price-calculator";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let items = body.items;
  const deliveryType = body.delivery_type || "delivery";
  const address = body.address || "Koramangala 5th Block, Bangalore";

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
  const orderId = `DM-${Math.floor(1000 + Math.random() * 9000)}`;

  return NextResponse.json({
    success: true,
    order_id: orderId,
    status: "confirmed",
    items: summary.items.map(i => ({ name: i.name, size: i.size, crust: i.crust, quantity: i.quantity, price: i.line_price })),
    subtotal: summary.subtotal,
    gst: summary.gst,
    delivery_fee: summary.delivery_fee,
    total: summary.total,
    delivery_type: deliveryType,
    address: deliveryType === "delivery" ? address : "Pickup from store",
    estimated_delivery: deliveryType === "pickup" ? "15 minutes" : "30 minutes",
  });
}
