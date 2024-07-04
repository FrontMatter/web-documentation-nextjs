import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Description, OtherMeta, Title } from '../components/Meta';
import { CTA, Features, Generators, Hero, Layout, Testimonial } from '../components/Page';
import { Pricing } from '../components/Pricing';
import { Extension } from '../constants/extension';
import { Review, Reviews } from '../models';
const ScrollOut = require('scroll-out');

const Home = ({ reviews }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t: strings } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      ScrollOut({
        once: true
      })
    }, 0);
  }, [])

  return (
    <>
      <Title value={Extension.home} />
      <Description value={Extension.description} />
      <OtherMeta image={`/assets/frontmatter-social.png`} />

      <Layout>
        <CTA />

        <Generators />

        <Hero
          view={"right"}
          title={strings(`hero_editing_title`)}
          description={strings(`hero_editing_description`)}
          imgSrc={"/assets/homepage/article-editing.webp"}
          imgAlt={"Front Matter CMS - Article editing and front matter management in VS Code"}
          link={`/docs/panel`}
          linkText={strings(`hero_editing_button_primary`)}
          className={`lg:-mt-16`} />

        <Hero
          view={"left"}
          title={strings(`hero_title`)}
          description={(
            <>
              <p className="my-6 text-base text-whisper-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {strings(`hero_description`) as string}
              </p>
              <p className="my-6 text-base text-whisper-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {strings(`hero_description_second`) as string}
              </p>
            </>
          )}
          // imgSrc={"https://res.cloudinary.com/estruyf/image/upload/w_1256/v1631520508/frontmatter/dashboard.png"}
          // imgSrc={"https://res.cloudinary.com/estruyf/image/upload/w_1256/v1649326998/frontmatter/7.1.0/dashboard.png"}
          // imgSrc={"https://res.cloudinary.com/estruyf/image/upload/h_914/v1/frontmatter/10.1.0/dashboard"}
          imgSrc={"/assets/homepage/content-dashboard.webp"}
          imgAlt={"Front Matter CMS editor dashboard of your static site content"}
          link={`/docs/getting-started`}
          linkText={strings(`hero_button_primary`)} />


        <Hero
          view={"right"}
          title={strings(`hero_media_title`)}
          description={strings(`hero_media_description`)}
          // imgSrc={"https://res.cloudinary.com/estruyf/image/upload/w_1256/v1633417514/frontmatter/media_dashboard_v5.0.0.png"}
          // imgSrc={"https://res.cloudinary.com/estruyf/image/upload/w_1256/v1641373114/frontmatter/media-dashboard-5.9.0.png"}
          // imgSrc={"https://res.cloudinary.com/estruyf/image/upload/w_1256/v1649326999/frontmatter/7.1.0/media-dashboard.png"}
          // imgSrc={"https://res.cloudinary.com/estruyf/image/upload/h_914/v1/frontmatter/10.1.0/l9hu0nchrssvemjqlr6d"}
          imgSrc={"/assets/homepage/media-dashboard.webp"}
          imgAlt={"Front Matter CMS - media management was never easier in VS Code"}
          link={`/docs/dashboard`}
          linkText={strings(`hero_media_button_primary`)}
          className={`lg:-mt-16`} />

        <Features />

        <Pricing />

        <Testimonial reviews={reviews} />
      </Layout>
    </>
  )
}

export default Home

export const getStaticProps = (async (context) => {
  const res = await fetch('https://marketplace.visualstudio.com/_apis/public/gallery/publishers/eliostruyf/extensions/vscode-front-matter/reviews?count=6&filterOptions=3')
  const repo: Reviews = await res.json();
  return {
    props: {
      reviews: repo.reviews,
    },
  };
}) as GetStaticProps<{ reviews: Review[] }>;
