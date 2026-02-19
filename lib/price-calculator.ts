import { crusts, vegToppings, nonVegToppings, findItemByName } from "./menu-data";
import { CartItem, OrderSummary } from "./types";

export function calculateItemPrice(item: {
  name: string;
  size?: string;
  crust?: string;
  extra_toppings?: string[];
  quantity: number;
}): number {
  const menuItem = findItemByName(item.name);
  if (!menuItem) return 0;

  let base = 0;
  if (menuItem.prices && item.size) {
    base = menuItem.prices[item.size as keyof typeof menuItem.prices] || menuItem.prices.medium;
  } else if (menuItem.price) {
    base = menuItem.price;
  }

  // Add crust cost
  if (item.crust) {
    const crust = crusts.find(c => c.name.toLowerCase() === item.crust!.toLowerCase());
    if (crust) base += crust.extra_cost;
  }

  // Add extra toppings
  if (item.extra_toppings) {
    const allToppings = [...vegToppings, ...nonVegToppings];
    for (const t of item.extra_toppings) {
      const topping = allToppings.find(tp => tp.name.toLowerCase() === t.toLowerCase());
      if (topping) base += topping.price;
    }
  }

  return base * item.quantity;
}

export function calculateOrder(
  items: { name: string; size?: string; crust?: string; extra_toppings?: string[]; quantity: number }[],
  deliveryType: "delivery" | "pickup"
): OrderSummary {
  const cartItems: CartItem[] = items.map(item => ({
    menu_id: findItemByName(item.name)?.id || "",
    name: item.name,
    size: item.size,
    crust: item.crust,
    extra_toppings: item.extra_toppings,
    quantity: item.quantity,
    line_price: calculateItemPrice(item),
  }));

  const subtotal = cartItems.reduce((sum, i) => sum + i.line_price, 0);
  const gst = Math.round(subtotal * 0.05);
  const delivery_fee = deliveryType === "pickup" ? 0 : subtotal >= 399 ? 0 : 30;

  return {
    items: cartItems,
    subtotal,
    gst,
    delivery_fee,
    discount: 0,
    total: subtotal + gst + delivery_fee,
  };
}
