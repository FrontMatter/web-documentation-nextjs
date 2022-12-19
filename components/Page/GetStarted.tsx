import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Extension } from '../../constants/extension';
import { isProduction } from '../../helpers/isProduction';

export interface IGetStartedProps {}

export const GetStarted: React.FunctionComponent<IGetStartedProps> = (props: React.PropsWithChildren<IGetStartedProps>) => {
  const { t: strings } = useTranslation();
  
  return (
    <div className="bg-vulcan-600">
      <div className="max-w-4xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8 lg:max-w-7xl lg:flex lg:items-center lg:justify-between">
        <h2 className="text-4xl font-extrabold tracking-tight text-whisper-500 sm:text-4xl">
          <span className="block">Ready to get started?</span>
        </h2>
        <div className="mt-6 lg:mt-auto space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
          <a href={isProduction() ? Extension.installLink : Extension.installBetaLink} title={`Read our documentation`}  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium shadow-sm text-white bg-teal-500 hover:bg-opacity-70 sm:px-8" rel={`noopener noreferrer`}>
            {strings(`cta_button_bottom_primary`) as string}
          </a>
          <a  href={`/docs/getting-started`} className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium shadow-sm text-vulcan-500 bg-whisper-500 hover:bg-opacity-70 sm:px-8" rel={`noopener noreferrer`}>
            {strings(`cta_button_bottom_secondary`) as string}
          </a>
        </div>
      </div>
    </div>
  );
};