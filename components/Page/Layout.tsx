import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { Navigation } from '../Navigation';
import { Footer } from './Footer';
import { GetStarted } from './GetStarted';
import { Sponsors } from './Sponsors';

export interface ILayoutProps {
  navItems?: PageFrontMatter[];
}

export const Layout: React.FunctionComponent<ILayoutProps> = ({navItems, children}: React.PropsWithChildren<ILayoutProps>) => {

  return (
    <div className={`flex flex-col h-full`}>
      <header className={`lg:sticky w-full lg:top-0 z-50 bg-vulcan-500 bg-opacity-80 backdrop-blur-lg`}>
        <Navigation navItems={navItems} />
      </header>

      <main className={`flex-grow`}>
        {children}
      </main>
      
      <GetStarted />

      <Sponsors />

      <Footer />
    </div>
  );
};