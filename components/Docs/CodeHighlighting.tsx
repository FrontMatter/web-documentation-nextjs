import * as React from 'react';
import * as shiki from '@antfu/shiki';

export interface ICodeHighlightingProps {
  className?: string;
}

export const CodeHighlighting: React.FunctionComponent<ICodeHighlightingProps> = ({className, children}: React.PropsWithChildren<ICodeHighlightingProps>) => {
  const [ code, setCode ] = React.useState('');

  React.useEffect(() => {
    if (className && children) {
      const language = className.split('-')[1];

      shiki.setCDN(`../../`);

      shiki.getHighlighter({
        langs: [language as any],
        theme: `the-unnamed`
      }).then((highlighter: shiki.Highlighter) => {
        setCode(highlighter.codeToHtml(children.toString(), getLanguage(className)));
      }).then(() => {
        if (location.hash) {
          location.href = location.href;
        }
      });
    }
  }, [className, children]);

  const getLanguage = (className: string) => {
    const language = className.split('-')[1];

    switch (language) {
      case 'ts':
        return 'typescript';
      case 'js':
        return 'javascript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      default:
        return language;
    }
  }
  
  if (!className && children) {
    return <code>{children}</code>;
  }

  if (!code) {
    return null;
  }

  return (
    <div dangerouslySetInnerHTML={{__html: code}} />
  );
};