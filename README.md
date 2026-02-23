# Domino's Voice Agent

Voice-powered pizza ordering with a browsable menu, real-time cart updates, and conversational order flow. Built on ElevenLabs Conversational AI with WebRTC.

**Live:** [elevenlabsagent-dominos.vercel.app](https://elevenlabsagent-dominos.vercel.app)

## What It Does

A customer speaks their order, and the voice agent handles the full flow — browsing the menu, adding items to the cart, applying offers, and confirming the order. The UI updates live as the agent works.

- **Menu browsing** — 20+ items across pizzas, sides, desserts, beverages
- **Cart management** — real-time item additions with size/crust/topping options
- **Pricing** — GST calculation, delivery fees, offer discounts
- **Order tracking** — pizza tracker with delivery stages

## ElevenLabs Integration

**Conversational AI** via `@elevenlabs/react` with WebRTC streaming.

**Server Tools** (agent calls these API routes):
| Tool | Endpoint | Purpose |
|------|----------|---------|
| get-menu | `/api/agent/get-menu` | Fetch menu by category |
| item-details | `/api/agent/item-details` | Get item prices, crusts, toppings |
| calculate-price | `/api/agent/calculate-price` | Calculate order total |
| place-order | `/api/agent/place-order` | Confirm and place order |

**Client Tools** (agent triggers these UI updates):
| Tool | What It Does |
|------|-------------|
| update_cart | Updates cart with items, subtotal, GST, total |
| highlight_menu_item | Scrolls to and highlights a menu item |
| show_offer_applied | Shows discount/offer confirmation |
| set_delivery_type | Toggles delivery vs. pickup |
| show_order_confirmed | Shows order confirmation with pizza tracker |

## Pages

- `/` — Landing page with business case
- `/demo` — Interactive voice ordering with live menu and cart
- `/analytics` — Order analytics dashboard

## Menu

- **Veg Pizzas** (10) — Margherita, Farmhouse, Peppy Paneer, etc.
- **Non-Veg Pizzas** (8) — Pepper BBQ Chicken, Chicken Dominator, etc.
- **Sides** (10) — Garlic Bread, Pasta, Wings, etc.
- **Desserts** (3) — Choco Lava Cake, etc.
- **Beverages** (6) — Coca-Cola, Sprite, etc.
- **Crusts** (5) — Hand Tossed, Cheese Burst (+₹115), Wheat Thin, etc.

## Tech Stack

Next.js 16 | TypeScript | Tailwind v4 | ElevenLabs SDK | Recharts | Vercel

## Setup

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id
```

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).
