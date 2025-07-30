import { createDeepSeek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

//ds实例
const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL:process.env.BASE_URL,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();//aisdk hadleSubmit shi huode

  const result = streamText({
    model: deepseek('deepseek-v3'),
    system:process.env.SYSTEM_PROMPT,
    messages,
  });

  return result.toDataStreamResponse();
}