import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
// import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const AdminTechnicalBreaksDataContext = createContext(null);

export const AdminTechnicalBreaksProvider = ({ children, token, i18n, page }) => {
  //   const qc = useQueryClient();

  const { mutate: addTechnicalBreak } = useMutation({
    mutationFn: () => {
      return HandleFetch('/admin/technical/break', 'PUT', null, token, i18n.language);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: endTechnicalBreak } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/technical/break',
        'PATCH',
        { technicalBreakId: data.technicalBreakId },
        token,
        i18n.language,
      );
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { data: dataAdminTechnicalBreaks = null, refetch } = useQuery({
    queryKey: ['dataAdminTechnicalBreaks' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/technical/break/list',
        'GET',
        { page: page, limit: 15, searchData: [] },
        token,
        i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    gcTime: 1000,
  });

  const value = [dataAdminTechnicalBreaks, refetch, addTechnicalBreak, endTechnicalBreak];

  return (
    <AdminTechnicalBreaksDataContext.Provider value={value}>
      {children}
    </AdminTechnicalBreaksDataContext.Provider>
  );
};

export const useAdminTechnicalBreaksContextData = () => useContext(AdminTechnicalBreaksDataContext);
