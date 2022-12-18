import * as React from 'react';
import { navigation } from '../../constants/navigation';
import { TopLevelNavItem } from '../Links/TopLevelNavItem';

export interface IGlobalNavigationProps {
  className?: string;
  listClassName?: string;
}

export const GlobalNavigation: React.FunctionComponent<IGlobalNavigationProps> = ({ className, listClassName}: React.PropsWithChildren<IGlobalNavigationProps>) => {
  return (
    <nav className={className || ""}>
      <ul 
        className={listClassName || ""}
        role="list">
        {
          navigation.main.map((item) => (
            <TopLevelNavItem 
              key={item.name} 
              href={item.href} 
              title={item.title}>
              {item.name}
            </TopLevelNavItem>
          ))
        }
      </ul>
    </nav>
  );
};