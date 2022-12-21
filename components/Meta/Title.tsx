import * as React from 'react';
import Head from 'next/head';
import { Extension } from '../../constants/extension';

export interface ITitleProps {
  value: string;
}

export const Title: React.FunctionComponent<ITitleProps> = ({value}: React.PropsWithChildren<ITitleProps>) => {

  const message = React.useMemo(() => `${value} | ${Extension.name}`, [value]);

  return (
    <Head>
      <title>{message}</title>
      <meta name="title" content={message} />
      <meta property="og:title" content={message} />
      <meta property="twitter:title" content={message} />
    </Head>
  );
};