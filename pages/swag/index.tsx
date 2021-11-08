import React from 'react';
import { useTranslation } from 'react-i18next';
import { Description, OtherMeta, Title } from '../../components/Meta';
import { Layout } from '../../components/Page/Layout';
import showcases from '../../showcases.json';
import Image from 'next/image';

const stickers = [
  {
    title: "Magenta",
    image: "/assets/stickers/frontmatter-magenta.png"
  },
  {
    title: "Teal",
    image: "/assets/stickers/frontmatter-teal.png"
  },
  {
    title: "White",
    image: "/assets/stickers/frontmatter-white.png"
  }
];

export default function Home({ }: any) {
  const { t: strings } = useTranslation();
  
  return (
    <>
      <Title value={strings(`swag_title`)} />
      <Description value={`swag_description`} />
      <OtherMeta image={`/assets/frontmatter-social.png`} />

      <Layout>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 divide-y-2 divide-vulcan-200">
          <div className="pb-8 space-y-2 md:space-y-5 ">
            <h1 className="text-5xl tracking-tight font-extrabold sm:leading-none lg:text-5xl xl:text-6xl">{strings(`swag_page_title`)}</h1>
            
            <p className="mt-3 text-base text-whisper-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">{strings(`swag_page_description`)}</p>

            <p className="mt-3 text-base text-whisper-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">Our stickers are provided by <a className={`italic text-rose-600 hover:text-rose-800`} href="https://pimpyourowndevice.com" title="PimpYourOwnDevice" target="_blank" rel="noopener noreferrer">PimpYourOwnDevice</a></p>
          </div>

          <div>
            <h2 className={`mt-8 text-xl xl:text-2xl`}>Get them at <a href={`https://pimpyourowndevice.com/categories/frontmatter/`} title={`Get your Front Matter sticker`} className={`text-rose-600 hover:text-rose-800`} target="_blank" rel="noopener noreferrer">Front Matter Stickers @ PimpYourOwnDevice</a></h2>

            <div className={`py-8 grid grid-cols-1 lg:grid-cols-2 gap-8`}>
              {
                stickers.map(sticker => (
                  <div key={sticker.title} className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                      <Image
                        src={sticker.image}
                        alt={sticker.title}
                        width={400}
                        height={400}
                      />
                    </div>
                    <div className="mt-2 flex flex-col justify-center items-center">
                      <h3 className="text-xl font-bold text-center">{sticker.title}</h3>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>       
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: { showcases }
  }
}