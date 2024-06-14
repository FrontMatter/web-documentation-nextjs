import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export const config = {
  runtime: "edge",
};

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const aiUrl = process.env.MENDABLE_ANON_URL;

  if (!aiUrl) {
    return res.status(500).json({
      error: "No AI configured",
    });
  }

  const chatData: { vote: number; answerId: string } = req.body;

  await fetch(`${aiUrl}/updateMessageRating/${chatData.answerId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ratingValue: chatData.vote,
    }),
  });

  res.status(201).send({});
};

export default api;
