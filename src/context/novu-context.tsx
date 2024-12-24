import React, { createContext, useContext, ReactNode } from 'react';
import { Novu } from '@novu/js';
import { novuConfig } from '../utils/novu-config';

// Create a context for the Novu instance
const NovuContext = createContext<Novu | undefined>(undefined);

// Create a provider component
export const NovuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const novu = new Novu({ ...novuConfig });

  return (
    <NovuContext.Provider value={novu}>
      {children}
    </NovuContext.Provider>
  );
};

// Create a custom hook to use the Novu context
export const useNovu = (): Novu => {
  const context = useContext(NovuContext);
  if (!context) {
    throw new Error('useNovu must be used within a NovuProvider');
  }
  return context;
};
