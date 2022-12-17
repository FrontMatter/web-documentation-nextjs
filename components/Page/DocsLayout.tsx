import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { Sidebar } from '../Docs/Sidebar';
import { Navigation } from '../Navigation';
import { MobileNavigation } from '../Navigation/MobileNavigation';
import { BetaBanner } from './BetaBanner';
import { Footer } from './Footer';
import { GetStarted } from './GetStarted';
import { Home } from './Home';
import { Sponsors } from './Sponsors';

export interface IDocsLayoutProps {
  navItems?: PageFrontMatter[];
}

export const DocsLayout: React.FunctionComponent<IDocsLayoutProps> = ({navItems, children}: React.PropsWithChildren<IDocsLayoutProps>) => {

  return (
    <div className={`lg:ml-72 xl:ml-80`}>
      
      <aside className={`fixed inset-y-0 left-0 z-40 contents w-72 overflow-y-auto px-6 pt-4 pb-8 lg:block xl:w-80 lg:pr-8 lg:border-r lg:border-vulcan-300`}>
        <div className={`fixed inset-x-0 top-0 z-50 flex h-16 lg:h-32 xl:h-16 items-center transition sm:px-6 lg:z-30 lg:px-8 backdrop-blur-md dark:backdrop-blur lg:left-72 xl:left-80 border-b border-vulcan-300/10 bg-vulcan-500/80`}>
          <div className='ml-auto'>
            <Navigation />

            <MobileNavigation navItems={navItems} />
          </div>
        </div>

        <Home className={`hidden lg:flex`} />
        
        <Sidebar className={`hidden lg:mt-8 lg:block space-y-8`} items={navItems || []} />
      </aside>

      <div className='relative flex flex-col pt-16 lg:pt-32 xl:pt-16 h-full overflow-y-auto'>
        <BetaBanner />
        
        <main className={`flex-grow`}>
          {children}
        </main>
        
        <GetStarted />

        <Sponsors />

        <Footer />
      </div>
    </div>
  );
};