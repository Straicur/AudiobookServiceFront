import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const AdminMainDataContext = createContext(null);

export const AdminMainDataPrivider = ({ children, token, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminStatistics']);
  };

  const { data: dataAdminStatistics = null } = useQuery({
    queryKey: ['dataAdminStatistics'],
    queryFn: () => HandleFetch('/admin/statistic/main', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataAdminStatistics, setRefetch];

  return <AdminMainDataContext.Provider value={value}>{children}</AdminMainDataContext.Provider>;
};

export const useAdminMainData = () => useContext(AdminMainDataContext);
