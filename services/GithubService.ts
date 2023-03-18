import fetch from "node-fetch";

export class GitHubService {
  public static async getSponsors() {
    const response = await fetch(`https://api.github.com/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `token ${process.env.GITHUB_AUTH}`,
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
