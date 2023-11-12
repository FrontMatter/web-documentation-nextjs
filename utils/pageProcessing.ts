import { PageFrontMatter } from "../models";

export const pageProcessing = (p: PageFrontMatter) => {
  let links = Array.from(p.content!.matchAll(/^## (.*$)/gim));
  links = links.map((value: any, _: number, __: any[]) => {
    if (value && value.length >= 2) {
      return value[1];
    }
    return null;
  });

  delete p.content;
  return {
    ...p,
    links,
  };
};
