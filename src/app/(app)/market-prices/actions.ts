
'use server';

import {
  getRealTimeMarketPrices,
  MarketPricesOutput,
} from '@/ai/flows/market-prices-flow';
import {
  getVoiceCommandResponse,
  type VoiceCommandInput,
  type VoiceCommandOutput,
} from './voice-command-actions';
import { getMarketPrices as getMarketPricesFromTool } from '@/ai/tools/agronomic-tools';


export async function getMarketPrices(): Promise<{
  data: {
    name: string;
    price: string;
    key: string;
    trend: 'up' | 'down' | 'stable';
    change: string;
  }[];
  error?: string;
}> {
  try {
    const marketData = await getRealTimeMarketPrices();
    return {data: marketData.prices};
  } catch (error) {
    console.error('Error fetching real-time market prices:', error);
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
