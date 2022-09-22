import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';

export interface ISectionProps {
  title: string;
  link: string;
}

export const Section: React.FunctionComponent<ISectionProps> = ({title, link}: React.PropsWithChildren<ISectionProps>) => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(false);

  useEffect(() => {
    const page = router.asPath;
    setIsActive(page === link || link === `${page}/` || page.includes(`${link}#`) || page.includes(`${link}index`));
  }, [router.asPath, link]);
  
  return (
    <Link href={link}>
      <a className={`mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm ${isActive ? "text-teal-500" : "text-whisper-500"} hover:text-teal-900`} title={title}>
        {title}
      </a>
    </Link>
  );
};
