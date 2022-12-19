import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { Sidebar } from '../Docs/Sidebar';
import { Navigation } from '../Navigation';
import { MobileNavigation } from '../Navigation/MobileNavigation';
import { BetaBanner } from './BetaBanner';
import { Footer } from './Footer';
import { GetStarted } from './GetStarted';
import { Header } from './Header';
import { Home } from './Home';
import { Sponsors } from './Sponsors';

export interface IDocsLayoutProps {
  navItems?: PageFrontMatter[];
}

export const DocsLayout: React.FunctionComponent<React.PropsWithChildren<IDocsLayoutProps>> = ({navItems, children}: React.PropsWithChildren<IDocsLayoutProps>) => {

  return (
    <div className={`lg:ml-72 xl:ml-80`}>
      
      <aside className={`fixed inset-y-0 left-0 z-40 contents w-72 overflow-y-auto px-6 pt-4 pb-8 lg:block xl:w-80 lg:pr-8 lg:border-r lg:border-vulcan-300`}>
        <div className='ml-auto'>
          <Header navItems={navItems} />
        </div>

        <Home className={`hidden lg:flex h-16`} />
        
        <Sidebar className={`hidden lg:mt-8 lg:block space-y-8`} items={navItems || []} />
      </aside>

      <div className='relative flex flex-col pt-20 h-full overflow-y-auto'>
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