import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { Sidebar } from '../Docs/Sidebar';

export interface IDocsNavigationProps {
  navItems?: PageFrontMatter[];
}

export const DocsNavigation: React.FunctionComponent<IDocsNavigationProps> = ({ navItems }: React.PropsWithChildren<IDocsNavigationProps>) => {
  return (
    <nav role={`list`}>
      <Sidebar 
        className={`space-y-6`}
        items={navItems || []} />
    </nav>
  );
};