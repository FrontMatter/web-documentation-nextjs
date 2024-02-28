import * as React from 'react';
import { useRouter } from 'next/router';
import { Searchbox } from '../Page/Searchbox';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { MobileNavigation } from '../Navigation/MobileNavigation';
import { GlobalNavigation } from '../Navigation/GlobalNavigation';
import { SocialNavigation } from '../Navigation/SocialNavigation';
import { Home } from './Home';

export interface IHeaderProps {
  navItems?: PageFrontMatter[];
}

const Header: React.FunctionComponent<IHeaderProps> = forwardRef(({ navItems }: React.PropsWithChildren<IHeaderProps>, ref: ForwardedRef<HTMLElement>
) => {
  const router = useRouter();

  const isDocs = useMemo(() => {
    return router.pathname.startsWith('/docs');
  }, [router.pathname]);

  return (
    <>
      <header
        ref={ref}
        className={`fixed inset-x-0 top-0 z-50 flex h-16 lg:h-20 items-center justify-between px-4 transition sm:px-6 lg:z-30 lg:px-8 bg-vulcan-500/80 backdrop-blur-lg ${isDocs ? "right-0 lg:left-72 xl:left-96" : ""}`}>

        <div className="flex items-center justify-between lg:hidden w-full">
          <Home className='h-12' />

          <GlobalNavigation
            className={`hidden md:block`}
            listClassName='flex flex-row gap-4' />

          <div className={`flex items-center gap-4`}>
            <Searchbox />

            <MobileNavigation navItems={navItems} />
          </div>
        </div>

        <div className={`hidden lg:flex items-center w-full ${isDocs ? "" : "max-w-7xl mx-auto"}`}>
          <div className="flex items-center justify-between w-full">
            {
              !isDocs && (
                <Home className='h-16' />
              )
            }

            <div className="flex items-center gap-6 ml-auto">
              <GlobalNavigation
                listClassName='flex gap-6' />

              <SocialNavigation />

              <Searchbox />
            </div>
          </div>
        </div>
      </header>
    </>
  );
});

Header.displayName = 'Header';
export { Header };