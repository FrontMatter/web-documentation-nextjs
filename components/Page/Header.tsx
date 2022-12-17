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
import { SocialNavigation } from '../Navigation/SocialNavigation';

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
        className={`fixed inset-x-0 top-0 z-50 flex h-16 lg:h-20 items-center justify-between px-4 transition sm:px-6 lg:z-30 lg:px-8 bg-vulcan-500/80 backdrop-blur-md`}>

        <div className="flex items-center justify-between lg:hidden w-full">
          <Link href="/" aria-label="Home">
            <a title='Home'>
              <Logo className="h-12" />
            </a>
          </Link>

          <GlobalNavigation
            className={`hidden md:block`}
            listClassName='flex flex-row gap-4' />

          <div className={`flex items-center gap-4`}>
            <Searchbox />
            
            <MobileNavigation />
          </div>
        </div>

        <div className="hidden lg:flex items-center w-full">
          <div className="flex items-center justify-between w-full">
            <Link href="/" aria-label="Home">
              <Logo className="h-16" />
            </Link>

            <div className="flex items-center gap-6">
              <GlobalNavigation 
                listClassName='flex gap-6'/>

              <SocialNavigation />

              <Searchbox />
            </div>
          </div>
        </div>
      </header>
    </>
  );
});
