// @ts-nocheck
'use server';

import { z } from 'zod';
import { handleVoiceCommand, VoiceCommandInput, VoiceCommandOutput } from '@/ai/flows/voice-command-flow';
import { getRealTimeMarketPrices } from '@/ai/flows/market-prices-flow';

export async function getMarketPrices(): Promise<{ data: {name: string, price: string, key: string, trend: 'up' | 'down' | 'stable', change: string}[] }> {
  try {
    const marketData = await getRealTimeMarketPrices();
    return { data: marketData.prices };
  } catch (error) {
    console.error("Error fetching real-time market prices:", error);
    // Fallback to empty array or could potentially use cached static data here
    return { data: [] };
  }
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
