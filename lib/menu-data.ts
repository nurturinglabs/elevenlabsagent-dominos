import { MenuItem, CrustOption, ExtraTopping } from "./types";

export const vegPizzas: MenuItem[] = [
  {
    id: "vp-1",
    name: "Margherita",
    type: "veg",
    description: "A hugely popular classic with cheese and tomato sauce",
    category: "veg-pizza",
    prices: { regular: 99, medium: 199, large: 449 },
    toppings: ["cheese", "tomato sauce"],
  },
  {
    id: "vp-2",
    name: "Double Cheese Margherita",
    type: "veg",
    description: "The ever-popular Margherita with a double layer of cheese",
    category: "veg-pizza",
    prices: { regular: 149, medium: 299, large: 499 },
    toppings: ["double cheese", "tomato sauce"],
  },
  {
    id: "vp-3",
    name: "Farmhouse",
    type: "veg",
    description: "Delightful combination of onion, capsicum, tomato, and grilled mushroom",
    category: "veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["onion", "capsicum", "tomato", "grilled mushroom", "cheese"],
  },
  {
    id: "vp-4",
    name: "Peppy Paneer",
    type: "veg",
    description: "Chunky paneer with capsicum and red paprika",
    category: "veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["paneer", "capsicum", "red paprika", "cheese"],
  },
  {
    id: "vp-5",
    name: "Mexican Green Wave",
    type: "veg",
    description: "Onion, capsicum, tomato, and jalapeno with ranch sauce",
    category: "veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["onion", "capsicum", "tomato", "jalapeno", "ranch sauce"],
  },
  {
    id: "vp-6",
    name: "Veg Extravaganza",
    type: "veg",
    description: "Loaded with capsicum, tomato, onion, grilled mushroom, corn, black olives, jalapeno, and cheese",
    category: "veg-pizza",
    prices: { regular: 249, medium: 399, large: 699 },
    toppings: ["capsicum", "tomato", "onion", "grilled mushroom", "corn", "black olives", "jalapeno", "cheese"],
  },
  {
    id: "vp-7",
    name: "Cheese & Corn",
    type: "veg",
    description: "Cheese and golden corn — a delicious duo",
    category: "veg-pizza",
    prices: { regular: 149, medium: 299, large: 499 },
    toppings: ["cheese", "golden corn"],
  },
  {
    id: "vp-8",
    name: "Paneer Makhani",
    type: "veg",
    description: "Paneer and capsicum on a rich makhani sauce base",
    category: "veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["paneer", "capsicum", "makhani sauce"],
  },
  {
    id: "vp-9",
    name: "Indi Tandoori Paneer",
    type: "veg",
    description: "Tandoori paneer with capsicum, red paprika, and mint mayo",
    category: "veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["tandoori paneer", "capsicum", "red paprika", "mint mayo"],
  },
  {
    id: "vp-10",
    name: "Fresh Veggie",
    type: "veg",
    description: "Onion, capsicum, tomato, and mushroom with cheese",
    category: "veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["onion", "capsicum", "tomato", "mushroom", "cheese"],
  },
];

