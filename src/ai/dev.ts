'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/agronomic-ai-chatbot.ts';
import '@/ai/flows/weather-flow.ts';
import '@/ai/flows/fertilizer-calculator-flow.ts';
