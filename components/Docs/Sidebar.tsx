import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { NavGroup } from './NavGroup';

export interface ISidebarProps {
  items: PageFrontMatter[];
  className?: string;
}

export const Sidebar: React.FunctionComponent<ISidebarProps> = ({ items, className }: React.PropsWithChildren<ISidebarProps>) => {

  let sorted = items?.sort((a, b) => { return (a.weight || 99) - (b.weight || 99); }) || [];

  // Retrieve only the root sections, not the sub-sections
  sorted = sorted.filter((item) => (item.weight || 99) % 1 === 0);

  return (
    <nav role={`navigation`} className={className || ""}>
      {sorted.map((item, index) => {
        return (
          <div key={index}>
            <NavGroup
              items={items}
              item={item} />
          </div>
        );
      })}
    </nav>
  );
};