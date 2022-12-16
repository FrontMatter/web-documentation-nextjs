import * as React from 'react';
import { navigation } from '../../constants/navigation';
import { Logo } from '../Images';
import Link from 'next/link';
import { Extension } from '../../constants/extension';
import { useRouter } from 'next/router';
import { Searchbox } from '../Page/Searchbox';
import { Stargazers } from '../GitHub/Stargazers';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { MobileMenu } from '../Navigation/MobileMenu';
import { useMemo } from 'react';
import { Navigation } from '../Navigation';

export interface IHeaderProps {
  navItems?: PageFrontMatter[];
  hideHome?: boolean;
}

export const Header: React.FunctionComponent<IHeaderProps> = ({navItems}: React.PropsWithChildren<IHeaderProps>) => {
  const router = useRouter();

  const isDocs = useMemo(() => {
    return router.pathname.startsWith('/docs');
  }, [router.pathname]);
  
  return (
    <>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className={`relative w-full py-6 flex items-center ${ isDocs ? "justify-center lg:justify-between" : "justify-between" }  border-b border-teal-500 xl:border-none`}>
          <div className="flex items-center">

            <div className="xl:hidden absolute left-0">
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

            <div className="xl:hidden absolute right-0">
              <Searchbox />
            </div>
          </div>
          
          <Navigation />
        </div>
      </nav>
    </>
  );
};
