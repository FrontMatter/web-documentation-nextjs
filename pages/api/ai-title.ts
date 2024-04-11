import { OpenAiService } from "./../../services/OpenAiService";
import type { NextApiRequest, NextApiResponse } from "next";
import { GitHubService } from "../../services/GithubService";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.token || !req.body.title) {
    return res.status(403).send({});
  }

  const { token, title, nrOfCharacters } = req.body;

  const username = await GitHubService.getUser(token);
  if (!username) {
    return res.status(403).send({});
  }

  const sponsors = await GitHubService.getSponsors();
  const backers = (process.env.BACKERS || "").split(",");

  const sponsor = sponsors.find((s: any) => s.login === username);

  if (!backers?.includes(username) && !sponsor) {
    return res.status(403).send({});
  }

  const instruction = `Come up with a better title for my blog post that has the working title "${title}". It should not be more than ${
    nrOfCharacters || 60
  } characters in total. The desired format should be just a string, e.g. "My first blog post"`;

  const choices = await OpenAiService.getCompletion(instruction);

  const results: string[] = choices.map((choice: any) => {
    let title = choice.text.trim();
    if (title.startsWith("1. ")) {
      title = title.substring(2, title.length);
    }
    return title.replace(/^"(.*)"$/, "$1").trim() || "";
  });

  return res.status(200).send(results);
};

export default api;
