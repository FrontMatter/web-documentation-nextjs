export interface SponsorData {
  data: Data;
}

export interface Data {
  viewer: Viewer;
}

export interface Viewer {
  login: string;
  sponsors: Sponsors;
}

export interface Sponsors {
  edges: Edge[];
}

export interface Edge {
  node: Sponsor;
}

export interface Sponsor {
  id: string;
  name: string;
  url: string;
  avatarUrl: string;
}