export const nonVegPizzas: MenuItem[] = [
  {
    id: "nvp-1",
    name: "Pepper Barbecue Chicken",
    type: "non-veg",
    description: "Pepper barbecue chicken for that extra zing",
    category: "non-veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["pepper barbecue chicken", "cheese"],
  },
  {
    id: "nvp-2",
    name: "Chicken Sausage",
    type: "non-veg",
    description: "Herbed chicken sausage with cheese",
    category: "non-veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["chicken sausage", "cheese"],
  },
  {
    id: "nvp-3",
    name: "Chicken Golden Delight",
    type: "non-veg",
    description: "Golden roasted chicken chunks on a cheesy pizza",
    category: "non-veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["golden roasted chicken", "cheese"],
  },
  {
    id: "nvp-4",
    name: "Non-Veg Supreme",
    type: "non-veg",
    description: "Loaded with chicken tikka, chicken sausage, pepper barbecue chicken, and more",
    category: "non-veg-pizza",
    prices: { regular: 249, medium: 399, large: 699 },
    toppings: ["chicken tikka", "chicken sausage", "pepper barbecue chicken", "cheese"],
  },
  {
    id: "nvp-5",
    name: "Chicken Dominator",
    type: "non-veg",
    description: "Loaded to the max with five chicken toppings",
    category: "non-veg-pizza",
    prices: { regular: 229, medium: 449, large: 839 },
    toppings: ["chicken tikka", "chicken sausage", "pepper barbecue chicken", "grilled chicken rashers", "cheese"],
  },
  {
    id: "nvp-6",
    name: "Chicken Fiesta",
    type: "non-veg",
    description: "Grilled chicken rashers, peri-peri chicken, onion, and capsicum",
    category: "non-veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["grilled chicken rashers", "peri-peri chicken", "onion", "capsicum", "cheese"],
  },
  {
    id: "nvp-7",
    name: "Indi Chicken Tikka",
    type: "non-veg",
    description: "Chicken tikka with onion, red paprika, and mint mayo",
    category: "non-veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["chicken tikka", "onion", "red paprika", "mint mayo"],
  },
  {
    id: "nvp-8",
    name: "Chicken Pepperoni",
    type: "non-veg",
    description: "A classic American taste — chicken pepperoni loaded on cheese",
    category: "non-veg-pizza",
    prices: { regular: 199, medium: 349, large: 569 },
    toppings: ["chicken pepperoni", "cheese"],
  },
];

export const sides: MenuItem[] = [
  {
    id: "sd-1",
    name: "Garlic Breadsticks",
    type: "veg",
    description: "Crunchy, garlicky breadsticks",
    category: "sides",
    price: 99,
  },
  {
    id: "sd-2",
    name: "Stuffed Garlic Bread",
    type: "veg",
    description: "Garlic bread stuffed with cheese and jalapeno",
    category: "sides",
    price: 159,
  },
  {
    id: "sd-3",
    name: "Peri Peri Garlic Bread",
    type: "veg",
    description: "Garlic bread with a fiery peri-peri twist",
    category: "sides",
    price: 129,
  },
  {
    id: "sd-4",
    name: "Veg Pasta",
    type: "veg",
    description: "Penne pasta in a cheesy tomato sauce with veggies",
    category: "sides",
    price: 129,
  },
  {
    id: "sd-5",
    name: "Non-Veg Pasta",
    type: "non-veg",
    description: "Penne pasta in a cheesy tomato sauce with chicken",
    category: "sides",
    price: 159,
  },
  {
    id: "sd-6",
    name: "Chicken Wings Peri Peri",
    type: "non-veg",
    description: "Crispy chicken wings tossed in peri-peri seasoning",
    category: "sides",
    price: 199,
  },
  {
    id: "sd-7",
    name: "Chicken Wings Smoky BBQ",
    type: "non-veg",
    description: "Crispy chicken wings glazed with smoky BBQ sauce",
    category: "sides",
    price: 199,
  },
  {
    id: "sd-8",
    name: "Paneer Zingy Parcel",
    type: "veg",
    description: "Paneer stuffed parcel with tangy seasoning",
    category: "sides",
    price: 49,
  },
  {
    id: "sd-9",
    name: "Chicken Parcel",
    type: "non-veg",
    description: "Chicken stuffed parcel with spicy seasoning",
    category: "sides",
    price: 59,
  },
  {
    id: "sd-10",
    name: "Potato Cheese Shots",
    type: "veg",
    description: "Crispy potato bites loaded with cheese",
    category: "sides",
    price: 89,
  },
];

export const desserts: MenuItem[] = [
  {
    id: "ds-1",
    name: "Choco Lava Cake",
    type: "veg",
    description: "Chocolate cake with a gooey, molten chocolate centre",
    category: "desserts",
    price: 109,
  },
  {
    id: "ds-2",
    name: "Butterscotch Mousse Cake",
    type: "veg",
    description: "Delicate butterscotch mousse layered cake",
    category: "desserts",
    price: 109,
  },
  {
    id: "ds-3",
    name: "Red Velvet Lava Cake",
    type: "veg",
    description: "Red velvet cake with a creamy lava centre",
    category: "desserts",
    price: 109,
  },
];

