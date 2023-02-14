import React from 'react';
import { getAllPosts, getPostByFilename } from '../../lib/api';
import { useRouter } from 'next/router';
import { Description, OtherMeta, Title } from '../../components/Meta';
import { useTranslation } from 'react-i18next';
import { Page } from '../../components/Docs/Page';
import { Markdown } from '../../components/Docs/Markdown';
import { DocsLayout } from '../../components/Page/DocsLayout';

export default function Documentation({ page, pages, title }: any) {
  const { t: strings } = useTranslation();
  const router = useRouter();

  if (!router.isFallback && !page?.slug) {
    return <p>Error</p>
  }

  return (
    <>
      <Title value={page.title} />
      <Description value={page.description || strings(`documentation_description`)} />
      <OtherMeta image={`/assets/frontmatter-social.png`} />
      
      <DocsLayout navItems={pages} >
        <Page items={pages} page={page}>
          <Markdown content={page?.content} slug={page.slug.replace(/\//g, '-')} />
        </Page>
      </DocsLayout>
    </>
  )
}

export async function getStaticProps({ params }: any) {
  const pages = getAllPosts('docs', [
    'title',
    'slug',
    'description',
    'date',
    'lastmod',
    'weight',
    'content',
    'fileName'
  ]);

  const article: any = pages.find((b: any) => b.slug === params.slug.join('/'));

  const doc: any = getPostByFilename('docs', article.fileName, [
    'title',
    'slug',
    'description',
    'date',
    'lastmod',
    'weight',
    'content',
    'fileName'
  ]);

  return {
    props: {
      page: {
        ...doc
      },
      pages
    }
  }
}

export async function getStaticPaths() {
  const pages = getAllPosts('docs', ['slug', 'fileName']);

  const paths = pages.map((page: any) => ({
    params: {
      slug: page.slug.split('/'),
      fileName: page.fileName
    }
  }));

  return {
    paths,
    fallback: false
  }
}