import { OpenAiService } from "./../../../services/OpenAiService";
import type { NextApiRequest, NextApiResponse } from "next";
import { GitHubService } from "../../../services/GithubService";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.token || !req.body.title) {
    return res.status(403).send({});
  }

  const { token, title, content, nrOfCharacters } = req.body;

  const username = await GitHubService.verifyUser(token);
  if (!username) {
    return res.status(403).send({});
  }

  // Use a maximum of 2000 characters for the content
  let articleContent = content;
  if (articleContent.length > 2000) {
    articleContent = articleContent.substring(0, 2000);
  }

  const instruction = `Generate an abstract for the following content which will be included in the webpage its meta description. The length of the text should not exceed ${
    nrOfCharacters || 160
  } characters.
  
  The topic of the blog post is: ${title}.

  The contents of the blog post are: ${articleContent}.
  
  Desired format: just a string without any line breaks or other formatting.`;

  const response = await OpenAiService.getCompletion(instruction, 1);

  const results: string[] = response.choices.map((choice: any) => {
    let title = choice.text.trim();
    if (title.startsWith("1. ")) {
      title = title.substring(2, title.length);
    }
    return title.replace(/^"(.*)"$/, "$1").trim() || "";
  });

  if (results.length === 0) {
    return res.status(200).send("");
  }

  return res.status(200).send(results[0]);
};

export default api;