export const beverages: MenuItem[] = [
  {
    id: "bv-1",
    name: "Coca-Cola 500ml",
    type: "veg",
    description: "Coca-Cola 500ml bottle",
    category: "beverages",
    price: 79,
    size: "500ml",
  },
  {
    id: "bv-2",
    name: "Coca-Cola 1.25L",
    type: "veg",
    description: "Coca-Cola 1.25L bottle",
    category: "beverages",
    price: 149,
    size: "1.25L",
  },
  {
    id: "bv-3",
    name: "Sprite 500ml",
    type: "veg",
    description: "Sprite 500ml bottle",
    category: "beverages",
    price: 79,
    size: "500ml",
  },
  {
    id: "bv-4",
    name: "Fanta 500ml",
    type: "veg",
    description: "Fanta 500ml bottle",
    category: "beverages",
    price: 79,
    size: "500ml",
  },
  {
    id: "bv-5",
    name: "Thums Up 500ml",
    type: "veg",
    description: "Thums Up 500ml bottle",
    category: "beverages",
    price: 79,
    size: "500ml",
  },
  {
    id: "bv-6",
    name: "Mirinda 500ml",
    type: "veg",
    description: "Mirinda 500ml bottle",
    category: "beverages",
    price: 79,
    size: "500ml",
  },
];

export const crusts: CrustOption[] = [
  {
    id: "crust-1",
    name: "New Hand Tossed",
    extra_cost: 0,
    available_sizes: ["regular", "medium", "large"],
    default: true,
  },
  {
    id: "crust-2",
    name: "Wheat Thin Crust",
    extra_cost: 0,
    available_sizes: ["medium", "large"],
  },
  {
    id: "crust-3",
    name: "Cheese Burst",
    extra_cost: 115,
    available_sizes: ["medium", "large"],
  },
  {
    id: "crust-4",
    name: "Classic Hand Tossed",
    extra_cost: 0,
    available_sizes: ["regular", "medium", "large"],
  },
  {
    id: "crust-5",
    name: "Fresh Pan Pizza",
    extra_cost: 40,
    available_sizes: ["medium"],
  },
];

export const vegToppings: ExtraTopping[] = [
  { name: "Extra Cheese", price: 60 },
  { name: "Paneer", price: 60 },
  { name: "Golden Corn", price: 40 },
  { name: "Black Olives", price: 40 },
  { name: "Jalapeno", price: 40 },
  { name: "Capsicum", price: 30 },
  { name: "Onion", price: 30 },
  { name: "Tomato", price: 30 },
  { name: "Grilled Mushroom", price: 40 },
  { name: "Red Paprika", price: 40 },
];

export const nonVegToppings: ExtraTopping[] = [
  { name: "Chicken Tikka", price: 75 },
  { name: "Peri-Peri Chicken", price: 75 },
  { name: "Chicken Sausage", price: 60 },
  { name: "Pepper Barbecue Chicken", price: 75 },
  { name: "Grilled Chicken Rashers", price: 75 },
];

export const allMenuItems: MenuItem[] = [
  ...vegPizzas,
  ...nonVegPizzas,
  ...sides,
  ...desserts,
  ...beverages,
];

export function getMenuByCategory(category?: string): MenuItem[] {
  if (!category) return allMenuItems;
  return allMenuItems.filter(
    (item) => item.category === category.toLowerCase()
  );
}

export function findItemByName(name: string): MenuItem | undefined {
  const search = name.toLowerCase();
  // Try exact match first
  const exact = allMenuItems.find(
    (item) => item.name.toLowerCase() === search
  );
  if (exact) return exact;
  // Fuzzy match using includes
  return allMenuItems.find(
    (item) =>
      item.name.toLowerCase().includes(search) ||
      search.includes(item.name.toLowerCase())
  );
}
