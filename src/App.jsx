import React from 'react';
import AppRouter from 'AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// const darkModeAtom = atomWithStorage('darkMode', false);
export const networkErrorAtom = atomWithStorage('error', null);

function App() {
  // const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [errorAtomState, setErrorAtomState] = useAtom(networkErrorAtom);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 3,
        cacheTime: 1000 * 60 * 3,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        setErrorAtomState(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        setErrorAtomState(error);
      },
    }),
  });

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <AppRouter errorAtomState={errorAtomState} />
    </PersistQueryClientProvider>
  );
}

export default App;
