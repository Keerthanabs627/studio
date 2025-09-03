
'use server';

import {
  getVoiceCommandResponse,
  type VoiceCommandInput,
  type VoiceCommandOutput,
} from './voice-command-actions';
import { marketData } from './data';

export type PriceData = (typeof marketData)[0];


export async function getMarketPrices(): Promise<{
  data: PriceData[];
  error?: string;
}> {
  try {
    // In a real app, this could fetch from an API.
    // For this prototype, we're returning mock data.
    return { data: marketData };
  } catch (error) {
    console.error('Error fetching market prices:', error);
    return {
      data: [],
      error: 'An unexpected error occurred while fetching market prices.',
    };
  }
}

export async function getVoiceCommandResponseHandler(
  input: VoiceCommandInput
): Promise<VoiceCommandOutput> {
  return await getVoiceCommandResponse(input);
}
