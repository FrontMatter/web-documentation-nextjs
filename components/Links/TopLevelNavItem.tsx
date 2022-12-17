import Link from 'next/link';
import * as React from 'react';

export interface ITopLevelNavItemProps {
  href: string;
  title: string;
}

export const TopLevelNavItem: React.FunctionComponent<ITopLevelNavItemProps> = ({ href, title, children }: React.PropsWithChildren<ITopLevelNavItemProps>) => {
  return (
    <li>
      <Link
        href={href}
      >
        <a title={title} className="text-base font-medium text-whisper-500 hover:text-whisper-900">
          {children}
        </a>
      </Link>
    </li>
  );
};