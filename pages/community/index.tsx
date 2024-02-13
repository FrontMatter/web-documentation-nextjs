import React from 'react';
import { useTranslation } from 'react-i18next';
import { Description, OtherMeta, Title } from '../../components/Meta';
import { Layout } from '../../components/Page/Layout';
import { Extension } from '../../constants/extension';
import { getPostByFilename } from '../../lib/api';

const communityLinks = [
  {
    title: 'Discord',
    description: 'Join the Front Matter Discord server to chat with the community and the team.',
    link: Extension.discord,
  },
  {
    title: 'Twitter',
    description: 'Follow the Front Matter Twitter account to get the latest news and updates.',
    link: Extension.twitter,
  },
  {
    title: 'GitHub',
    description: 'Contribute to the Front Matter project on GitHub.',
    link: Extension.githubLink
  }
]

export default function Home({ content }: any) {
  const { t: strings } = useTranslation();

  return (
    <>
      <Title value={strings(`community_title`)} />
      <Description value={strings(`community_description`)} />
      <OtherMeta image={`/assets/frontmatter-social.png`} />

      <Layout>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 xl:px-0 divide-y-2 divide-vulcan-200">
          <div className="pb-8 space-y-2 md:space-y-5 ">
            <h1 className="text-5xl tracking-tight font-extrabold sm:leading-none lg:text-5xl xl:text-6xl">{strings(`community_page_title`) as string}</h1>

            <p className="mt-3 text-base text-whisper-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">{strings(`community_page_description`) as string}</p>
          </div>

          <div className={`community`}>
            <h2 className='text-3xl xl:text-4xl mt-8 tracking-tight font-extrabold sm:leading-none'>Get in touch</h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-8`}>
              {communityLinks.map((link, index) => (
                <div key={index} className={`p-4 shadow-lg bg-vulcan-100 rounded`}>
                  <h3 className={`text-2xl font-bold`}>{link.title}</h3>
                  <p className={`mt-2 text-base text-whisper-700`}>{link.description}</p>
                  <a
                    href={link.link}
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                    className={`mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded text-base font-medium text-white bg-rose-900 hover:bg-rose-800 focus:outline-none`}>Go to {link.title}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const changes = getPostByFilename('changelog', "CHANGELOG.md", ['content']);

  return {
    props: { content: changes.content }
  }
}