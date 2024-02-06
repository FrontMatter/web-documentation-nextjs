import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { navigation } from '../../constants/navigation';

export interface IPricingProps { }

export const Pricing: React.FunctionComponent<IPricingProps> = (props: React.PropsWithChildren<IPricingProps>) => {
  const { t: strings } = useTranslation();

  return (
    <div className={`sponsor__block bg-whisper-50 text-vulcan-500 border-t-2 border-b-2 border-whisper-600`}>
      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold">{strings(`pricing_title`) as string}</h2>
          <div className="mt-4 text-lg text-vulcan-300 space-y-4">
            <ReactMarkdown>
              {strings(`pricing_description`)}
            </ReactMarkdown>
          </div>

          <navigation.sponsor.icon
            title={strings(`pricing_cta_title`)}
            btnClassName={`group mt-4 inline-block px-4 py-3 border border-transparent rounded text-base font-medium shadow-sm text-white bg-vulcan-50 hover:bg-vulcan-500 sm:px-8`}
            className="inline-block h-6 w-6"
            aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};