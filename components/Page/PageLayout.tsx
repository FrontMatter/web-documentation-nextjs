import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { Navigation } from '../Navigation';
import { Footer } from './Footer';
import { Sponsors } from './Sponsors';

export interface IPageLayoutProps {
  navItems?: PageFrontMatter[];
}

export const PageLayout: React.FunctionComponent<IPageLayoutProps> = ({navItems, children}: React.PropsWithChildren<IPageLayoutProps>) => {

  return (
    <div className={`flex flex-col h-screen`}>
      <header className={`lg:sticky w-full lg:top-0 z-50 bg-vulcan-500 bg-opacity-80 backdrop-blur-lg`}>
        <Navigation navItems={navItems} />
      </header>

      <main className={`flex-grow`}>
        {children}
      </main>

      <Sponsors />

      <Footer />
    </div>
  );
};