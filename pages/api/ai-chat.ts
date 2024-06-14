import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const aiKey = process.env.MENDABLE_ANON_KEY;
  const aiUrl = process.env.MENDABLE_ANON_URL;

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (!aiKey || !aiUrl) {
    return res.status(500).json({ error: "Missing API data" });
  }

  const chatData: { chatId: string; question: string } = req.body;

  if (!chatData.chatId || !chatData.question) {
    return res.status(400).json({ error: "Missing chat data" });
  }

  if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    await supabase.from("frontmatter_ai_qa").insert([
      {
        question: chatData.question,
      },
    ]);
  }

  const response = await fetch(`${aiUrl}/mendableChat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*",
    },
    body: JSON.stringify({
      api_key: aiKey,
      question: chatData.question,
      history: [{ prompt: "", response: "", sources: [] }],
      conversation_id: chatData.chatId,
    }),
  });

  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  const data = {
    sources: [],
    answer: "",
    answerId: undefined,
  };

  try {
    for await (const chunk of response.body) {
      try {
        let chunkString = chunk.toString();
        if (chunkString.startsWith("data: ")) {
          chunkString = chunkString.substring(6);
        }
        const chunkData = JSON.parse(chunkString);

        if (chunkData.chunk === "<|source|>" && chunkData.metadata) {
          const metadata =
            chunkData.metadata.map((m: any) => m.link) || ([] as string[]);
          data.sources = metadata;
        } else if (chunkData.chunk === "<|message_id|>" && chunkData.metadata) {
          data.answerId = chunkData.metadata;
        } else {
          data.answer += chunkData.chunk;
        }
      } catch (e) {
        // noop
      }
    }
  } catch (err) {}

  res.status(200).send(data);
};

export default api;
