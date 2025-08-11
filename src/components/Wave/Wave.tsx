import React from 'react';

interface containerClassProp {
  containerClass?: string;
  children: React.ReactNode;
}

export const Wave: React.FC<containerClassProp> = ({
  containerClass,
  children,
}) => {
  return <div className={containerClass}>{children}</div>;
};
