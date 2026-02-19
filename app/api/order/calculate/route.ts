import { NextRequest, NextResponse } from "next/server";
import { calculateOrder } from "@/lib/price-calculator";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items, delivery_type } = body;
  
  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: "Items array required" }, { status: 400 });
  }

  const summary = calculateOrder(items, delivery_type || "delivery");
  return NextResponse.json(summary);
}
