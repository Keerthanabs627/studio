// @ts-nocheck
'use server';

const cropPriceData = [
  { key: "wheat", name: "Wheat (Quintal)", price: "₹2,275" },
  { key: "paddy", name: "Paddy (Quintal)", price: "₹2,183" },
  { key: "maize", name: "Maize (Quintal)", price: "₹2,090" },
  { key: "sugarcane", name: "Sugarcane (Tonne)", price: "₹3,500" },
  { key: "cotton", name: "Cotton (Quintal)", price: "₹7,020" },
  { key: "soybean", name: "Soybean (Quintal)", price: "₹4,650" },
  { key: "tomato", name: "Tomato (Kg)", price: "₹45" },
  { key: "onion", name: "Onion (Kg)", price: "₹30" },
  { key: "mustard", name: "Mustard (Quintal)", price: "₹5,450" },
  { key: "gram", name: "Gram (Quintal)", price: "₹5,100" },
  { key: "lentil", name: "Lentil (Quintal)", price: "₹6,600" },
  { key: "turmeric", name: "Turmeric (Quintal)", price: "₹7,500" },
];

export async function getMarketPrices(): Promise<{ data: {name: string, price: string}[] }> {
  // In a real app, you'd fetch this from a database and translate it.
  // For now, we return a small subset of the static data.
  return Promise.resolve({ data: cropPriceData.slice(0, 5) });
}
