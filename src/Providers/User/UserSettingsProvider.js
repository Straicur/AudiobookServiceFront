import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useTokenStore } from 'Store/store';
import { useNavigate } from 'react-router-dom';

const UserSettingsContext = createContext(null);

export const UserSettingsProvider = ({ children, token, i18n }) => {
  const qc = useQueryClient();
  const tokenStore = useTokenStore();
  const navigate = useNavigate();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminAudiobooks']);
  };

  const { mutate: userDelete } = useMutation({
    mutationFn: () => {
      return HandleFetch('/user/settings/delete', 'PATCH', null, token, i18n.language);
    },
    onSuccess: () => {
      tokenStore.removeToken();
      navigate('/login');
    },
  });

  const { mutate: userDataChangeCode } = useMutation({
    mutationFn: () => {
      return HandleFetch('/user/settings/change/code', 'PUT', null, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      variables.setState((prev) => ({
        ...prev,
        codeReturned: data.code,
      }));
    },
  });

  const { mutate: userEmailChangeCode } = useMutation({
    mutationFn: () => {
      return HandleFetch('/user/settings/email/smsCode', 'PUT', null, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      variables.setState((prev) => ({
        ...prev,
        codeReturned: data.code,
      }));
    },
  });

  const { mutate: userPasswordChangeCode } = useMutation({
    mutationFn: () => {
      return HandleFetch('/user/settings/password/code', 'PUT', null, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      variables.setState((prev) => ({
        ...prev,
        codeReturned: data.code,
      }));
    },
  });

  const { mutate: userPasswordChange } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/user/settings/password',
        'PATCH',
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          code: data.code,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      variables.element.target.classList.remove('disabled');
      variables.setState((prev) => ({
        ...prev,
        checkPassword: !variables.state.checkPassword,
      }));
    },
  });

  const { mutate: userEmailChange } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/user/settings/email',
        'POST',
        {
          newEmail: data.state.newEmail,
          oldEmail: data.state.oldEmail,
          code: data.state.code,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      variables.element.target.classList.remove('disabled');
      variables.setState((prev) => ({
        ...prev,
        checkEmail: !variables.state.checkEmail,
      }));

      let json = {
        phoneNumber: dataUserSettings.phoneNumber,
        firstname: dataUserSettings.firstname,
        lastname: dataUserSettings.lastname,
        email: dataUserSettings.email,
        newEmail: variables.state.newEmail,
        edited: dataUserSettings.edited,
        editableDate: dataUserSettings.editableDate,
      };

      const copy = Object.assign(json, data);
      qc.setQueryData(['dataUserSettings'], copy);
    },
  });

  const { mutate: userDataChange } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/user/settings/change',
        'PATCH',
        {
          phoneNumber: data.state.phoneNumber,
          firstName: data.state.firstname,
          lastName: data.state.lastname,
          code: data.state.code,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      variables.element.target.classList.remove('disabled');
      variables.setState((prev) => ({
        ...prev,
        checkChanges: !variables.state.checkChanges,
        sure: !variables.state.sure,
      }));

      refetch();
    },
  });

  const { mutate: userParentControlChangeCode } = useMutation({
    mutationFn: () => {
      return HandleFetch('/user/parent/control', 'PUT', null, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      variables.setState((prev) => ({
        ...prev,
        codeReturned: data.code,
      }));
    },
  });

  const { mutate: userParentControlChange } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/user/parent/control', 'PATCH', data.json, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      variables.element.target.classList.remove('disabled');
      refetch();
    },
  });

  const {
    data: dataUserSettings = null,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['dataUserSettings'],
    queryFn: () => HandleFetch('/user/settings', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [
    dataUserSettings,
    setRefetch,
    isLoading,
    userEmailChange,
    userPasswordChange,
    userDelete,
    userDataChange,
    userDataChangeCode,
    userPasswordChangeCode,
    userEmailChangeCode,
    userParentControlChangeCode,
    userParentControlChange,
  ];

  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>;
};

export const useUserSettingsData = () => useContext(UserSettingsContext);
