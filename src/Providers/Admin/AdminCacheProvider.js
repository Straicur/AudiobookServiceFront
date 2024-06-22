import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useUserAudiobooksListStore } from 'Store/store';

const AdminCacheDataContext = createContext(null);

export const AdminCacheProvider = ({ children, token, i18n }) => {
  const qc = useQueryClient();
  const audiobooksListStore = useUserAudiobooksListStore();

  const { mutate: clearCache } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/technical/cache/clear',
        'PATCH',
        { cacheData: data },
        token,
        i18n.language,
      );
    },
    onSettled: () => {
      audiobooksListStore.removeAudiobooks();
      qc.clear();
    },
  });

  const { data: dataAdminTechnicalCachePools = null, refetch } = useQuery({
    queryKey: ['dataAdminTechnicalCachePools'],
    queryFn: () => HandleFetch('/admin/technical/cache/pools', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataAdminTechnicalCachePools, clearCache, refetch];

  return <AdminCacheDataContext.Provider value={value}>{children}</AdminCacheDataContext.Provider>;
};

export const useAdminCacheContextData = () => useContext(AdminCacheDataContext);
