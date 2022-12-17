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
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { Navigation } from '../Navigation';
import { MobileNavigation } from '../Navigation/MobileNavigation';
import { GlobalNavigation } from '../Navigation/GlobalNavigation';

export interface IHeaderProps {
  navItems?: PageFrontMatter[];
}

export const Header: React.FunctionComponent<IHeaderProps> = forwardRef(({navItems}: React.PropsWithChildren<IHeaderProps>, ref: ForwardedRef<HTMLElement>
  ) => {
  const router = useRouter();

  const isDocs = useMemo(() => {
    return router.pathname.startsWith('/docs');
  }, [router.pathname]);
  
  return (
    <>
      <header
        ref={ref} 
        className={`fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-4 transition sm:px-6 lg:z-30 lg:px-8 bg-vulcan-500/80 backdrop-blur-md`}>

        <div className="flex items-center justify-between lg:hidden w-full">
          <Link href="/" aria-label="Home">
            <Logo className="h-12" />
          </Link>

          <GlobalNavigation
            className={`hidden md:block`}
            listClassName='flex flex-row gap-4' />

          <div className={`flex items-center gap-4`}>
            <Searchbox />
            
            <MobileNavigation />
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden md:block md:h-5 md:w-px md:bg-vulcan-900/10 md:dark:bg-white/15" />
          <div className="flex gap-4">
            {/* <MobileSearch />
            <ModeToggle /> */}
          </div>
        </div>
      </header>

      {/* <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
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
      </nav> */}
    </>
  );
});
