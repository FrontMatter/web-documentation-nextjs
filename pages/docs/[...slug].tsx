import React from 'react';
import { getAllPosts, getPostByFilename } from '../../lib/api';
import { useRouter } from 'next/router';
import { Description, OtherMeta, Title } from '../../components/Meta';
import { useTranslation } from 'react-i18next';
import { Page } from '../../components/Docs/Page';
import { DocsLayout } from '../../components/Page/DocsLayout';
import { pageProcessing } from '../../utils/pageProcessing';
import markdownToHtml from '../../utils/markdownToHtml';
import generateOgImage from '../../utils/generateOgImage';

type Params = {
  params: {
    slug: string[];
    fileName: string;
  }
}


export default function Documentation({ page, pages, ogImage }: any) {
  const { t: strings } = useTranslation();
  const router = useRouter();

  if (!router.isFallback && !page?.slug) {
    return <p>Error</p>
  }

  return (
    <>
      <Title value={page.title} />
      <Description value={page.description || strings(`documentation_description`)} />
      <OtherMeta image={ogImage || `/assets/frontmatter-social.png`} />

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

export async function getStaticProps({ params }: Params) {
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

  doc.content = await markdownToHtml(doc.content || '');

  const ogImage = await generateOgImage(doc.title, doc.description);

  console.log('ogImage', ogImage);

  return {
    props: {
      page: doc,
      pages,
      ogImage
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