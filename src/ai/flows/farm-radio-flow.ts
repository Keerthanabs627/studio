
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

const FarmRadioInputSchema = z.object({
  location: z.string().describe("The user's location for the weather forecast."),
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
    // Get weather data
    const weather = await getWeather({location: input.location});
    const weatherString = weather.data
      ? weather.data
          .map(f => `${f.day}: ${f.condition}, ${f.temp}`)
          .join('; ')
      : 'not available';

    const languageMap: {[key: string]: string} = {
      en: 'English',
      hi: 'Hindi',
      kn: 'Kannada',
      ta: 'Tamil',
      te: 'Telugu',
    };
    
    const language = languageMap[input.locale] || 'English';

    // 1. Generate the script using a more capable model
    const {output: scriptOutput} = await ai.generate({
      prompt: `You are a friendly radio host for a farm news program in India. Generate a short, engaging radio script (about 100-120 words) for a farmer. The script must be in ${language}.

      Here is the information to include:
      - Location: ${input.location}
      - Weather Forecast: ${weatherString}
      
      You also need to generate the following information yourself, making it realistic for the location:
      - Top 3 Market Prices: Generate realistic market prices for 3 major crops relevant to the location.
      - Upcoming Reminders: Generate 2 brief, relevant farming reminders (e.g., "Time to start scouting for pests in your cotton crop.").
      
      Start with a warm greeting. Keep the tone positive and informative. End with a friendly sign-off.
      Do not use markdown or any special formatting. Just plain text for the script.
      `,
      model: ai.model('gemini-1.5-flash'), // Using a more capable model
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
