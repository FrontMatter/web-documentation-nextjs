import { LinkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import * as React from 'react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { CodeBlock, CodeHighlighting } from './CodeHighlighting';
import { mdxAnnotations } from 'mdx-annotations';
import { ShikiService } from '../../services/ShikiService';

export interface IMarkdownProps {
  content: string | undefined;
  slug: string | undefined;
}

export const Markdown: React.FunctionComponent<IMarkdownProps> = ({ content, slug }: React.PropsWithChildren<IMarkdownProps>) => {
  const [isReady, setIsReady] = React.useState<boolean>(false);

  const getTitle = (props: any) => {
    const title = props?.children.length > 0 ? `${props?.children[0] as string}` : "";
    return title;
  };

  const generateId = (props: any) => {
    const title = getTitle(props);
    return title.toLowerCase().replace(/\s/g, '-');
  };

  const generateLink = (props: any) => {
    return (
      <a href={`#${generateId(props)}`} aria-hidden="true" title={getTitle(props)} className={`hidden group-hover:inline-block`}>
        <LinkIcon className={`ml-4 h-6 inline-block`} />
      </a>
    );
  };

  useEffect(() => {
    if (content) {
      ShikiService.getHighlighter().then((highlighter) => {
        setIsReady(true);
      });
    }
  }, [content])

  useEffect(() => {
    const elms = document.querySelectorAll('blockquote > p > strong');
    for (let i = 0; i < elms.length; i++) {
      const elm = elms[i];
      if (elm.textContent?.toLowerCase() === "important") {
        elm.parentElement?.parentElement?.classList.add('important');
      }
    }
  }, []);


  if (!content || !isReady) {
    return null;
  }

  return (
    <div className={`markdown ${slug}`}>
      {/* eslint-disable react/no-children-prop */}
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => {
            const url = props?.href || "";
            const vscodeUrl = props && (props as any)["data-vscode"] ? (props as any)["data-vscode"] : "";
            const title = getTitle(props);
            if (vscodeUrl) {
              return <Link key={vscodeUrl as string} href={vscodeUrl as string} title={title}>{title}</Link>;
            }
            return <Link key={url as string} href={url as string} title={title}>{title}</Link>;
          },
          h1: ({ node, ...props }) => (<h1 id={generateId(props)} className={`header__offset scroll-mt-24 group`}>{getTitle(props)}{generateLink(props)}</h1>),
          h2: ({ node, ...props }) => (<h2 id={generateId(props)} className={`header__offset scroll-mt-24 group`}>{getTitle(props)}{generateLink(props)}</h2>),
          h3: ({ node, ...props }) => (<h3 id={generateId(props)} className={`header__offset scroll-mt-24 group`}>{getTitle(props)}{generateLink(props)}</h3>),
          h4: ({ node, ...props }) => (<h4 id={generateId(props)} className={`header__offset scroll-mt-24 group`}>{getTitle(props)}{generateLink(props)}</h4>),
          h5: ({ node, ...props }) => (<h5 id={generateId(props)} className={`header__offset scroll-mt-24 group`}>{getTitle(props)}{generateLink(props)}</h5>),
          table: ({ node, ...props }) => (<div className='table__wrapper'><table>{props.children}</table></div>),
          code: ({ ...props }) => <CodeHighlighting {...props} />,
          pre: ({ ...props }) => <CodeBlock {...props} />,
        }}
        rehypePlugins={[rehypeRaw, remarkGfm, mdxAnnotations.rehype]}
        remarkPlugins={[mdxAnnotations.remark]}
        children={content} />
    </div>
  );
};