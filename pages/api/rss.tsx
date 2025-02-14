import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import RSS from 'rss';
import { publicUrl } from '../../lib/publicUrl';
import matter from 'gray-matter';


const rssFeed = async function (_: NextApiRequest, res: NextApiResponse) {
  const feed = new RSS({
    title: 'Changelog RSS Feed',
    description: 'RSS feed for the changelog pages',
    feed_url: `${publicUrl()}/api/rss`,
    site_url: publicUrl(),
    language: 'en',
  });

  const changelogDir = path.join(process.cwd(), 'content/changelog');
  const files = await fs.readdir(changelogDir);

  const items: RSS.ItemOptions[] = [];
  for (const file of files) {
    const filePath = path.join(changelogDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    const { data, content: markdownContent } = matter(content);

    if (!data.title) {
      continue;
    }

    items.push({
      title: data.title,
      description: data.description,
      url: `${publicUrl()}/updates/${data.slug}`,
      date: data.date,
    });
  }

  // Sort items by date
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  items.forEach((item) => {
    feed.item(item);
  });

  res.setHeader('Content-Type', 'application/rss+xml');
  res.status(200).send(feed.xml({ indent: true }));
};

export default rssFeed;