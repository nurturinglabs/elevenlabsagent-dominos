export interface MenuItem {
  id: string;
  name: string;
  type: "veg" | "non-veg";
  description: string;
  category: "veg-pizza" | "non-veg-pizza" | "sides" | "desserts" | "beverages";
  prices?: { regular: number; medium: number; large: number };
  price?: number;
  size?: string;
  toppings?: string[];
}

export interface CrustOption {
  id: string;
  name: string;
  extra_cost: number;
  available_sizes: string[];
  default?: boolean;
}

export interface ExtraTopping {
  name: string;
  price: number;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  condition: string;
}

export interface CartItem {
  menu_id: string;
  name: string;
  size?: string;
  crust?: string;
  extra_toppings?: string[];
  quantity: number;
  line_price: number;
  half_and_half?: string | null;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  gst: number;
  delivery_fee: number;
  discount: number;
  total: number;
  applied_offer?: string;
}

export interface Order extends OrderSummary {
  order_id: string;
  status: string;
  delivery_type: "delivery" | "pickup";
  address?: string;
  estimated_delivery: string;
  created_at: string;
}

export interface TrackerStage {
  name: string;
  completed: boolean;
  active?: boolean;
  time?: string;
}
