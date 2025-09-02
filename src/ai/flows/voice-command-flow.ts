// @ts-nocheck
'use server';
/**
 * @fileOverview A flow to handle voice commands and respond with synthesized speech.
 *
 * - handleVoiceCommand - A function that processes a text query and returns spoken audio.
 * - VoiceCommandInput - The input type for the handleVoiceCommand function.
 * - VoiceCommandOutput - The return type for the handleVoiceCommand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getMarketPriceTool } from '../tools/agronomic-tools';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';
import { navigationTool } from '../tools/navigation-tool';

const VoiceCommandInputSchema = z.object({
  query: z.string().describe('The user\'s spoken query.'),
});
export type VoiceCommandInput = z.infer<typeof VoiceCommandInputSchema>;

const VoiceCommandOutputSchema = z.object({
  text_response: z.string().describe('The text version of the answer.'),
  audio_response_data_uri: z.string().describe('A data URI of the spoken response in WAV format.'),
  navigation_target: z.string().optional().describe("If the user wants to navigate, this is the target URL path (e.g., '/dashboard', '/crop-doctor')."),
});
export type VoiceCommandOutput = z.infer<typeof VoiceCommandOutputSchema>;

export async function handleVoiceCommand(input: VoiceCommandInput): Promise<VoiceCommandOutput> {
  return voiceCommandFlow(input);
}

const voiceCommandPrompt = ai.definePrompt({
    name: 'voiceCommandPrompt',
    input: { schema: z.object({ query: z.string() }) },
    output: { schema: VoiceCommandOutputSchema },
    tools: [getMarketPriceTool, navigationTool],
    prompt: `You are a helpful agricultural assistant. The user has given you a voice command.
    - If the user wants to navigate to a different page, use the navigationTool.
    - If the user asks for a price, use the getMarketPriceTool.
    - For general questions, provide a concise and helpful answer.
    - Your text_response should be what you want to say to the user.
    - Only set navigation_target when you use the navigationTool.
    
    User query: {{{query}}}
    `,
});

async function textToSpeech(text: string): Promise<string> {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      throw new Error('No audio media returned from TTS model.');
    }
    
    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    
    return new Promise((resolve, reject) => {
        const writer = new wav.Writer({
            channels: 1,
            sampleRate: 24000,
            bitDepth: 16,
        });

        const bufs: Buffer[] = [];
        writer.on('data', (chunk) => bufs.push(chunk));
        writer.on('end', () => {
            const wavBuffer = Buffer.concat(bufs);
            resolve('data:audio/wav;base64,' + wavBuffer.toString('base64'));
        });
        writer.on('error', reject);

        writer.write(audioBuffer);
        writer.end();
    });
}


const voiceCommandFlow = ai.defineFlow(
  {
    name: 'voiceCommandFlow',
    inputSchema: VoiceCommandInputSchema,
    outputSchema: VoiceCommandOutputSchema,
  },
  async (input) => {
    const { output } = await voiceCommandPrompt(input);

    if (!output?.text_response) {
        throw new Error("Could not get a text response from the model.");
    }
    
    const audioUri = await textToSpeech(output.text_response);

    return {
      text_response: output.text_response,
      audio_response_data_uri: audioUri,
      navigation_target: output.navigation_target,
    };
  }
);
