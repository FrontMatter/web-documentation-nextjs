import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';

export interface ISectionProps {
  title: string;
  link: string;
}

export const Section: React.FunctionComponent<React.PropsWithChildren<ISectionProps>> = ({
  title,
  link,
  children
}: React.PropsWithChildren<ISectionProps>) => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(false);
  const [showChildren, setShowChildren] = React.useState<boolean | undefined>(undefined);
  const [hasActiveLink, setHasActiveLink] = React.useState<boolean | undefined>(undefined);

  useEffect(() => {
    const page = router.asPath;
    // Remove the last slash
    const crntLink = link.endsWith('/') ? link.slice(0, -1) : link;
    setIsActive(page === crntLink || crntLink === `${page}/` || page.includes(`${crntLink}#`) || page.includes(`${crntLink}index`));

    if (crntLink.split('/').length > 2) {
      setHasActiveLink(page.includes(crntLink))
    }
  }, [router.asPath, link]);

  return (
    <>
      <div className='flex justify-between mb-3 lg:mb-3'>
        <Link
          href={link}
          title={title}
          className={`uppercase tracking-wide font-semibold text-sm ${isActive ? "text-teal-500" : "text-whisper-500"} hover:text-teal-900`}
        >
          {title}
        </Link>

        <button
          title={`Show children of ${title.toLowerCase()}`}
          onClick={() => setShowChildren(prev => !prev)} >
          {
            (
              (isActive && typeof showChildren === "undefined") ||
              (hasActiveLink && typeof showChildren === "undefined") ||
              showChildren
            ) ? (
              <ChevronDownIcon className='h-4' />
            ) : (
              <ChevronRightIcon className='h-4' />
            )
          }
        </button>
      </div>

      {
        (
          (isActive && typeof showChildren === "undefined") ||
          (hasActiveLink && typeof showChildren === "undefined") ||
          (showChildren && typeof showChildren !== "undefined")
        ) && children
      }
    </>
  );
};
