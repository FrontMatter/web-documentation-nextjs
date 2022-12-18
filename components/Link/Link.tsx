import { ChevronRightIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { default as NextLink } from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';

export interface ILinkProps {
  title: string;
  link: string;
  hideDot?: boolean;
}

export const Link: React.FunctionComponent<ILinkProps> = ({title, link, hideDot}: React.PropsWithChildren<ILinkProps>) => {
  const router = useRouter();
  const [ isActive, setIsActive ] = useState(false);

  useEffect(() => {
    const crntPath = router.asPath.replace(/\/#/, '#');
    setIsActive(crntPath === link.replace(/\/#/, '#'));
  }, [router.asPath]);

  return (
    <NextLink 
      href={link}
      title={title}
      className={`inline-flex items-center transition-colors duration-200 relative hover:text-teal-900 ${isActive ? `text-teal-800` : `text-whisper-900`}`}>
      { !hideDot && <div className='w-1 h-1 rounded-full bg-current mr-2'></div> }
      {title}
    </NextLink>
  );
};