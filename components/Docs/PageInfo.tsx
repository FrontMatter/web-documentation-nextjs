import { format, parseJSON } from 'date-fns';
import * as React from 'react';
import { Extension } from '../../constants/extension';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { GitHub } from '../Images/GitHub';

export interface IPageInfoProps {
  page: PageFrontMatter | undefined;
}

export const PageInfo: React.FunctionComponent<IPageInfoProps> = ({page}: React.PropsWithChildren<IPageInfoProps>) => {

  if (!page) {
    return null;
  }

  const date = parseJSON(page.lastmod);
  const feedbackUrl = `${Extension.issueLink}/new?title=Feedback:%20&body=%0A%0A%5BEnter%20feedback%20here%5D%0A%0A%0A---%0A%23%23%23%23%20Document%20Details%0A%0A%E2%9A%A0%20*Do%20not%20edit%20this%20section*%0A%0A*%20ID%3A%20${page.fileName}%0A*%20URL%3A%20${`${process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? Extension.mainSite : Extension.betaSite}/docs/${page.fileName}`}%0A*%20Content%20Source%3A%20${encodeURIComponent(`/content/docs/${page.fileName}.md`)}`;

  return (
    <div className={`mt-16`}>
      <h2 className={`tracking-tight font-extrabold sm:leading-none text-3xl xl:text-4xl`}>Feedback</h2>

      <div className={`my-4 bg-vulcan-100 p-4`}>
        <p>Do you want to provide feedback about this page/content?</p>

        <a href={feedbackUrl} className={`py-4 px-2 mt-4 inline-flex items-center h-5 bg-vulcan-300 hover:bg-vulcan-400`}>
          <GitHub className={`w-5 h-5 mr-2 inline`} />
          <span>Provide feedback</span>
        </a> 
      </div>

      {
        date && (
          <div className="text-base">
            <span>Last updated on</span>{` `}<span><time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, `MMM dd, yyyy`)}</time></span>
          </div>
        )
      }

      <div className="mt-2 text-sm">
        <p>Did you spot an issue in our documentation, or want to contribute? Edit this page on <a className={`text-teal-500 hover:text-teal-900`} href={`${Extension.githubDocs}/edit/${process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "main" : "dev"}/content/docs/${page.fileName}.md`} target="_blank" rel={`noopener noreferrer`}>Github</a>!</p>
      </div>
    </div>
  );
};