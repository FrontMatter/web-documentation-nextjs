import * as React from 'react';
import * as shiki from 'shiki';
import { Children, useMemo } from 'react';
import { CopyButton } from './CopyButton';

export interface ICodeHighlightingProps {
  className?: string;
}

export interface ICodeBlockProps {
  className?: string;
  annotation?: string;
}

export const CodeBlock: React.FunctionComponent<ICodeBlockProps> = ({ className, children, annotation, ...props }: React.PropsWithChildren<ICodeBlockProps>) => {
  return (
    <>
      {
        children && Children.map(children, (child, childIndex) => (
          <CodePanel annotation={annotation} {...props}>{child}</CodePanel>
        ))
      }
    </>
  )
}

const CodePanel = ({ annotation, children, ...props }: React.PropsWithChildren<ICodeBlockProps>) => {
  const child = Children.only(children) as any;
  
  const { title, description } = useMemo(() => {
    let data = { title: '', description: '' };

    try {
      if (annotation) {
        data = JSON.parse(annotation);
      }
    } catch (e) {
      // ignore
    }

    return {
      title: data.title,
      description: data.description
    };
  }, [annotation]);

  const code = useMemo(() => {
    if (child?.props?.children) {
      return child.props.children.toString();
    }
  }, [child])
  
  return (
    <div className='code__wrapper group'>
      {
        title && (
          <div className={`code__wrapper__title bg-vulcan-200 flex items-center justify-between px-4 py-2`}>
            <div className={`text-lg font-bold text-whisper-500`}>{title}</div>
            <div className={`text-sm text-whisper-50`}>{description}</div>
          </div>
        )
      }

      <div className='relative'>
        <pre>
          {children}
        </pre>
        
        {
          code && <CopyButton code={code} />
        }
      </div>
    </div>
  );
}

export const CodeHighlighting: React.FunctionComponent<ICodeHighlightingProps> = ({ className, children, ...props }: React.PropsWithChildren<ICodeHighlightingProps>) => {
  const [ code, setCode ] = React.useState('');

  React.useEffect(() => {
    if (className && children) {
      const language = className.split('-')[1];

      shiki.setCDN(`../../`);

      shiki.getHighlighter({
        langs: [language as any],
        theme: `the-unnamed`
      }).then((highlighter: shiki.Highlighter) => {
        let code = children.toString();

        if (code.endsWith(`\n`)) {
          code = code.slice(0, -1);
        }

        setCode(
          highlighter.codeToHtml(code, {
            lang: getLanguage(className)
          })
        );
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