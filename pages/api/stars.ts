import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const api = async (req: NextApiRequest, res: NextApiResponse) => {

  const response = await fetch(`https://api.github.com/repos/estruyf/vscode-front-matter`, {
    headers: {
      "Authorization": `token ${process.env.GITHUB_AUTH}`,
      "user-agent": "frontmatter"
    }
  });

  if (response && response.ok) {
    const data = await response.json();
    return res.status(200).json({ stars: data?.stargazers_count })
  }

  res.status(200).json({ stars: null });
}

export default api;