import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { GitHubService } from "../../../services/GithubService";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).send({});
  }

  const username = await GitHubService.getUser(token);
  if (!username) {
    return res.status(403).send({});
  }

  const backers = process.env.BACKERS || "";
  const allBackers = backers.split(",");
  if (allBackers.includes(username)) {
    return res.status(200).send(`Thanks for your support ${username}!`);
  }

  const sponsors = await GitHubService.getSponsors();
  const sponsor = sponsors.find((s: any) => s.login === username);
  if (sponsor) {
    return res.status(200).send(`Thanks for your support ${username}!`);
  }

  return res.status(403).send({});
};

export default api;
