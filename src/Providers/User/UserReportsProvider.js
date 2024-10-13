import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const UserReportsContext = createContext(null);

export const UserReportsProvider = ({ children, token, page, limit, i18n }) => {
  const {
    data: dataUserReports = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['dataUserReports' + page],
    queryFn: () =>
      HandleFetch(
        '/user/reports',
        'POST',
        {
          page: page,
          limit: limit,
        },
        token,
        i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataUserReports, refetch, isLoading];

  return <UserReportsContext.Provider value={value}>{children}</UserReportsContext.Provider>;
};

export const useUserReportsData = () => useContext(UserReportsContext);
