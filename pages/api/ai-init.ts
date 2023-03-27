import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { InitResponse, NewConversationResponse } from "../../models";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const aiKey = process.env.MENDABLE_ANON_KEY;
  const aiUrl = process.env.MENDABLE_ANON_URL;

  if (!aiKey || !aiUrl) {
    return res.status(500).json({
      error: "No AI configured",
    });
  }

  const newChatResponse = await fetch(`${aiUrl}/newConversation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: aiKey,
    }),
  });

  if (!newChatResponse.ok) {
    return res.status(500).json({
      error: "AI failed to initialize chat",
    });
  }

  const newChat: NewConversationResponse = await newChatResponse.json();

  res.status(200).send({
    company: "frontmatter",
    chatId: newChat.conversation_id,
  });
};

export default api;
