import { UserIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sponsor, SponsorData } from '../../models/SponsorData';
import sponsors from '../../sponsors.json';
import contributors from '../../contributors.json';
import { CONFIG } from '../../constants';

export interface ISponsorsProps { }

export const Sponsors: React.FunctionComponent<ISponsorsProps> = (props: React.PropsWithChildren<ISponsorsProps>) => {
  const { t: strings } = useTranslation();
  const [individuals, setIndividuals] = useState<any>(null);

  useEffect(() => {
    const getSponsors = async () => {
      const response = await fetch(`${CONFIG.urls.api}${CONFIG.api.sponsors}`);

      if (!response.ok) {
        setIndividuals(null);
        return;
      }

      const sponsors: SponsorData = await response.json();
      // const sponsors = data.data.viewer.sponsors.edges.map(edge => edge.node);

      setIndividuals(sponsors);
    };

    getSponsors();
  }, []);

  return (
    <div className="bg-vulcan-600">
      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 xl:px-0">
        <p className="text-center text-sm font-semibold uppercase text-whisper-900 tracking-wide">
          {strings(`sponsors_title`) as string}
        </p>

        {
          individuals && individuals.length > 0 && (
            <div className="flex justify-center space-x-4 flex-wrap">
              {
                individuals.map((sponsor: Sponsor) => (
                  <a
                    key={sponsor.id}
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                    href={sponsor.url}
                    title={`Thanks ${sponsor.name}!`}>
                    {
                      sponsor.avatarUrl ? (
                        <img className="mt-6 h-12 bg-white rounded-full border-2 border-transparent hover:border-whisper-500" alt={sponsor.name} src={sponsor.avatarUrl} />
                      ) : (
                        <UserIcon className='mt-6 h-12 p-2 bg-white rounded-full border-2 border-transparent hover:border-whisper-500 text-vulcan-500/50' />
                      )
                    }
                  </a>
                ))
              }
            </div>
          )
        }

        {
          sponsors && sponsors.companies && sponsors.companies.length > 0 && (
            <div className="flex justify-center items-center space-x-8 flex-wrap">
              {
                sponsors.companies.filter(s => s.active).map((sponsor) => (
                  <a
                    key={sponsor.id}
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                    href={sponsor.url}
                    title={sponsor.title}
                    className="mt-6 col-span-1 flex justify-center">
                    <img className={sponsor.id === "Struyf-Consulting" ? "h-[25px]" : "h-12"} src={sponsor.image} alt={sponsor.alt} />
                  </a>
                ))
              }
            </div>
          )
        }
      </div>

      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="text-center text-sm font-semibold uppercase text-whisper-900 tracking-wide">
          {strings(`contributors_title`) as string}
          <div className="flex justify-center space-x-4 flex-wrap">
            {
              contributors.map((contributor) => (
                <a
                  key={contributor.id}
                  target={`_blank`}
                  rel={`noopener noreferrer`}
                  href={contributor.url}
                  title={contributor.name}
                  className="mt-6 col-span-1 flex justify-center">
                  <img className="h-12 rounded-full border-[2px] border-white" src={contributor.avatar} alt={contributor.name} />
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};