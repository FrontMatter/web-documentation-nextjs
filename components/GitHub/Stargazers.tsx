import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Extension } from '../../constants/extension';
import { GitHub } from '../Images/GitHub';

export interface IStargazersProps {}

export const Stargazers: React.FunctionComponent<IStargazersProps> = (props: React.PropsWithChildren<IStargazersProps>) => {
  const [ stars, setStars ] = useState<number | null>(null);

  useEffect(() => {
    const getStars = async () => {
      const response = await fetch(`/api/stars`);
      if (response && response.ok) {
        const data = await response.json();
        if (data && data.stars) {
          setStars(data.stars);
        }
      }
    };

    getStars();
  }, ['']);

  if (!stars) {
    return null;
  }

  return (
    <div className={`group flex items-center`} style={{height:"36px"}}>
      <Link href={Extension.stars}>
        <a className={`h-full flex items-center bg-whisper-500 text-vulcan-500 p-2 text-xs font-bold group-hover:bg-whisper-700`} title={`Give the project a star on GitHub`}>
          <GitHub className={`h-4 w-4 mr-1`} />
          <span>Star</span>
        </a>
      </Link>

      <div className="w-3 overflow-hidden inline-block">
        <div className="h-4 bg-whisper-500 group-hover:bg-whisper-700 -rotate-45 transform origin-top-right"></div>
      </div>

      <Link href={Extension.stars}>
        <a className={`h-full flex items-center bg-whisper-500 text-vulcan-500 p-2 text-xs font-bold group-hover:bg-whisper-700`} title={`Give the project a star on GitHub`}>
          {stars}
        </a>
      </Link>
    </div>
  );
};