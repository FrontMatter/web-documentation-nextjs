import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { Link } from '../Link/Link';
import { ParentLink } from '../Link/ParentLink';
import { Section } from '../Link/Section';

export interface ISidebarProps {
  items: PageFrontMatter[];
}

export const Sidebar: React.FunctionComponent<ISidebarProps> = ({ items }: React.PropsWithChildren<ISidebarProps>) => {

  let sorted = items?.sort((a, b) => { return (a.weight || 99) - (b.weight || 99); }) || [];

  // Retrieve only the root sections, not the sub-sections
  sorted = sorted.filter((item) => (item.weight || 99) % 1 === 0);

  const getLinks = (item: PageFrontMatter) => {
    const { content } = item;
    const links = Array.from(content.matchAll(/^## (.*$)/gim));

    const crntWeight = item.weight || 99;
    const subItems = items.filter(i => i.weight && i.weight > crntWeight && i.weight < crntWeight + 1);

    if ((!links || links.length === 0) && (!subItems || subItems.length === 0)) {
      return null;
    }

    return (
      <ul className={`mt-2 space-y-2`}>
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              title={link[1]} 
              link={`/docs/${item.slug !== "index" ? item.slug : ''}#${link[1].toLowerCase().replace(/\s/g, '-')}`}
               />
          </li>
        ))}

        {subItems.map((subItem, index) => (
          <li key={subItem.slug} className={`group`}>
            <ParentLink 
              title={subItem.title} 
              link={`/docs/${subItem.slug}`}
              item={subItem}
               />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <nav role={`navigation`} className={`hidden lg:mt-8 lg:block space-y-8`}>
      {sorted.map((item, index) => {
        return (
          <div key={index}>
            <Section title={item.title} link={`/docs/${item.slug !== "index" ? item.slug : ''}`} />

            {getLinks(item)}
          </div>
        );
      })}
    </nav>
  );
};