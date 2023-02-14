import { useRouter } from 'next/router';
import * as React from 'react';
import { navigation } from '../../constants/navigation';
import { Stargazers } from '../GitHub/Stargazers';
import { Searchbox } from '../Page/Searchbox';

export interface INavigationProps {}

export const Navigation: React.FunctionComponent<INavigationProps> = (props: React.PropsWithChildren<INavigationProps>) => {
  const router = useRouter();
  
  return (
    <>
      <div className="space-x-4">
        <div className="hidden ml-10 space-x-6 xl:flex justify-center items-center">
          {navigation.main.map((link) => (
            <a key={link.name} href={link.href} title={link.title} className={`text-base font-medium text-whisper-500 hover:text-teal-500 ${link.href === router.asPath ? `text-teal-800` : ``}`}>
              {link.name}
            </a>
          ))}

          <navigation.sponsor.icon className="inline-block h-6 w-6" aria-hidden="true" />

          {navigation.social.map((link) => (
            <a key={link.name} href={link.href} title={link.title} className={`group flex items-center text-base font-medium text-whisper-500 hover:text-teal-500`} rel={`noopener noreferrer`}>
              <span className="sr-only">{link.name}</span>
              <link.icon className="inline-block h-6 w-6" aria-hidden="true" />
            </a>
          ))}

          <Stargazers />

          <Searchbox />
        </div>
      </div>

      <div className="py-4 flex flex-wrap justify-center md:space-x-6 xl:hidden">
        {navigation.main.map((link) => (
          <a key={link.name} href={link.href} title={link.title} className="mx-3 md:mx-0 text-base font-medium text-whisper-500 hover:text-whisper-900">
            {link.name}
          </a>
        ))}
      </div>
      <div className="py-4 flex flex-wrap justify-center items-center space-x-6 xl:hidden">

        <navigation.sponsor.icon className="inline-block h-6 w-6" aria-hidden="true" />

        {navigation.social.map((link) => (
          <a key={link.name} href={link.href} title={link.title} className={`text-base font-medium text-whisper-500 hover:text-whisper-900`} rel={`noopener noreferrer`}>
            <span className="sr-only">{link.name}</span>
            <link.icon className="inline-block h-6 w-6" aria-hidden="true" />
          </a>
        ))}

        <Stargazers />
      </div>
    </>
  );
};