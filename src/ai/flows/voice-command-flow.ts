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

const VoiceCommandInputSchema = z.object({
  query: z.string().describe('The user\'s spoken query.'),
});
export type VoiceCommandInput = z.infer<typeof VoiceCommandInputSchema>;

const VoiceCommandOutputSchema = z.object({
  text_response: z.string().describe('The text version of the answer.'),
  audio_response_data_uri: z.string().describe('A data URI of the spoken response in WAV format.'),
});
export type VoiceCommandOutput = z.infer<typeof VoiceCommandOutputSchema>;

export async function handleVoiceCommand(input: VoiceCommandInput): Promise<VoiceCommandOutput> {
  return voiceCommandFlow(input);
}

const voiceCommandPrompt = ai.definePrompt({
    name: 'voiceCommandPrompt',
    input: { schema: z.object({ query: z.string() }) },
    tools: [getMarketPriceTool],
    prompt: `You are a helpful agricultural assistant. The user has asked a question. Use the available tools to answer it.
    If the user asks for a price, use the getMarketPriceTool.
    Keep your answer concise and to the point.
    
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
    const llmResponse = await voiceCommandPrompt(input);
    const textResponse = llmResponse.text;

    if (!textResponse) {
        throw new Error("Could not get a text response from the model.");
    }
    
    const audioUri = await textToSpeech(textResponse);

    return {
      text_response: textResponse,
      audio_response_data_uri: audioUri,
    };
  }
);
