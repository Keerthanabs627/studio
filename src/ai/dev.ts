
'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/agronomic-ai-chatbot.ts';
import '@/ai/flows/fertilizer-calculator-flow.ts';
import '@/ai/flows/soil-suitability-flow.ts';
import '@/ai/flows/crop-management-flow.ts';
import '@/ai/flows/crop-doctor-flow.ts';
import '@/ai/flows/voice-command-flow.ts';
import '@/ai/flows/weather-flow.ts';
import '@/ai/tools/agronomic-tools.ts';
import '@/ai/tools/navigation-tool.ts';

