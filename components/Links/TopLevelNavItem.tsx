import Link from 'next/link';
import * as React from 'react';

export interface ITopLevelNavItemProps {
  href: string;
  title: string;
}

export const TopLevelNavItem: React.FunctionComponent<React.PropsWithChildren<ITopLevelNavItemProps>> = ({ href, title, children }: React.PropsWithChildren<ITopLevelNavItemProps>) => {
  return (
    <li>
      <Link
        href={href}
        title={title}
        className="text-base font-medium text-whisper-500 hover:text-whisper-900"
      >
        {children}
      </Link>
    </li>
  );
};