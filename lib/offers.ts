import { Offer } from "./types";

export const offers: Offer[] = [
  { id: "offer-1", name: "Everyday Value", description: "2 Regular Pizzas @ ₹99 each", condition: "Any 2 regular pizzas" },
  { id: "offer-2", name: "Medium Value", description: "2 Medium Pizzas @ ₹199 each", condition: "Any 2 medium pizzas" },
  { id: "offer-3", name: "Wednesday BOGO", description: "Buy 1 Get 1 Free on Medium & Large", condition: "Wednesdays only" },
  { id: "offer-4", name: "Free Delivery", description: "Free delivery on orders above ₹399", condition: "Order total >= 399" },
  { id: "offer-5", name: "Combo: MyBox", description: "1 Personal Pizza + Side + Drink @ ₹179", condition: "Select combos only" },
];

export const offerBannerTexts = [
  "🔥 2 Regular Pizzas @ ₹99 each",
  "🎉 Wednesday: Buy 1 Get 1 Free",
  "🚗 Free Delivery on orders above ₹399",
  "📦 MyBox Combo: Pizza + Side + Drink @ ₹179",
];
