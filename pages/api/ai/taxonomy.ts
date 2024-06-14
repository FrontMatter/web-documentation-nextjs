import { OpenAiService } from "./../../../services/OpenAiService";
import type { NextApiRequest, NextApiResponse } from "next";
import { GitHubService } from "../../../services/GithubService";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.token || !req.body.title) {
    return res.status(403).send({});
  }

  const { token, title, description, taxonomy, type } = req.body;

  if ((!title && !description) || !taxonomy) {
    return res.status(403).send({});
  }

  const username = await GitHubService.verifyUser(token);
  if (!username) {
    return res.status(403).send({});
  }

  const instruction = `Pick the best matching ${type} from the comma separated list of ${type} for the provided content.
  
${title ? `The title of the blog post is: ${title}.` : ""}

${description ? `The description of the blog post is: ${description}.` : ""}

The list of ${type}: ${
    typeof taxonomy === "string" ? taxonomy : taxonomy.join(", ")
  }

You are allowed to suggest new ${type} if you think they are relevant. 

The result should be a comma separated list of ${type}.`;

  const choices = await OpenAiService.getCompletion(instruction, 1, 0.5, 500);

  const result: string = choices
    .map((choice: any) => {
      let title = choice.text.trim();
      if (title.startsWith("1. ")) {
        title = title.substring(2, title.length);
      }
      return title.replace(/^"(.*)"$/, "$1").trim() || "";
    })
    .pop();

  const values = result.split(",").map((t) => t.trim());
  // Return the first 5 values
  return res.status(200).send(values.slice(0, 5));
};

export default api;
