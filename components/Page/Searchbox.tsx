import * as React from 'react';
// const docsearch = require('@docsearch/js');
// import { useEffect } from 'react';
import { DocSearch } from '@docsearch/react';
import { CONFIG } from '../../constants';

export interface ISearchboxProps { }

export const Searchbox: React.FunctionComponent<ISearchboxProps> = (props: React.PropsWithChildren<ISearchboxProps>) => {

  return (
    <>
      <DocSearch
        apiKey={CONFIG.agolia.apiKey || ""}
        indexName={CONFIG.agolia.index || ""}
        appId={CONFIG.agolia.appId || ""}
        disableUserPersonalization={true}
      />
    </>
  );
};