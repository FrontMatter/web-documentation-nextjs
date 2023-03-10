import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const aiUrl = process.env.MENDABLE_ANON_URL;

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const chatData: { company: string; chatId: string; question: string } =
    req.body;

  if (!chatData.chatId || !chatData.company || !chatData.question) {
    return res.status(400).json({ error: "Missing chat data" });
  }

  const response = await fetch(`${aiUrl}/qaChat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*",
    },
    body: JSON.stringify({
      company: chatData.company,
      conversation_id: chatData.chatId,
      history: [{ prompt: "", response: "", sources: [] }],
      question: chatData.question,
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
