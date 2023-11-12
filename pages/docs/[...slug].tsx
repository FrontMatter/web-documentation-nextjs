import React from 'react';
import { getAllPosts, getPostByFilename } from '../../lib/api';
import { useRouter } from 'next/router';
import { Description, OtherMeta, Title } from '../../components/Meta';
import { useTranslation } from 'react-i18next';
import { Page } from '../../components/Docs/Page';
import { DocsLayout } from '../../components/Page/DocsLayout';
import { pageProcessing } from '../../utils/pageProcessing';
import markdownToHtml from '../../utils/markdownToHtml';

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
          <div
            className={`markdown ${page.slug.replace(/\//g, '-')}`}
            dangerouslySetInnerHTML={{ __html: page.content }}>
          </div>
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
  ]).map(pageProcessing);

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

  const content = await markdownToHtml(doc.content || '');

  return {
    props: {
      page: {
        ...doc,
        content
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