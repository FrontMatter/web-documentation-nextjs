import * as React from 'react';
import { navigation } from '../../constants/navigation';
import { Logo } from '../Images';
import Link from 'next/link';
import { Extension } from '../../constants/extension';
import { useRouter } from 'next/router';
import { Searchbox } from '../Page/Searchbox';
import { isProduction } from '../../helpers/isProduction';
import { Stargazers } from '../GitHub/Stargazers';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { MobileMenu } from './MobileMenu';

export interface INavigationProps {
  navItems?: PageFrontMatter[];
}

export const Navigation: React.FunctionComponent<INavigationProps> = ({navItems}: React.PropsWithChildren<INavigationProps>) => {
  const router = useRouter();
  
  return (
    <>
      {
        !isProduction() ? (
          <div className={`bg-yellow-500 text-center py-2 px-4`}>
            <a href={`https://frontmatter.codes`} title={`Go to main release documentation`} className={`text-base font-medium text-vulcan-500 hover:text-vulcan-900`}>
              You are currently viewing the BETA version of Front Matter documentation. Click on the banner to go to the main release documentation.
            </a>
          </div>
        ) : null
      }

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="relative w-full py-6 flex items-center justify-center lg:justify-between border-b border-teal-500 lg:border-none">
          <div className="flex items-center">

            <div className="lg:hidden absolute left-0">
              {
                navItems && navItems.length > 0 && (
                  <MobileMenu navItems={navItems} />
                )
              }
            </div>

            <Link href="/">
              <a title={Extension.name}>
                <span className="sr-only">{Extension.name}</span>
                <Logo className={`text-whisper-500 hover:text-teal-500 h-16 w-auto`} />
              </a>
            </Link>

            <div className="lg:hidden absolute right-0">
              <Searchbox />
            </div>
          </div>
          <div className="space-x-4">
            <div className="hidden ml-10 space-x-6 lg:flex justify-center items-center">
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
        </div>
        <div className="py-4 flex flex-wrap justify-center md:space-x-6 lg:hidden">
          {navigation.main.map((link) => (
            <a key={link.name} href={link.href} title={link.title} className="mx-3 md:mx-0 text-base font-medium text-whisper-500 hover:text-whisper-900">
              {link.name}
            </a>
          ))}
        </div>
        <div className="py-4 flex flex-wrap justify-center items-center space-x-6 lg:hidden">

          <navigation.sponsor.icon className="inline-block h-6 w-6" aria-hidden="true" />

          {navigation.social.map((link) => (
            <a key={link.name} href={link.href} title={link.title} className={`text-base font-medium text-whisper-500 hover:text-whisper-900`} rel={`noopener noreferrer`}>
              <span className="sr-only">{link.name}</span>
              <link.icon className="inline-block h-6 w-6" aria-hidden="true" />
            </a>
          ))}

          <Stargazers />
        </div>
      </nav>
    </>
  );
};
