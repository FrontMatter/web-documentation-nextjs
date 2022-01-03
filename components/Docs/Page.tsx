import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { PageActions } from './PageActions';
import { PageInfo } from './PageInfo';
import { Sidebar } from './Sidebar';

export interface IPageProps {
  items: PageFrontMatter[];
  page: PageFrontMatter | undefined;
}

export const Page: React.FunctionComponent<IPageProps> = ({items, page, children}: React.PropsWithChildren<IPageProps>) => {
  
  
  return (
    <div className={`mb-6 py-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
      <div className={`relative lg:flex`}>

        <aside className={`top-16 hidden lg:block lg:w-80 xl:w-96 mr-4`}>
          <Sidebar items={items} />
        </aside>

        <div className={`min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible`}>
          <PageActions page={page} />

          {children}

          <PageInfo page={page} />
        </div>
      </div>
    </div>
  );
};

