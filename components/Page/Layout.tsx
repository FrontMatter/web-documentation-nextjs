import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { BetaBanner } from './BetaBanner';
import { Footer } from './Footer';
import { GetStarted } from './GetStarted';
import { Header } from './Header';
import { Sponsors } from './Sponsors';

export interface ILayoutProps {
  navItems?: PageFrontMatter[];
}

export const Layout: React.FunctionComponent<ILayoutProps> = ({navItems, children}: React.PropsWithChildren<ILayoutProps>) => {

  return (
    <div className={`flex flex-col h-full`}>
      <Header navItems={navItems} />

      <main className={`flex-grow pt-16`}>
        {children}
      </main>
      
      <GetStarted />

      <Sponsors />

      <Footer />
    </div>
  );
};