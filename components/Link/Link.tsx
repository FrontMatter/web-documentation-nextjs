import { ChevronRightIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { default as NextLink } from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';

export interface ILinkProps {
  title: string;
  link: string;
}

export const Link: React.FunctionComponent<ILinkProps> = ({title, link}: React.PropsWithChildren<ILinkProps>) => {
  const router = useRouter();
  const [ isActive, setIsActive ] = useState(false);

  useEffect(() => {
    setIsActive(router.asPath === link);
  }, [router.asPath]);

  return (
    <NextLink href={link}>
      <a className={`transition-colors duration-200 relative block hover:text-teal-900 ${isActive ? `text-teal-800 inline-flex items-center` : `text-whisper-500`}`} title={title}>
        {isActive && <ChevronRightIcon className='mr-2 h-4 -ml-2' />}{title}
      </a>
    </NextLink>
  );
};