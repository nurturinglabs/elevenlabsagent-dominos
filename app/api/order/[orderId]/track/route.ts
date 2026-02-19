import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  // For demo, cycle through stages based on time
  const stages = [
    { name: "Order Placed", completed: true, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) },
    { name: "Prep", completed: false, active: true },
    { name: "Quality Check", completed: false },
    { name: "Out for Delivery", completed: false },
  ];

  const now = new Date();
  const eta = new Date(now.getTime() + 30 * 60000);

  return NextResponse.json({
    order_id: orderId,
    status: "prep",
    stages,
    estimated_arrival: eta.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  });
}
