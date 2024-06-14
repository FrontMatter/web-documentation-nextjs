import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export const config = {
  runtime: "edge",
};

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  let headers = {};

  if (process.env.GITHUB_AUTH) {
    headers = {
      Authorization: `token ${process.env.GITHUB_AUTH}`,
      "user-agent": "frontmatter",
    };
  }

  const response = await fetch(
    `https://api.github.com/repos/estruyf/vscode-front-matter`,
    {
      headers,
    }
  );

  if (response && response.ok) {
    const data = await response.json();
    return res.status(200).json({ stars: data?.stargazers_count });
  }

  res.status(200).json({ stars: null });
};

export default api;
