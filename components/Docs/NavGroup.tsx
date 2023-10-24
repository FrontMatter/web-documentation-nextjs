import * as React from 'react';
import { Section } from '../Link/Section';
import { PageFrontMatter } from '../../models';
import { Link } from '../Link/Link';
import { ParentLink } from '../Link/ParentLink';

export interface INavGroupProps {
  items: PageFrontMatter[];
  item: PageFrontMatter;
}

export const NavGroup: React.FunctionComponent<INavGroupProps> = ({
  items,
  item
}: React.PropsWithChildren<INavGroupProps>) => {
  const getLinks = React.useMemo(() => {
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

        {subItems.map((subItem) => (
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
  }, [item, items]);

  return (
    <Section
      title={item.title}
      link={`/docs/${item.slug !== "index" ? item.slug : ''}`}>
      {getLinks}
    </Section>
  );
};