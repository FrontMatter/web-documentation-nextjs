import * as React from 'react';

export interface IDividerProps {
  className?: string;
}

export const Divider: React.FunctionComponent<IDividerProps> = ({ className }: React.PropsWithChildren<IDividerProps>) => {
  return (
    <div 
      className={`border-t border-gray-200 dark:border-gray-700 my-8 ${className || ""}`} />
  );
};