import { NextRequest, NextResponse } from "next/server";
import { getMenuByCategory } from "@/lib/menu-data";

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");
  
  if (type === "veg") {
    return NextResponse.json({
      "veg-pizza": getMenuByCategory("veg-pizza"),
      sides: getMenuByCategory("sides").filter(i => i.type === "veg"),
      desserts: getMenuByCategory("desserts"),
      beverages: getMenuByCategory("beverages"),
    });
  }
  if (type === "non-veg") {
    return NextResponse.json({
      "non-veg-pizza": getMenuByCategory("non-veg-pizza"),
      sides: getMenuByCategory("sides").filter(i => i.type === "non-veg"),
    });
  }
  
  return NextResponse.json({
    "veg-pizza": getMenuByCategory("veg-pizza"),
    "non-veg-pizza": getMenuByCategory("non-veg-pizza"),
    sides: getMenuByCategory("sides"),
    desserts: getMenuByCategory("desserts"),
    beverages: getMenuByCategory("beverages"),
  });
}
