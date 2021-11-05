import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Extension } from '../../constants/extension';
import { StarService } from '../../services/StarService';
import { GitHub } from '../Images/GitHub';

export interface IStargazersProps {}

export const Stargazers: React.FunctionComponent<IStargazersProps> = (props: React.PropsWithChildren<IStargazersProps>) => {
  const [ stars, setStars ] = useState<number | null>(null);
  const [ calling, setCalling ] = useState<boolean>(false);

  useEffect(() => {
    const getStars = async () => {
      setStars(await StarService.get());
    };

    if (!calling) {
      setCalling(true);
      getStars();
    }
  }, [calling]);

  return (
    <div className={`group flex items-center`} style={{height:"36px"}}>
      <Link href={Extension.stars}>
        <a className={`h-full flex items-center bg-whisper-500 text-vulcan-500 p-2 text-xs font-bold group-hover:bg-whisper-700`} title={`Give the project a star on GitHub`}>
          <GitHub className={`h-4 w-4 mr-1`} />
          <span>Star</span>
        </a>
      </Link>

      {
        stars && (
          <>
            <div className="w-3 overflow-hidden inline-block">
              <div className="h-4 bg-whisper-500 group-hover:bg-whisper-700 -rotate-45 transform origin-top-right"></div>
            </div>

            <Link href={Extension.stars}>
              <a className={`h-full flex items-center bg-whisper-500 text-vulcan-500 p-2 text-xs font-bold group-hover:bg-whisper-700`} title={`Give the project a star on GitHub`}>
                {stars}
              </a>
            </Link>
          </>
        )
      }
    </div>
  );
};