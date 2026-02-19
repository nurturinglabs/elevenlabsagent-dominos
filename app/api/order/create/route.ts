import { NextRequest, NextResponse } from "next/server";
import { calculateOrder } from "@/lib/price-calculator";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items, delivery_type, address } = body;

  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: "Items array required" }, { status: 400 });
  }

  const summary = calculateOrder(items, delivery_type || "delivery");
  const orderId = `DM-${Math.floor(1000 + Math.random() * 9000)}`;

  return NextResponse.json({
    order_id: orderId,
    status: "confirmed",
    ...summary,
    delivery_type: delivery_type || "delivery",
    address: address || "Koramangala 5th Block, Bangalore",
    estimated_delivery: delivery_type === "pickup" ? "15 minutes" : "30 minutes",
    created_at: new Date().toISOString(),
  });
}
