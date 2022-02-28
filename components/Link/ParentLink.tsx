import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { default as NextLink } from 'next/link';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { Link } from './Link';

export interface IParentLinkProps {
  title: string;
  link: string;
  item: PageFrontMatter;
}

export const ParentLink: React.FunctionComponent<IParentLinkProps> = ({title, link, item}: React.PropsWithChildren<IParentLinkProps>) => {
  const router = useRouter();
  const [ hasChildren, setHasChildren ] = useState(false);
  const [ showChildren, setShowChildren ] = useState(false);

  const links = useMemo(() => {
    const { content } = item;
    const matches = Array.from(content.matchAll(/^## (.*$)/gim));
    return matches.map(match => ({
      title: match[1],
      link: match[1].toLowerCase().replace(/\s/g, '-'),
      relPath: `/docs/${item.slug !== "index" ? item.slug : ''}#${match[1].toLowerCase().replace(/\s/g, '-')}`
    }));
  }, [item]);

  const getSubLinks = useMemo(() => {
    return (
      <ul className={`ml-4 mt-2 space-y-2`}>
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              title={link.title} 
              link={link.relPath}
               />
          </li>
        ))}
      </ul>
    );
  }, [links, item]);

  const onShowChildren = () => {
    setShowChildren((prev) => !prev);
  };

  useEffect(() => {
    const { content } = item;
    const links = Array.from(content.matchAll(/^## (.*$)/gim));
    if (links && links.length > 0) {
      setHasChildren(true);
      return;
    }
    setHasChildren(false);
  }, [item]);

  useEffect(() => {
    const isCrntActive = router.asPath === link;

    if (isCrntActive) {
      setShowChildren(isCrntActive);
      return;
    }

    // Check if one of the children is active
    const isChild = links.find(link => router.asPath === link.relPath);
    if (isChild) {
      setShowChildren(true);
      return;
    }

    setShowChildren(false);
  }, [router.asPath, links]);

  return (
    <>
      {
        hasChildren ? (
          <div>
            <div className='flex items-center' >
              <button onClick={onShowChildren} title={`Show children of ${title.toLowerCase()}`}>
              {
                showChildren ? (
                  <ChevronDownIcon className='mr-2 h-4 -ml-1' />
                ) : (
                  <ChevronRightIcon className='mr-2 h-4 -ml-1' />
                )
              }
              </button>

              <Link
                title={title}
                link={link}
                hideDot
                  />
            </div>

            {
              showChildren ? getSubLinks : null
            }
          </div>
        ) : (
          <Link
            title={title}
            link={link}
              />
        )
      }
    </>
  );
};