import React, { createContext, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const UserReportContext = createContext(null);

export const UserReportProvider = ({ children, token, i18n }) => {
  const { mutate: sendNotLoggedUserReport } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/report', 'PUT', data.json, null, i18n.language);
    },
    onSuccess: (data, variables) => {
      if (variables.setState !== undefined) {
        variables.setState((prev) => ({
          ...prev,
          openSuccessModal: true,
        }));
      }
    },
  });

  const { mutate: sendLoggedUserReport } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/user/report', 'PUT', data.json, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      if (variables.setState !== undefined) {
        variables.setState((prev) => ({
          ...prev,
          openSuccessModal: true,
        }));
      }
    },
  });

  const value = [sendLoggedUserReport, sendNotLoggedUserReport];

  return <UserReportContext.Provider value={value}>{children}</UserReportContext.Provider>;
};

export const useUserReport = () => useContext(UserReportContext);
