import { OpenAiService } from "./../../../services/OpenAiService";
import type { NextApiRequest, NextApiResponse } from "next";
import { GitHubService } from "../../../services/GithubService";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.token || !req.body.title) {
    return res.status(403).send({});
  }

  const { token, title, nrOfCharacters } = req.body;

  const username = await GitHubService.verifyUser(token);
  if (!username) {
    return res.status(403).send({});
  }

  const instruction = `Generate enganging blog post title, with a maximum of ${
    nrOfCharacters || 60
  } characters.
  
  The topic of the blog post is: ${title}.
  
  Desired format: just a string, e.g. "My first blog post"`;

  const response = await OpenAiService.getCompletion(instruction);

  const results: string[] = response.choices.map((choice: any) => {
    let title = choice.text.trim();
    if (title.startsWith("1. ")) {
      title = title.substring(2, title.length);
    }
    return title.replace(/^"(.*)"$/, "$1").trim() || "";
  });

  return res.status(200).send(results);
};

export default api;
