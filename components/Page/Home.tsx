import Link from 'next/link';
import * as React from 'react';
import { Extension } from '../../constants/extension';
import { Logo } from '../Images';

export interface IHomeProps {
  className?: string;
}

export const Home: React.FunctionComponent<IHomeProps> = ({ className }: React.PropsWithChildren<IHomeProps>) => {
  return (
    <Link 
      href="/"
      title={Extension.name}
      className={className || ""}>
      <span className="sr-only">{Extension.name}</span>
      <Logo className={`text-whisper-500 hover:text-teal-500 h-full w-auto`} />
    </Link>
  );
};