export interface PageFrontMatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  lastmod: string;
  links: string[];
  fileName: string;
  weight?: number;
  content?: string;
}
