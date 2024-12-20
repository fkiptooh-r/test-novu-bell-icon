import React from 'react';

interface ShowProps {
  when: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const Show: React.FC<ShowProps> = ({ when, fallback, children }) => {
  if (when) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
};

