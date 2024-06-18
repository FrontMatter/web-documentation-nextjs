import { OpenAI } from "openai";
import { CONFIG } from "../constants";

export class OpenAiService {
  public static async getCompletion(
    instruction: string,
    nr: number = 5,
    temperature: number = 0.8,
    max_tokens: number = 30
  ) {
    const openai = new OpenAI({
      apiKey: CONFIG.openAi.token,
    });

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `${instruction}`,
      temperature,
      max_tokens,
      n: nr,
      stop: null,
    });

    if (!response || !response.choices || !response.choices[0]) {
      throw new Error("No response from OpenAI");
    }

    return response.choices;
  }
}
