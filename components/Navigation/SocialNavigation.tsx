import * as React from 'react';
import { navigation } from '../../constants/navigation';
import { Stargazers } from '../GitHub/Stargazers';

export interface ISocialNavigationProps {}

export const SocialNavigation: React.FunctionComponent<ISocialNavigationProps> = (props: React.PropsWithChildren<ISocialNavigationProps>) => {
  return (
    <nav
      className='flex flex-col lg:flex-row items-center justify-center gap-6'
      role={`list`}>

      <navigation.sponsor.icon className="inline-block h-6 w-6" aria-hidden="true" />

      <ul className='flex justify-center gap-6'>
        {navigation.social.map((item) => (
          <li key={item.name}>
            <a title={item.title} href={item.href} className="text-base font-medium text-whisper-500 hover:text-whisper-900" rel={`noopener noreferrer`}>
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      
      <Stargazers />
    </nav>
  );
};