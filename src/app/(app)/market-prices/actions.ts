// @ts-nocheck
'use server';

import { z } from 'zod';
import { handleVoiceCommand, VoiceCommandInput, VoiceCommandOutput } from '@/ai/flows/voice-command-flow';

const cropPriceData = [
  // Grains
  { key: "wheat", name: "Wheat (Quintal)", price: "₹2,350" },
  { key: "paddy", name: "Paddy (Quintal)", price: "₹2,200" },
  { key: "maize", name: "Maize (Quintal)", price: "₹2,150" },
  { key: "barley", name: "Barley (Quintal)", price: "₹1,800" },
  { key: "sorghum", name: "Sorghum (Jowar) (Quintal)", price: "₹2,900" },
  { key: "pearl_millet", name: "Pearl Millet (Bajra) (Quintal)", price: "₹2,400" },
  { key: "finger_millet", name: "Finger Millet (Ragi) (Quintal)", price: "₹3,800" },
  
  // Pulses
  { key: "chickpea", name: "Chickpea (Gram) (Quintal)", price: "₹5,400" },
  { key: "pigeon_pea", name: "Pigeon Pea (Tur/Arhar) (Quintal)", price: "₹9,500" },
  { key: "lentil", name: "Lentil (Masur) (Quintal)", price: "₹6,800" },
  { key: "green_gram", name: "Green Gram (Moong) (Quintal)", price: "₹8,500" },
  { key: "black_gram", name: "Black Gram (Urad) (Quintal)", price: "₹7,800" },
  { key: "kidney_bean", name: "Kidney Bean (Rajma) (Quintal)", price: "₹12,000" },

  // Oilseeds
  { key: "soybean", name: "Soybean (Quintal)", price: "₹4,800" },
  { key: "groundnut", name: "Groundnut (Quintal)", price: "₹6,500" },
  { key: "mustard", name: "Mustard (Quintal)", price: "₹5,600" },
  { key: "sunflower", name: "Sunflower (Quintal)", price: "₹5,200" },
  { key: "sesame", name: "Sesame (Til) (Quintal)", price: "₹14,000" },
  { key: "castor_seed", name: "Castor Seed (Quintal)", price: "₹5,800" },

  // Cash Crops
  { key: "sugarcane", name: "Sugarcane (Tonne)", price: "₹3,600" },
  { key: "cotton", name: "Cotton (Quintal)", price: "₹7,200" },
  { key: "jute", name: "Jute (Quintal)", price: "₹5,000" },
  { key: "turmeric", name: "Turmeric (Quintal)", price: "₹8,000" },

  // Vegetables (per Kg)
  { key: "tomato", name: "Tomato (Kg)", price: "₹35" },
  { key: "onion", name: "Onion (Kg)", price: "₹25" },
  { key: "potato", name: "Potato (Kg)", price: "₹20" },
  { key: "brinjal", name: "Brinjal (Kg)", price: "₹30" },
  { key: "cauliflower", name: "Cauliflower (Kg)", price: "₹40" },
  { key: "cabbage", name: "Cabbage (Kg)", price: "₹25" },
  { key: "okra", name: "Okra (Lady's Finger) (Kg)", price: "₹45" },
  { key: "chilli", name: "Chilli (Kg)", price: "₹60" },
  { key: "capsicum", name: "Capsicum (Kg)", price: "₹70" },
  { key: "ginger", name: "Ginger (Kg)", price: "₹120" },
  { key: "garlic", name: "Garlic (Kg)", price: "₹150" },
  { key: "peas", name: "Peas (Kg)", price: "₹50" },
  { key: "cucumber", name: "Cucumber (Kg)", price: "₹30" },
  { key: "carrot", name: "Carrot (Kg)", price: "₹40" },
  { key: "radish", name: "Radish (Kg)", price: "₹25" },

  // Fruits (per Kg or Dozen)
  { key: "mango", name: "Mango (Kg)", price: "₹80" },
  { key: "banana", name: "Banana (Dozen)", price: "₹50" },
  { key: "apple", name: "Apple (Kg)", price: "₹150" },
  { key: "orange", name: "Orange (Kg)", price: "₹70" },
  { key: "grapes", name: "Grapes (Kg)", price: "₹90" },
  { key: "guava", name: "Guava (Kg)", price: "₹60" },
  { key: "papaya", name: "Papaya (Kg)", price: "₹40" },
  { key: "pomegranate", name: "Pomegranate (Kg)", price: "₹130" },
  { key: "lemon", name: "Lemon (Kg)", price: "₹50" },

  // Spices (per Kg)
  { key: "coriander", name: "Coriander (Dhaniya) (Kg)", price: "₹100" },
  { key: "cumin", name: "Cumin (Jeera) (Kg)", price: "₹250" },
  { key: "fennel", name: "Fennel (Saunf) (Kg)", price: "₹180" },
  { key: "fenugreek", name: "Fenugreek (Methi) (Kg)", price: "₹80" },
  { key: "black_pepper", name: "Black Pepper (Kg)", price: "₹500" },
  { key: "cardamom", name: "Cardamom (Kg)", price: "₹1,500" },
  { key: "clove", name: "Clove (Kg)", price: "₹900" },
];

export async function getMarketPrices(): Promise<{ data: {name: string, price: string, key: string}[] }> {
  // In a real app, you'd fetch this from a database and translate it.
  return Promise.resolve({ data: cropPriceData });
}


const voiceCommandSchema = z.object({
  query: z.string(),
});

export async function getVoiceCommandResponse(input: VoiceCommandInput): Promise<VoiceCommandOutput> {
  const validatedInput = voiceCommandSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    throw new Error(`Invalid input: ${errorMessage}`);
  }

  try {
    const output = await handleVoiceCommand(validatedInput.data);
    return output;
  } catch (e) {
    console.error('Voice Command Action Error:', e);
    throw new Error('An unexpected error occurred. Please try again later.');
  }
}
