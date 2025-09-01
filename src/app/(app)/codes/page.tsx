// @ts-nocheck
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useI18n } from '@/locales/client';
import { ScrollArea } from '@/components/ui/scroll-area';

const files = [
  {
    path: '.env',
    content: ``,
  },
  {
    path: 'README.md',
    content: `# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.`,
  },
  {
    path: 'apphosting.yaml',
    content: `# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
`,
  },
  {
    path: 'components.json',
    content: `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}`,
  },
  {
    path: 'next.config.ts',
    content: `import type {NextConfig} from 'next';

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withPWA(nextConfig);
`,
  },
  {
    path: 'package.json',
    content: `{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/googleai": "^1.14.1",
    "@genkit-ai/next": "^1.14.1",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.14.1",
    "lucide-react": "^0.475.0",
    "next": "15.3.3",
    "next-pwa": "^5.6.0",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "wav": "^1.0.2",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "genkit-cli": "^1.14.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
`,
  },
  {
    path: 'src/ai/dev.ts',
    content: `'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/agronomic-ai-chatbot.ts';
import '@/ai/flows/weather-flow.ts';
import '@/ai/flows/fertilizer-calculator-flow.ts';
import '@/ai/flows/soil-suitability-flow.ts';
import '@/ai/flows/crop-management-flow.ts';
import '@/ai/flows/crop-doctor-flow.ts';
import '@/ai/tools/agronomic-tools.ts';
`,
  },
  {
    path: 'src/ai/flows/agronomic-ai-chatbot.ts',
    content: `'use server';

/**
 * @fileOverview An AI chatbot that can use tools to answer agricultural questions.
 *
 * - generalAIChatbot - A function that handles the chatbot interactions.
 * - GeneralAIChatbotInput - The input type for the generalAIChatbot function.
 * - GeneralAIChatbotOutput - The return type for the generalAIChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {
  cropDoctorTool,
  fertilizerCalculatorTool,
  soilSuitabilityTool,
  weatherTool,
} from '../tools/agronomic-tools';
import { generate } from 'genkit';

const GeneralAIChatbotInputSchema = z.object({
  query: z.string().describe('The user query.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo provided by the user if requested, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GeneralAIChatbotInput = z.infer<typeof GeneralAIChatbotInputSchema>;

const GeneralAIChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot response to the user query.'),
  requires_image: z
    .boolean()
    .describe(
      'Set to true if you need the user to provide an image to answer their query (e.g., for plant disease diagnosis).'
    ),
});
export type GeneralAIChatbotOutput = z.infer<
  typeof GeneralAIChatbotOutputSchema
>;

export async function generalAIChatbot(
  input: GeneralAIChatbotInput
): Promise<GeneralAIChatbotOutput> {
  return generalAIChatbotFlow(input);
}

const prompt = ai.definePrompt({
    name: 'agronomicAIChatbotPrompt',
    input: { schema: GeneralAIChatbotInputSchema },
    output: { schema: GeneralAIChatbotOutputSchema },
    tools: [
        weatherTool,
        soilSuitabilityTool,
        fertilizerCalculatorTool,
        cropDoctorTool,
    ],
    prompt: \`You are an expert AI agronomist assistant for Indian farmers. Your primary goal is to be as helpful as possible.
- Your main expertise is agriculture. Use the provided tools to answer user questions comprehensively.
- If a user asks a question that is not related to agriculture, answer it as a general AI assistant.
- If a user asks about something that requires a visual, like a plant disease, you MUST ask the user to upload a photo. Do not try to answer without the image. You should respond by asking for the photo, and you MUST set requires_image to true. If you need to use the diagnoseCrop tool but don't have an image, ask for it.
- If the user provides an image, use the cropDoctorTool to analyze it.
- Combine information from multiple tools if needed to give a complete answer.
- Always be friendly and conversational.
- The user has provided the following query and, optionally, a photo.

User query: {{{query}}}
{{#if photoDataUri}}
Photo: {{media url=photoDataUri}}
{{/if}}
\`,
});


const generalAIChatbotFlow = ai.defineFlow(
  {
    name: 'generalAIChatbotFlow',
    inputSchema: GeneralAIChatbotInputSchema,
    outputSchema: GeneralAIChatbotOutputSchema,
  },
  async input => {
    // A specific workaround: if the model might need to use the crop doctor tool,
    // but the user hasn't provided a photo, we interrupt the flow and ask for one.
    const mightNeedImage = /disease|sick|dying|unhealthy|problem|issue|spot|leaf/i.test(input.query);
    if (mightNeedImage && !input.photoDataUri) {
        return {
            answer: "It sounds like you have a question about a plant's health. To help you with that, please upload a photo of the affected plant.",
            requires_image: true,
        };
    }

    const {output} = await prompt(input);
    if (!output) {
        return {
            answer: "Sorry, I encountered an issue and cannot provide a response right now. Please try again.",
            requires_image: false,
        };
    }

    // The 'requires_image' flag from the model is often unreliable.
    // We force it to false here because we've already handled the image request case above.
    // The only time it should be true is in our specific check.
    return {
        ...output,
        requires_image: output.requires_image || false,
    };
  }
);
`,
  },
  {
    path: 'src/ai/flows/crop-doctor-flow.ts',
    content: `'use server';
/**
 * @fileOverview An AI agent for diagnosing plant diseases from images.
 *
 * - diagnoseCrop - A function that handles the plant diagnosis process.
 * - CropDoctorInput - The input type for the diagnoseCrop function.
 * - CropDoctorOutput - The return type for the diagnoseCrop function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropDoctorInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an unhealthy plant leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CropDoctorInput = z.infer<typeof CropDoctorInputSchema>;

const CropDoctorOutputSchema = z.object({
  is_plant: z.boolean().describe('Whether the image appears to contain a plant or not.'),
  disease: z.string().describe('The common name of the identified plant disease (e.g., "Powdery Mildew", "Black Spot", "Healthy").'),
  confidence: z.number().min(0).max(100).describe('A confidence score (0-100) for the diagnosis.'),
  diagnosis: z.string().describe('A detailed explanation of the symptoms and the reasoning behind the diagnosis.'),
  recommendation: z.string().describe('Actionable steps and recommendations for treating the identified disease or maintaining plant health.'),
});
export type CropDoctorOutput = z.infer<typeof CropDoctorOutputSchema>;

export async function diagnoseCrop(input: CropDoctorInput): Promise<CropDoctorOutput> {
  return cropDoctorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropDoctorPrompt',
  input: {schema: CropDoctorInputSchema},
  output: {schema: CropDoctorOutputSchema},
  prompt: \`You are an expert plant pathologist and agronomist specializing in diagnosing plant diseases from images for an Indian farmer.

Analyze the provided image of a plant leaf. Based on the visual evidence, provide a comprehensive diagnosis.

- First, confirm if the image contains a plant.
- If it is a plant, identify any visible diseases. If the plant appears healthy, state "Healthy".
- Provide a confidence score (0-100) for your diagnosis.
- Write a detailed diagnosis explaining the symptoms you see and how they relate to the disease.
- Provide a clear, actionable recommendation for treatment or prevention. Suggest organic or readily available solutions where possible.

If the image is not a plant, set the is_plant flag to false and provide appropriate feedback in the diagnosis and recommendation fields.

Image: {{media url=photoDataUri}}\`,
});

const cropDoctorFlow = ai.defineFlow(
  {
    name: 'cropDoctorFlow',
    inputSchema: CropDoctorInputSchema,
    outputSchema: CropDoctorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
`,
  },
  {
    path: 'src/ai/flows/crop-management-flow.ts',
    content: `'use server';

/**
 * @fileOverview A flow to get crop management advice.
 *
 * - getCropManagementAdvice - A function that returns advice for a crop at a specific growth stage.
 * - CropManagementInput - The input type for the getCropManagementAdvice function.
 * - CropManagementOutput - The return type for the getCropManagementAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropManagementInputSchema = z.object({
  crop: z.string().describe('The name of the crop (e.g., "Tomato", "Wheat").'),
  growth_stage: z.string().describe('The current growth stage of the crop (e.g., "Seedling", "Flowering", "Fruiting").'),
  soil_moisture: z.string().describe("The current soil moisture level (e.g., '25%')."),
  nitrogen_level: z.string().describe("The soil nitrogen level (e.g., '120 kg/ha')."),
  phosphorus_level: z.string().describe("The soil phosphorus level (e.g., '60 kg/ha')."),
  potassium_level: z.string().describe("The soil potassium level (e.g., '40 kg/ha')."),
  soil_ph: z.number().describe("The soil pH level (e.g., 6.5)."),
});
export type CropManagementInput = z.infer<typeof CropManagementInputSchema>;

const CropManagementOutputSchema = z.object({
  advice: z.string().describe('Detailed management advice for the specified crop and growth stage, covering watering, nutrients, pest control, and other relevant tasks.'),
});
export type CropManagementOutput = z.infer<typeof CropManagementOutputSchema>;

export async function getCropManagementAdvice(input: CropManagementInput): Promise<CropManagementOutput> {
  return cropManagementFlow(input);
}

const cropManagementPrompt = ai.definePrompt({
  name: 'cropManagementPrompt',
  input: {schema: CropManagementInputSchema},
  output: {schema: CropManagementOutputSchema},
  prompt: \`You are an expert agronomist providing detailed and actionable management advice for a farmer in India.
  
  Crop: {{{crop}}}
  Growth Stage: {{{growth_stage}}}
  Soil Moisture: {{{soil_moisture}}}
  Soil NPK Levels: N:{{{nitrogen_level}}}, P:{{{phosphorus_level}}}, K:{{{potassium_level}}}
  Soil pH: {{{soil_ph}}}

  Based on all the provided data for the crop, its growth stage and current soil conditions, provide specific recommendations covering the following areas.
  Format the response as a single block of text with clear headings for each section. Use bold for headings.

  **1. Irrigation/Watering:**
  How much and how often to water based on the moisture level.
  
  **2. Nutrient Management:**
  What fertilizers or nutrients are needed based on the NPK levels and pH. Be specific about quantities.

  **3. Pest & Disease Control:**
  Common threats to look for at this stage and how to manage them (prefer organic or integrated pest management solutions).
  
  **4. General Tasks:**
  Any other important activities like weeding, pruning, or support.
  \`,
});

const cropManagementFlow = ai.defineFlow(
  {
    name: 'cropManagementFlow',
    inputSchema: CropManagementInputSchema,
    outputSchema: CropManagementOutputSchema,
  },
  async input => {
    const {output} = await cropManagementPrompt(input);
    return output!;
  }
);
`,
  },
  {
    path: 'src/ai/flows/fertilizer-calculator-flow.ts',
    content: `'use server';

/**
 * @fileOverview A flow to calculate a smart, multi-stage fertilizer plan.
 *
 * - getFertilizerRecommendation - A function that returns fertilizer recommendations.
 * - FertilizerInput - The input type for the getFertilizerRecommendation function.
 * - FertilizerOutput - The return type for the getFertilizerRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FertilizerInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  area: z.number().describe('The area of land in acres.'),
});
export type FertilizerInput = z.infer<typeof FertilizerInputSchema>;

const StagePlanSchema = z.object({
  stage: z.string().describe('The growth stage (e.g., "Planting", "Vegetative").'),
  recommendation: z.string().describe('The specific fertilizer recommendation for this stage.'),
  reasoning: z.string().describe('A brief explanation for why this recommendation is made.'),
  estimated_cost: z
    .string()
    .describe(
      'An estimated cost for this stage in Indian Rupees (e.g., "₹800 - ₹1000 per acre").'
    ),
});

const FertilizerOutputSchema = z.object({
  plan: z.array(StagePlanSchema).describe('A multi-stage fertilization plan for the crop.'),
  waste_savings_alert: z.object({
    notice: z.string().describe('A specific, actionable notice about how to avoid common fertilizer waste for this crop.'),
    savings_estimate: z.string().describe('An estimated cost saving in Indian Rupees (e.g., "₹1200 per acre").'),
  }),
});
export type FertilizerOutput = z.infer<typeof FertilizerOutputSchema>;

export async function getFertilizerRecommendation(input: FertilizerInput): Promise<FertilizerOutput> {
  return fertilizerCalculatorFlow(input);
}

const fertilizerCalculatorPrompt = ai.definePrompt({
  name: 'fertilizerCalculatorPrompt',
  input: {schema: FertilizerInputSchema},
  output: {schema: FertilizerOutputSchema},
  prompt: \`You are an agricultural expert creating a "Smart Yield Plan" for an Indian farmer. Your goal is to maximize yield while minimizing fertilizer waste.
  
  Based on the crop name, create a realistic, multi-stage fertilization plan. Assume average soil conditions for that crop in India. The plan should have 2-3 key growth stages. For each stage, provide a recommendation, reasoning, AND an estimated cost in Indian Rupees (INR).

  CRUCIALLY, you must also provide a "Waste Savings Alert". This alert must identify a common fertilizer over-application practice for the given crop and advise the farmer on how to avoid it, including a specific estimated cost saving in Indian Rupees (INR).

  Crop: {{{cropName}}}
  Area: {{{area}}} acres

  Generate the structured plan and the waste savings alert.
  \`,
});

const fertilizerCalculatorFlow = ai.defineFlow(
  {
    name: 'fertilizerCalculatorFlow',
    inputSchema: FertilizerInputSchema,
    outputSchema: FertilizerOutputSchema,
  },
  async input => {
    const {output} = await fertilizerCalculatorPrompt(input);
    return output!;
  }
);
`,
  },
  {
    path: 'src/ai/flows/soil-suitability-flow.ts',
    content: `'use server';

/**
 * @fileOverview A flow to check soil suitability for a crop.
 *
 * - getSoilSuitability - A function that returns a soil suitability analysis.
 * - SoilSuitabilityInput - The input type for the getSoilSuitability function.
 * - SoilSuitabilityOutput - The return type for the getSoilSuitability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SoilSuitabilityInputSchema = z.object({
  crop: z.string().describe('The name of the crop being considered.'),
  soil_type: z.string().describe('The type of soil in the field (e.g., "Clay", "Sandy Loam", "Alluvial").'),
});
export type SoilSuitabilityInput = z.infer<typeof SoilSuitabilityInputSchema>;

const SoilSuitabilityOutputSchema = z.object({
  is_suitable: z.boolean().describe('Whether the soil is considered suitable for the crop.'),
  suitability_score: z.number().min(0).max(100).describe('A score from 0 to 100 indicating the degree of suitability.'),
  analysis: z.string().describe('A brief analysis explaining the suitability score and key factors.'),
  recommendations: z.string().describe('Recommendations for improving soil or alternative crop suggestions if not suitable.'),
  ideal_conditions: z.object({
      rainfall: z.string().describe("Ideal annual rainfall range, e.g., '1000-1500 mm'"),
      temperature: z.string().describe("Ideal temperature range, e.g., '25-35°C'"),
      ph_range: z.string().describe("Ideal soil pH range, e.g., '6.0-7.5'"),
      sunlight: z.string().describe("Ideal sunlight requirements, e.g., '6-8 hours/day'"),
  }),
});
export type SoilSuitabilityOutput = z.infer<typeof SoilSuitabilityOutputSchema>;

export async function getSoilSuitability(input: SoilSuitabilityInput): Promise<SoilSuitabilityOutput> {
  return soilSuitabilityFlow(input);
}

const soilSuitabilityPrompt = ai.definePrompt({
  name: 'soilSuitabilityPrompt',
  input: {schema: SoilSuitabilityInputSchema},
  output: {schema: SoilSuitabilityOutputSchema},
  prompt: \`You are an expert soil scientist and agronomist providing advice for Indian agricultural conditions.
  Analyze the suitability of a given soil type for a specific crop.

  Crop: {{{crop}}}
  Soil Type: {{{soil_type}}}

  - Determine if the soil is suitable.
  - Provide a suitability score from 0 to 100.
  - Give a brief analysis explaining the score.
  - Offer recommendations: if suitable, suggest any amendments; if not, explain why and suggest alternative crops suitable for that soil.
  - List the ideal conditions (rainfall, temperature, pH, sunlight) for the selected crop.
  \`,
});

const soilSuitabilityFlow = ai.defineFlow(
  {
    name: 'soilSuitabilityFlow',
    inputSchema: SoilSuitabilityInputSchema,
    outputSchema: SoilSuitabilityOutputSchema,
  },
  async input => {
    const {output} = await soilSuitabilityPrompt(input);
    return output!;
  }
);
`,
  },
  {
    path: 'src/ai/flows/weather-flow.ts',
    content: `'use server';

/**
 * @fileOverview A flow to get weather forecast for a location.
 *
 * - getWeatherForecast - A function that returns a 3-day weather forecast.
 * - WeatherInput - The input type for the getWeatherForecast function.
 * - WeatherOutput - The return type for the getWeatherForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherInputSchema = z.object({
  location: z.string().describe('The location to get the weather forecast for.'),
});
export type WeatherInput = z.infer<typeof WeatherInputSchema>;

const WeatherDataSchema = z.object({
    day: z.string(),
    icon: z.enum(["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Heavy Rain", "Thunderstorm", "Snow", "Fog"]),
    temp: z.string().describe("Temperature in Celsius, e.g., 25°C"),
    condition: z.string(),
    wind: z.string().describe("Wind speed, e.g., 10 km/h"),
});

const WeatherOutputSchema = z.object({
  forecast: z.array(WeatherDataSchema).length(3).describe('A 3-day weather forecast.'),
});
export type WeatherOutput = z.infer<typeof WeatherOutputSchema>;

export async function getWeatherForecast(input: WeatherInput): Promise<WeatherOutput> {
  return weatherFlow(input);
}

const weatherPrompt = ai.definePrompt({
  name: 'weatherPrompt',
  input: {schema: WeatherInputSchema},
  output: {schema: WeatherOutputSchema},
  prompt: \`You are a weather forecasting service.
  Your primary goal is to provide a real-time, accurate 3-day weather forecast for the following location: {{{location}}}.
  The forecast must include today, tomorrow, and the day after.
  You MUST retrieve and use real, current meteorological data for the specified location.
  Do NOT invent a forecast. If, and only if, you absolutely cannot retrieve real data for the location, you may provide a realistic estimate, but you must explicitly state that it is an estimate in the condition field.
  \`,
});

const weatherFlow = ai.defineFlow(
  {
    name: 'weatherFlow',
    inputSchema: WeatherInputSchema,
    outputSchema: WeatherOutputSchema,
  },
  async input => {
    const {output} = await weatherPrompt(input);
    return output!;
  }
);
`,
  },
  {
    path: 'src/ai/genkit.ts',
    content: `import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
`,
  },
  {
    path: 'src/ai/tools/agronomic-tools.ts',
    content: `'use server';

import {ai} from '@/ai/genkit';
import {
  diagnoseCrop,
  type CropDoctorInput,
} from '@/ai/flows/crop-doctor-flow';
import {
  getFertilizerRecommendation,
  type FertilizerInput,
} from '@/ai/flows/fertilizer-calculator-flow';
import {
  getSoilSuitability,
  type SoilSuitabilityInput,
} from '@/ai/flows/soil-suitability-flow';
import {getWeatherForecast} from '@/ai/flows/weather-flow';
import {z} from 'zod';

export const weatherTool = ai.defineTool(
  {
    name: 'getWeather',
    description:
      'Get the 3-day weather forecast for a specified location in India.',
    input: {
      schema: z.object({
        location: z.string().describe('The city or area to get the weather for.'),
      }),
    },
    output: {
      schema: z.any(),
    },
  },
  async input => {
    try {
      const forecast = await getWeatherForecast({location: input.location});
      return JSON.stringify(forecast);
    } catch (e) {
      return \`Error fetching weather: \${e}\`;
    }
  }
);

export const soilSuitabilityTool = ai.defineTool(
  {
    name: 'getSoilSuitability',
    description: 'Check if a specific crop is suitable for a given soil type.',
    input: {
      schema: z.object({
        crop: z.string().describe('The name of the crop.'),
        soil_type: z
          .string()
          .describe('The type of soil (e.g., "Clay", "Sandy Loam").'),
      }),
    },
    output: {
      schema: z.any(),
    },
  },
  async (input: SoilSuitabilityInput) => {
    try {
      const result = await getSoilSuitability(input);
      return JSON.stringify(result);
    } catch (e) {
      return \`Error checking soil suitability: \${e}\`;
    }
  }
);

export const fertilizerCalculatorTool = ai.defineTool(
  {
    name: 'getFertilizerRecommendation',
    description:
      'Generate a multi-stage fertilizer plan for a crop and land area.',
    input: {
      schema: z.object({
        cropName: z.string().describe('The name of the crop.'),
        area: z.number().describe('The area of land in acres.'),
      }),
    },
    output: {
      schema: z.any(),
    },
  },
  async (input: FertilizerInput) => {
    try {
      const result = await getFertilizerRecommendation(input);
      return JSON.stringify(result);
    } catch (e) {
      return \`Error getting fertilizer plan: \${e}\`;
    }
  }
);

export const cropDoctorTool = ai.defineTool(
  {
    name: 'diagnoseCrop',
    description:
      'Diagnose a plant disease from a user-provided image data URI.',
    input: {
      schema: z.object({
        photoDataUri: z
          .string()
          .describe('The image data URI of the plant photo.'),
      }),
    },
    output: {
      schema: z.any(),
    },
  },
  async (input: CropDoctorInput) => {
    try {
      const result = await diagnoseCrop(input);
      return JSON.stringify(result);
    } catch (e) {
      return \`Error diagnosing crop: \${e}\`;
    }
  }
);
`,
  },
];

export default function CodesPage() {
  const t = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.sidebar.codes}</h1>
        <p className="text-muted-foreground">{t.codes.description}</p>
      </div>
      <Card>
        <CardContent className="p-4">
          <Accordion type="single" collapsible className="w-full">
            {files.map(file => (
              <AccordionItem value={file.path} key={file.path}>
                <AccordionTrigger>{file.path}</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className="h-96 w-full rounded-md border bg-secondary/20">
                    <pre className="p-4 text-sm font-mono">{file.content}</pre>
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
