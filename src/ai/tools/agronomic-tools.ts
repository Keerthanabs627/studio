
'use server';

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
import { marketData } from '@/app/(app)/market-prices/data';
import {z} from 'zod';

export const weatherTool = ai.defineTool(
  {
    name: 'getWeather',
    description:
      'Get the 3-day weather forecast for a specified location in India.',
    input: {
      schema: z.object({
        location: z
          .string()
          .describe('The city or area to get the weather for.'),
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
      return `Error fetching weather: ${e}`;
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
      return `Error checking soil suitability: ${e}`;
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
      return `Error getting fertilizer plan: ${e}`;
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
      return `Error diagnosing crop: ${e}`;
    }
  }
);

export const getMarketPriceTool = ai.defineTool(
  {
    name: 'getMarketPrice',
    description: 'Get the current market price for a specific commodity.',
    input: {
      schema: z.object({
        commodity: z
          .string()
          .describe(
            'The commodity to get the price for, e.g., "tomato", "wheat".'
          ),
      }),
    },
    output: {
      schema: z.any(),
    },
  },
  async input => {
    try {
      const commodityLower = input.commodity.toLowerCase();
      const foundPrice = marketData.find(p =>
        p.name.toLowerCase().includes(commodityLower)
      );

      if (foundPrice) {
        return `The price of ${foundPrice.name} is ${foundPrice.price}.`;
      }
      return `Sorry, I could not find the price for ${input.commodity}.`;
    } catch (e) {
      return `Error fetching market prices: ${e}`;
    }
  }
);
