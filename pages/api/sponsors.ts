import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const mockData = {
  "data": {
    "viewer": {
      "login": "estruyf",
      "sponsors": {
        "edges": [
          {
            "node": {
              "name": "Elio Struyf",
              "url": "https://github.com/estruyf",
              "avatarUrl": "https://avatars.githubusercontent.com/u/2900833?v=4"
            }
          },
          {
            "node": {
              "name": "Elio Struyf",
              "url": "https://github.com/estruyf",
              "avatarUrl": "https://avatars.githubusercontent.com/u/2900833?v=4"
            }
          }
        ]
      }
    }
  }
}

const api = async (req: NextApiRequest, res: NextApiResponse) => {

  if (process.env.GITHUB_AUTH) {
    return res.status(200).json(mockData);
  }

  const response = await fetch(`https://api.github.com/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `token ${process.env.GITHUB_AUTH}`
    },
    body: JSON.stringify({
      query: `query SponsorQuery {
        viewer {
          login
          sponsors(first: 100) {
            edges {
              node {
                ... on User {
                  id
                  name
                  url
                  avatarUrl
                }
              }
            }
          }
        }
      }`
    })
  });

  if (response && response.ok) {
    const data = await response.json();
    return res.status(200).json(data);
  }

  res.status(200).json(null);
}

export default api;