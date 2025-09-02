'use server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const navigationPages = {
    'dashboard': '/dashboard',
    'guide': '/guide',
    'crop doctor': '/crop-doctor',
    'fertilizer calculator': '/fertilizer-calculator',
    'market prices': '/market-prices',
    'soil suitability': '/soil-suitability',
    'schemes': '/schemes',
    'labor marketplace': '/labor-marketplace',
    'my fields': '/my-fields',
    'weather': '/weather',
    'reminders': '/reminders',
    'notifications': '/notifications',
    'community': '/community',
    'chatbot': '/chatbot',
    'profile': '/profile',
    'codes': '/codes',
};

type PageName = keyof typeof navigationPages;

export const navigationTool = ai.defineTool(
  {
    name: 'navigationTool',
    description: 'Navigate to a specific page in the application. Use this if the user asks to "go to", "open", "show me", or "navigate to" a specific section.',
    input: {
      schema: z.object({
        page: z.string().describe(`The destination page. Must be one of: ${Object.keys(navigationPages).join(', ')}`),
      }),
    },
    output: {
      schema: z.object({
        url: z.string(),
      }),
    },
  },
  async (input) => {
    const pageName = input.page.toLowerCase() as PageName;
    const url = navigationPages[pageName];
    if (url) {
      return { url };
    }
    throw new Error(`Unknown page: ${input.page}`);
  }
);
