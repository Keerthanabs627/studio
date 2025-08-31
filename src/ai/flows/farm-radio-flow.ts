'use server';
/**
 * @fileOverview A flow to generate a personalized farm radio broadcast.
 *
 * - generateFarmRadio - A function that generates an audio broadcast.
 * - FarmRadioInput - The input type for the generateFarmRadio function.
 * - FarmRadioOutput - The return type for the generateFarmRadio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {getWeather} from '@/app/(app)/dashboard/actions';
import {getMarketPrices} from '@/app/(app)/market-prices/actions';
import {getReminders} from '@/app/(app)/reminders/actions';

const FarmRadioInputSchema = z.object({
  location: z.string().describe('The user\'s location for the weather forecast.'),
  locale: z.string().describe('The language locale for the broadcast (e.g., "en", "hi").'),
});

export type FarmRadioInput = z.infer<typeof FarmRadioInputSchema>;

export type FarmRadioOutput = {
  audioDataUri: string;
};

export async function generateFarmRadio(input: FarmRadioInput): Promise<FarmRadioOutput> {
  return farmRadioFlow(input);
}

const farmRadioFlow = ai.defineFlow(
  {
    name: 'farmRadioFlow',
    inputSchema: FarmRadioInputSchema,
    outputSchema: z.object({audioDataUri: z.string()}),
  },
  async input => {
    const [weather, prices, reminders] = await Promise.all([
      getWeather({location: input.location}),
      getMarketPrices(),
      getReminders(),
    ]);

    const weatherString = weather.data
      ? weather.data
          .map(f => `${f.day}: ${f.condition}, ${f.temp}`)
          .join('; ')
      : 'not available';
    const pricesString = prices.data
      ? prices.data
          .slice(0, 3)
          .map(p => `${p.name}: ${p.price}`)
          .join('; ')
      : 'not available';
    const remindersString = reminders.data
      ? reminders.data
          .slice(0, 2)
          .map(r => r.task)
          .join('; ')
      : 'none';
      
    const languageMap: {[key: string]: string} = {
      en: 'English',
      hi: 'Hindi',
      kn: 'Kannada',
      ta: 'Tamil',
      te: 'Telugu',
    };
    
    const language = languageMap[input.locale] || 'English';

    // 1. Generate the script
    const {output: scriptOutput} = await ai.generate({
      prompt: `You are a friendly radio host for a farm news program. Generate a short, engaging radio script (about 100-120 words) for a farmer. The script must be in ${language}.

      Here is the information to include:
      - Weather Forecast: ${weatherString}
      - Top 3 Market Prices: ${pricesString}
      - Upcoming Reminders: ${remindersString}
      
      Start with a warm greeting. Keep the tone positive and informative. End with a friendly sign-off.
      Do not use markdown or any special formatting. Just plain text for the script.
      `,
      model: ai.model('gemini-2.5-flash'),
      output: {
        schema: z.string(),
      },
    });
    
    if (!scriptOutput) {
        throw new Error("Could not generate radio script.");
    }

    // 2. Convert script to speech
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      prompt: scriptOutput,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
    });

    if (!media) {
      throw new Error('No audio media returned from TTS model.');
    }

    // 3. Convert PCM to WAV
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    return {
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
