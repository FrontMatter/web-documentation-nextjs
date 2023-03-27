export interface Analytics {
  fromDate: string;
  activate: Activate;
  webviews: Events;
  events: Events;
  versions: { [version: string]: number };
}

export interface Events {
  [date: string]: {
    [event: string]: number;
  };
}

export interface Activate {
  beta: VersionCount;
  stable: VersionCount;
}

export interface VersionCount {
  [date: string]: number;
}
