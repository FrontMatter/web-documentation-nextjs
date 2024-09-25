import { PencilIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { Extension } from '../../constants/extension';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { CONFIG } from '../../constants';

export interface IPageActionsProps {
  page: PageFrontMatter | undefined;
}

export const PageActions: React.FunctionComponent<IPageActionsProps> = ({ page }: React.PropsWithChildren<IPageActionsProps>) => {
  if (!page) {
    return null;
  }

  return (
    <div className={`mt-16 mb-8`}>
      <a
        className={`flex items-center text-whisper-900 hover:text-whisper-500`}
        href={`${Extension.githubDocs}/edit/${CONFIG.environment === "production" ? "main" : "beta"}/content/docs/${page.fileName}.md`}
        target="_blank"
        rel={`noopener noreferrer`}>
        <PencilIcon className={`w-4 h-4 mr-2`} /> <span>Edit page</span>
      </a>
    </div>
  );
};