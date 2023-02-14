import * as React from 'react';
import { useTranslation } from 'react-i18next';

export interface IGeneratorsProps {}

export const Generators: React.FunctionComponent<IGeneratorsProps> = (props: React.PropsWithChildren<IGeneratorsProps>) => {
  const { t: strings } = useTranslation();

  return (
    <div className="bg-whisper-100">
      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-3xl xl:text-4xl font-extrabold sm:leading-none text-center mb-8">
          {
            strings(`generators_title`).split(` `).map(word => {
              if (word === 'seamlessly') {
                return (
                  <span key={word} className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-500 to-rose-900">{word} </span>
                )
              }

              return (
                <span key={word} className={`text-vulcan-500`}> {word} </span>
              );
            })
          }
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-1 flex justify-center">
            <img className="h-12" src="/assets/logos/11ty.svg" alt="11ty" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12" src="/assets/logos/docusaurus.svg" alt="Docusaurus" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12" src="/assets/logos/gatsby.svg" alt="Gatsby" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12" src="/assets/logos/hugo.svg" alt="Hugo" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12" src="/assets/logos/jekyll.svg" alt="Jekyll" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12" src="/assets/logos/nextjs.svg" alt="Next.js" />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <p className={`text-2xl tracking-tight font-bold sm:leading-none text-vulcan-500`}>
            {strings(`generators_more`) as string}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <p className={`text-xl tracking-tight sm:leading-none text-vulcan-500`}>
            {strings(`generators_more2`) as string}
          </p>
        </div>
      </div>
    </div>
  );
};