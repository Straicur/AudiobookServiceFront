import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useMutation } from '@tanstack/react-query';
import AdminReportsService from 'Service/Admin/AdminReportsService';

const AdminReportsContext = createContext(null);

export const AdminReportsProvider = ({ children, page, token, searchState, i18n }) => {
  const { mutate: acceptReport } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/admin/report/accept', 'PATCH', data.json, token, i18n.language);
    },
    onSettled: () => {
      refetch();
    },
  });

  const { mutate: rejectReport } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/report/reject',
        'PATCH',
        {
          reportId: data.reportId,
          answer: data.answer,
          rejectOthers: data.rejectOthers,
        },
        token,
        i18n.language,
      );
    },
    onSettled: () => {
      refetch();
    },
  });

  const { data: dataAdminReports = null, refetch } = useQuery({
    queryKey: ['dataAdminReports' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/report/list',
        'POST',
        {
          page: page,
          limit: 15,
          searchData: AdminReportsService.createSearchData(searchState),
        },
        token,
        i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataAdminReports, refetch, acceptReport, rejectReport];

  return <AdminReportsContext.Provider value={value}>{children}</AdminReportsContext.Provider>;
};

export const useAdminReportsData = () => useContext(AdminReportsContext);
