import React from 'react';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import { Description, OtherMeta, Title } from './Meta';
import { Extension } from '../constants/extension';
import { CTA, Features, Generators, Hero, PageLayout } from './Page';
import { useTranslation } from 'react-i18next';
import { Page } from './Docs/Page';

const titleType = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const components = {};

export default function Blog(props: any) {
  const { meta, route, ...rest } = props;
  const { t: strings } = useTranslation();
  const pageMap = props.pageMap;

  if (route.startsWith('/docs')) {
    return function Layout({ filename, pageMap, full, title: _title, ssg = {}, children }: any) {

      const filepath = route.slice(0, route.lastIndexOf('/') + 1)

      const navItems = 

      return (
        <>
          <Title value={strings(`documentation_title`)} />
          <Description value={strings(`documentation_description`)} />
          <OtherMeta image={`/assets/frontmatter-social.png`} />

          <PageLayout navItems={[]} >
            <Page items={[]} page={undefined}>
              <div className='markdown'>
                <MDXProvider components={components}>{children}</MDXProvider>
              </div>
            </Page>
          </PageLayout>
        </>
      );
    };
  }

  return function Layout({ children }: any) {
    return (
      <>
        <Title value={Extension.home} />
        <Description value={Extension.description} />
        <OtherMeta image={`/assets/frontmatter-social.png`} />

        <PageLayout>
          <CTA />

          <Generators />

          <Hero
            view={"left"}
            title={strings(`hero_title`)}
            description={(
              <>
                <p className="my-6 text-base text-whisper-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  {strings(`hero_description`)}
                </p>
                <p className="my-6 text-base text-whisper-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  {strings(`hero_description_second`)}
                </p>
              </>
            )}
            imgSrc={"https://res.cloudinary.com/estruyf/image/upload/w_1256/v1631520508/frontmatter/dashboard.png"}
            imgAlt={"Front Matter CMS editor dashboard of your static site content"}
            link={`/docs/getting-started`}
            linkText={strings(`hero_button_primary`)} />


          <Hero
            view={"right"}
            title={strings(`hero_media_title`)}
            description={strings(`hero_media_description`)}
            // imgSrc={"https://res.cloudinary.com/estruyf/image/upload/w_1256/v1633417514/frontmatter/media_dashboard_v5.0.0.png"}
            imgSrc={"https://res.cloudinary.com/estruyf/image/upload/w_1256/v1641373114/frontmatter/media-dashboard-5.9.0.png"}
            imgAlt={"Front Matter CMS - media management was never easier in VS Code"}
            link={`/docs/dashboard`}
            linkText={strings(`hero_media_button_primary`)}
            className={`lg:-mt-16`} />

          <Features />
        </PageLayout>

        <div>Hello</div>
      </>
    );
  };
}