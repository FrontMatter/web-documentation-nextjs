import type { NextApiRequest, NextApiResponse } from "next";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const backers = process.env.BACKERS;
  const { query } = req;

  if (!query.backer) {
    return res.status(400).send({
      error: "Missing backer parameter",
    });
  }

  if (!backers) {
    return res.status(500).json({
      error: "No backers configured",
    });
  }

  const allBackers = backers.split(",");
  const backer = query.backer as string;
  if (!allBackers.includes(backer)) {
    return res.status(400).json({
      error: `Sorry, it seems you haven't supported the project yet.`,
    });
  }

  res.status(200).send(`Thanks for your support ${backer}!`);
};

export default api;
