import * as React from 'react';
import { isProduction } from '../../helpers/isProduction';

export interface IBetaBannerProps {}

export const BetaBanner: React.FunctionComponent<IBetaBannerProps> = (props: React.PropsWithChildren<IBetaBannerProps>) => {
  return (
    <>
      {
        !isProduction() ? (
          <div className={`bg-yellow-500 text-center py-2 px-4`}>
            <a href={`https://frontmatter.codes`} title={`Go to main release documentation`} className={`text-base font-medium text-vulcan-500 hover:text-vulcan-900`}>
              You are currently viewing the BETA version of Front Matter documentation. Click on the banner to go to the main release documentation.
            </a>
          </div>
        ) : null
      }
    </>
  );
};