import { NovuProvider } from "@novu/react/hooks";

export const Providers = ( { children } : { children: React.ReactNode}) => {
    return (
      <NovuProvider
        subscriberId={import.meta.env.VITE_NOVU_APP_SUBSCRIBER_ID}
        applicationIdentifier={import.meta.env.VITE_NOVU_APP_IDENTIFIER}
        backendUrl={import.meta.env.VITE_NOVU_BACKEND_URL}
      >
        {children}
      </NovuProvider>
    );
  };
  