import { Configuration, OpenAIApi } from "openai";

export class OpenAiService {
  public static async getCompletion(
    instruction: string,
    nr: number = 5,
    temperature: number = 0.8,
    max_tokens: number = 30
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_TOKEN,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${instruction}`,
      temperature,
      max_tokens,
      n: nr,
      stop: null,
    });

    if (
      !response ||
      !response.data ||
      !response.data.choices ||
      !response.data.choices[0]
    ) {
      throw new Error("No response from OpenAI");
    }

    return response.data;
  }
}
