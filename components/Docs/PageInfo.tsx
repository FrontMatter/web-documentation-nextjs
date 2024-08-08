import { format, parseJSON } from 'date-fns';
import * as React from 'react';
import { useMemo } from 'react';
import { Extension } from '../../constants/extension';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import Giscus from "@giscus/react";
import { PageActions } from './PageActions';
import { CONFIG } from '../../constants';

export interface IPageInfoProps {
  items: PageFrontMatter[];
  page: PageFrontMatter | undefined;
}

export const PageInfo: React.FunctionComponent<IPageInfoProps> = ({ page, items }: React.PropsWithChildren<IPageInfoProps>) => {

  const prevPage = useMemo(() => {
    if (!page || items.length === 0) {
      return null;
    }

    const crntIdx = items.findIndex((i) => i.weight === page?.weight);
    return items[crntIdx - 1];
  }, [page, items]);

  const nextPage = useMemo(() => {
    if (!page || items.length === 0) {
      return null;
    }

    const crntIdx = items.findIndex((i) => i.weight === page?.weight);
    return items[crntIdx + 1];
  }, [page, items]);

  if (!page) {
    return null;
  }

  const date = parseJSON(page.lastmod);
  // const feedbackUrl = `${Extension.issueLink}/new?title=Feedback:%20&body=%0A%0A%5BEnter%20feedback%20here%5D%0A%0A%0A---%0A%23%23%23%23%20Document%20Details%0A%0A%E2%9A%A0%20*Do%20not%20edit%20this%20section*%0A%0A*%20ID%3A%20${page.fileName}%0A*%20URL%3A%20${`${CONFIG.environment === "production" ? Extension.mainSite : Extension.betaSite}/docs/${page.fileName}`}%0A*%20Content%20Source%3A%20${encodeURIComponent(`/content/docs/${page.fileName}.md`)}`;

  return (
    <>
      <PageActions page={page} />

      {
        (prevPage || nextPage) && (
          <div className={`w-full flex justify-between gap-16 text-xl`}>
            {(prevPage && prevPage.slug && prevPage.title) && (
              <a href={`/docs/${(prevPage as PageFrontMatter).slug}`}
                title={prevPage.title}
                className={`border border-vulcan-100 hover:border-teal-900 rounded w-1/2 p-4 items-start flex flex-col gap-2 text-teal-500 hover:text-teal-900`}>
                <span className="text-base text-whisper-500">Previous</span>
                <span>&larr; {(prevPage as PageFrontMatter).title}</span>
              </a>
            )}
            {(nextPage && nextPage.slug && nextPage.title) && (
              <a href={`/docs/${(nextPage as PageFrontMatter).slug}`}
                title={nextPage.title}
                className={`border border-vulcan-100 hover:border-teal-900 rounded w-1/2 p-4 items-end ml-auto flex flex-col gap-2 text-teal-500 hover:text-teal-900`}>
                <span className="text-base text-whisper-500">Next</span>
                <span>{(nextPage as PageFrontMatter).title} &rarr;</span>
              </a>
            )}
          </div>
        )
      }

      <div className={`mt-16`}>
        <h2 className={`tracking-tight font-extrabold sm:leading-none text-3xl xl:text-4xl`}>Feedback/comments</h2>

        {/* <div className={`my-4 bg-vulcan-100 p-4`}>
          <p>Do you want to provide feedback about this page/content?</p>

          <a href={feedbackUrl} className={`py-4 px-2 mt-4 inline-flex items-center h-5 bg-vulcan-300 hover:bg-vulcan-400`}>
            <GitHub className={`w-5 h-5 mr-2 inline`} />
            <span>Provide feedback</span>
          </a> 
        </div> */}

        <div className={`my-4`}>
          <Giscus
            repo="FrontMatter/feedback"
            repoId="R_kgDOIo5HTQ"
            category="Comments"
            categoryId="DIC_kwDOIo5HTc4CTI9X"
            mapping="pathname"
            strict="0"
            reactionsEnabled="0"
            emitMetadata="0"
            inputPosition="top"
            theme={CONFIG.giscus.theme}
            lang="en"
            loading="lazy" />
        </div>

        {
          date && (
            <div className="text-base">
              <span>Last updated on</span>{` `}<span><time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, `MMM dd, yyyy`)}</time></span>
            </div>
          )
        }

        <div className="mt-2 text-sm">
          <p>Did you spot an issue in our documentation, or want to contribute? Edit this page on <a className={`text-teal-500 hover:text-teal-900`} href={`${Extension.githubDocs}/edit/${CONFIG.environment === "production" ? "main" : "dev"}/content/docs/${page.fileName}.md`} target="_blank" rel={`noopener noreferrer`}>Github</a>!</p>
        </div>
      </div>
    </>
  );
};