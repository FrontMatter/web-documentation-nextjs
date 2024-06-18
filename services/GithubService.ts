import fetch from "node-fetch";
import { CONFIG } from "../constants";

export class GitHubService {
  public static async verifyUser(token: string) {
    if (!token) {
      return;
    }

    const username = await GitHubService.getUser(token);
    if (!username) {
      return;
    }

    const sponsors = await GitHubService.getSponsors();
    const backers = (CONFIG.sponsors || "").split(",");

    const sponsor = sponsors.find((s: any) => s.login === username);

    if (!backers?.includes(username) && !sponsor) {
      return;
    }

    return username;
  }

  public static async getUser(token: string) {
    const response = await fetch(`https://api.github.com/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    return data.login;
  }

  public static async getSponsors() {
    const response = await fetch(`https://api.github.com/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `token ${CONFIG.github.token}`,
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
                    login
                    url
                    avatarUrl
                  }
                  ... on Organization {
                    id
                    name
                    url
                    avatarUrl
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    let sponsors = [];

    if (response && response.ok) {
      const data = await response.json();
      sponsors = data.data.viewer.sponsors.edges.map((edge: any) => edge.node);
    }

    if (sponsors && sponsors.length > 0) {
      return sponsors;
    }

    return [];
  }
}
