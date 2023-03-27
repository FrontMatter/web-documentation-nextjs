import { Configuration, OpenAIApi } from "openai";

export class OpenAiService {
  public static async getCompletion(instruction: string) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_TOKEN,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${instruction}`,
      temperature: 0.8,
      max_tokens: 30,
      n: 5,
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
