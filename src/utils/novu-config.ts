export const novuConfig = {
    applicationIdentifier: import.meta.env.VITE_NOVU_APP_IDENTIFIER ?? '',
    subscriberId: import.meta.env.VITE_NOVU_APP_SUBSCRIBER_ID ?? '',
    backendUrl: import.meta.env.VITE_NOVU_BACKEND_URL ?? 'http://localhost:3000',
    socketUrl: import.meta.env.VITE_NOVU_SOCKET_URL ?? 'http://localhost:3002',
    useCache: false,
  };
  