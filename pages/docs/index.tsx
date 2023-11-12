import React from 'react';
import { useTranslation } from 'react-i18next';
import { Markdown } from '../../components/Docs/Markdown';
import { Page } from '../../components/Docs/Page';
import { Description, OtherMeta, Title } from '../../components/Meta';
import { DocsLayout } from '../../components/Page/DocsLayout';
import { getAllPosts } from '../../lib/api';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { pageProcessing } from '../../utils/pageProcessing';

export default function Home({ pages, page }: { pages: PageFrontMatter[]; page: PageFrontMatter; }) {
  const { t: strings } = useTranslation();

  return (
    <>
      <Title value={strings(`documentation_title`)} />
      <Description value={strings(`documentation_description`)} />
      <OtherMeta image={`/assets/frontmatter-social.png`} />

      <DocsLayout navItems={pages} >
        <Page items={pages} page={page}>
          <Markdown content={page?.content} slug={page?.slug} />
        </Page>
      </DocsLayout>
    </>
  )
}

export const getStaticProps = async () => {
  let pages = getAllPosts('docs', [
    'title',
    'slug',
    'description',
    'date',
    'lastmod',
    'weight',
    'content',
    'fileName'
  ]);

  const welcome = Object.assign({}, pages?.find(p => p.slug === "index"));

  pages = pages.map(pageProcessing);

  return {
    props: { pages, page: welcome },
  }
}