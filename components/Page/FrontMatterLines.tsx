import * as React from 'react';

export interface IFrontMatterLinesProps {}

export const FrontMatterLines: React.FunctionComponent<IFrontMatterLinesProps> = (props: React.PropsWithChildren<IFrontMatterLinesProps>) => {
  return (
    <div className='flex items-center space-x-2 sm:space-x-4 my-8'>
      <div className={`w-8 sm:w-12 h-2 sm:h-2 bg-whisper-900 bg-opacity-95`}></div>
      <div className={`w-8 sm:w-12 h-2 sm:h-2 bg-whisper-900 bg-opacity-95`}></div>
      <div className={`w-8 sm:w-12 h-2 sm:h-2 bg-whisper-900 bg-opacity-95`}></div>
    </div>
  );
};