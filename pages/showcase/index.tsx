import React from 'react';
import { useTranslation } from 'react-i18next';
import { Description, OtherMeta, Title } from '../../components/Meta';
import { Layout } from '../../components/Page/Layout';
import { Extension } from '../../constants/extension';
import featured from '../../featured.json';
import showcases from '../../showcases.json';
import themes from '../../themes.json';
import Image from 'next/image';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#0e131f" offset="20%" />
      <stop stop-color="#222733" offset="50%" />
      <stop stop-color="#0e131f" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const sortTitle = (a: { title: string }, b: { title: string }) => {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

export default function Home({ showcases, featured }: any) {
  const { t: strings } = useTranslation();

  const allFeatured = featured.filter((f: any) => f.featured);
  const links = featured.filter((f: any) => !f.featured);

  return (
    <>
      <Title value={strings(`showcase_title`)} />
      <Description value={`showcase_description`} />
      <OtherMeta image={`/assets/frontmatter-social.png`} />

      <Layout>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 xl:px-0 divide-y-2 divide-vulcan-200">
          <div className="pb-8 space-y-2 md:space-y-5 ">
            <h1 className="text-5xl tracking-tight font-extrabold sm:leading-none lg:text-5xl xl:text-6xl">{strings(`showcase_page_title`) as string}</h1>

            <p className="mt-3 text-base text-whisper-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">{strings(`showcase_page_description`) as string}</p>

            <div className="mt-8 text-base">
              <p>Want to add your site or article/video/... to our showcase page? Great, open a showcase on <a className="text-teal-500 hover:text-teal-900" href={Extension.showcaseLink} target="_blank" rel="noopener noreferrer">Github</a>!</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl xl:text-4xl mt-8 tracking-tight font-extrabold sm:leading-none">{strings(`showcase_featured_title`) as string}</h2>

            <div className={`py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16`}>
              {allFeatured.sort(sortTitle).map((feature: any) => (
                <div key={feature.title}>
                  <a
                    className="group space-y-2 md:space-y-5 relative hover:text-teal-700"
                    href={feature.link}
                    title={feature.title}
                    target="_blank"
                    rel={`noopener noreferrer`}>
                    <figure className={`relative overflow-hidden grayscale group-hover:grayscale-0 text-center`}>
                      <Image
                        className={`w-full object-cover object-left-top`}
                        src={`${feature.preview}`}
                        alt={feature.title}
                        loading={`lazy`}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(592, 400))}`}
                        width={592}
                        height={400}
                      />
                    </figure>

                    <h2 className="text-xl lg:text-2xl tracking-tight font-extrabold sm:leading-none">{feature.title}</h2>
                  </a>

                  {
                    feature.author && (
                      <p className="text-base text-whisper-700 mt-1">
                        {
                          feature.author?.link ? (
                            <a className="text-whisper-900 hover:text-yellow-700" href={feature.author.link} title={feature.author.name} target="_blank" rel="noopener noreferrer">{feature.author.name}</a>
                          ) : (
                            feature.author.name
                          )
                        }
                      </p>
                    )
                  }
                </div>
              ))}
            </div>
          </div>

          <div className='py-8'>
            <h3 className={`text-3xl xl:text-4xl tracking-tight font-extrabold sm:leading-none`}>Articles / videos / etc.</h3>

            <ul className={`list-disc pl-6 mt-8`}>
              {
                links.sort(sortTitle).map((feature: any) => (
                  <li key={feature.title}>
                    <a className="group relative hover:text-yellow-700 leading-loose" href={feature.link} title={feature.title} target="_blank" rel={`noopener noreferrer`}>
                      <span className={`text-base tracking-tight`}>
                        {feature.title}
                      </span>
                    </a>
                    <span className={`text-whisper-900`}> @ </span>
                    <span>
                      {
                        feature.author?.link ? (
                          <a className="text-teal-500 hover:text-teal-200 font-bold" href={feature.author.link} title={feature.author.name} target="_blank" rel="noopener noreferrer">{feature.author.name}</a>
                        ) : (
                          feature.author.name
                        )
                      }
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>

          <div>
            <h2 className="text-3xl xl:text-4xl mt-8 tracking-tight font-extrabold sm:leading-none">
              Websites managed by Front Matter CMS
            </h2>

            <div className={`py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16`}>
              {showcases.filter((showcase: any) => showcase.image).sort(sortTitle).map((showcase: any) => (
                <a
                  key={showcase.title}
                  className="group relative hover:text-teal-700"
                  href={showcase.link}
                  title={showcase.title}
                  target="_blank"
                  rel={`noopener noreferrer`}>
                  <figure className={`relative h-64 lg:h-[16rem] overflow-hidden grayscale group-hover:grayscale-0 text-center`}>
                    <Image
                      className={`w-full h-full object-cover object-left-top`}
                      src={`/showcases/${showcase.image}`}
                      alt={showcase.title}
                      loading={`lazy`}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(592, 400))}`}
                      width={592}
                      height={400}
                    />
                  </figure>

                  <h3 className="mt-2 text-xl tracking-tight font-extrabold sm:leading-none lg:text-xl xl:text-2xl">
                    {showcase.title}
                  </h3>

                  <p className="mt-1 text-base text-whisper-700">{showcase.description}</p>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl xl:text-4xl mt-8 tracking-tight font-extrabold sm:leading-none">
              Templates/themes with Front Matter CMS integration
            </h2>

            <div className={`py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16`}>
              {themes.filter((theme: any) => theme.image).sort(sortTitle).map((theme: any) => (
                <a
                  key={theme.title}
                  className="group relative hover:text-teal-700"
                  href={theme.link}
                  title={theme.title}
                  target="_blank"
                  rel={`noopener noreferrer`}>
                  <figure className={`relative h-64 lg:h-[16rem] overflow-hidden grayscale group-hover:grayscale-0 text-center`}>
                    <Image
                      className={`w-full h-full object-cover object-left-top`}
                      src={`/showcases/themes/${theme.image}`}
                      alt={theme.title}
                      loading={`lazy`}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(592, 400))}`}
                      width={592}
                      height={400}
                    />
                  </figure>
                  <h3 className="mt-2 text-xl tracking-tight font-extrabold sm:leading-none lg:text-xl xl:text-2xl">
                    {theme.title}
                  </h3>

                  <p className="mt-1 text-base text-whisper-900">
                    Author: {theme.author} - SSG: {theme.generator}
                  </p>

                  <p className="mt-1 text-base text-whisper-700">{theme.description}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="">
            <div className="mt-8 text-sm">
              <p>Want to add your site or article/video/... to our showcase page? Great, open a showcase on <a className="text-teal-500 hover:text-teal-900" href={Extension.showcaseLink} target="_blank" rel="noopener noreferrer">Github</a>!</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: { showcases, featured }
  }
}