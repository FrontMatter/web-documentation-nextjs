import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { PageActions } from './PageActions';
import { PageInfo } from './PageInfo';

export interface IPageProps {
  items: PageFrontMatter[];
  page: PageFrontMatter | undefined;
}

export const Page: React.FunctionComponent<IPageProps> = ({items, page, children}: React.PropsWithChildren<IPageProps>) => {
  
  return (
    <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
      <div className={`my-16 min-w-0 w-full flex-auto lg:max-h-full lg:overflow-visible lg:pl-8`} style={{marginLeft: '-1px'}}>
        <PageActions page={page} />

        {children}

        <PageInfo page={page} items={items} />
      </div>
    </div>
  );
};

