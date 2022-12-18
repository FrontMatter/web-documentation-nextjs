import { useRouter } from 'next/router';
import * as React from 'react';
import { navigation } from '../../constants/navigation';
import { Stargazers } from '../GitHub/Stargazers';
import { Searchbox } from '../Page/Searchbox';

export interface INavigationProps {}

export const Navigation: React.FunctionComponent<INavigationProps> = (props: React.PropsWithChildren<INavigationProps>) => {
  const router = useRouter();
  
  return (
    <>
    </>
  );
};