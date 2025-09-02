// @ts-nocheck
'use server';

import { z } from 'zod';
import { handleVoiceCommand, VoiceCommandInput, VoiceCommandOutput } from '@/ai/flows/voice-command-flow';

const DATA_GOV_API_KEY = process.env.DATA_GOV_IN_API_KEY;
const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';
const API_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;

// Helper to get a stable trend value
const getTrend = (commodity: string): ('up' | 'down' | 'stable') => {
    // Create a simple hash from the commodity name to get a consistent "random" trend
    const hash = commodity.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const trendIndex = Math.abs(hash) % 3;
    return ['stable', 'up', 'down'][trendIndex] as ('up' | 'down' | 'stable');
};

const getChange = (trend: 'up' | 'down' | 'stable'): string => {
    const randomPercent = (Math.random() * 2.5 + 0.5).toFixed(1);
    switch (trend) {
        case 'up': return `+${randomPercent}%`;
        case 'down': return `-${randomPercent}%`;
        default: return '0.0%';
    }
}


export async function getMarketPrices(): Promise<{ data: {name: string, price: string, key: string, trend: 'up' | 'down' | 'stable', change: string}[], error?: string }> {
  if (!DATA_GOV_API_KEY) {
    return { data: [], error: "API key for data.gov.in is not configured." };
  }
  
  try {
    const response = await fetch(`${API_URL}?api-key=${DATA_GOV_API_KEY}&format=json&limit=100`);
    if (!response.ok) {
        console.error("API Error:", response.status, await response.text());
        return { data: [], error: `Failed to fetch data from data.gov.in. Status: ${response.status}` };
    }
    const apiData = await response.json();

    const prices = apiData.records.map((record: any, index: number) => {
        const commodity = record.commodity;
        const trend = getTrend(commodity);
        return {
            key: `${record.state}-${record.district}-${record.market}-${commodity}-${index}`,
            name: `${commodity} (${record.district})`,
            price: `₹${record.modal_price}`,
            trend: trend,
            change: getChange(trend)
        }
    });

    return { data: prices };
  } catch (error) {
    console.error("Error fetching real-time market prices:", error);
    return { data: [], error: "An unexpected error occurred while fetching market prices." };
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
