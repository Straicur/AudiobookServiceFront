import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useTokenStore } from 'Store/store';
import { useNavigate } from 'react-router-dom';

const UserSettingsContext = createContext(null);

export const UserSettingsProvider = ({ children, token, setState, i18n }) => {
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
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
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
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      variables.element.target.classList.remove('disabled');
      variables.setState((prev) => ({
        ...prev,
        checkPassword: !variables.state.checkPassword,
      }));
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
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
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      variables.element.target.classList.remove('disabled');
      variables.setState((prev) => ({
        ...prev,
        checkEmail: !variables.state.checkEmail,
      }));

      let json = {
        phoneNumber: dataUserSettings.phoneNumber,
        firstname: dataUserSettings.firstname,
        lastname: dataUserSettings.lastname,
        email: variables.state.newEmail,
        edited: dataUserSettings.edited,
        editableDate: dataUserSettings.editableDate,
      };

      const copy = Object.assign(json, data);
      qc.setQueryData(['dataUserSettings'], copy);
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
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
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];
      variables.element.target.classList.remove('disabled');
      variables.setState((prev) => ({
        ...prev,
        checkChanges: !variables.state.checkChanges,
        sure: !variables.state.sure,
      }));

      let json = {
        phoneNumber: variables.state.phoneNumber,
        firstname: variables.state.firstname,
        lastname: variables.state.lastname,
        email: variables.state.email,
        edited: variables.state.edited,
        editableDate: variables.state.editableDate,
      };

      const copy = Object.assign(json, data);
      qc.setQueryData(['dataUserSettings'], copy);
    },
    throwOnError: true,
  });

  const { data: dataUserSettings = null, isLoading } = useQuery({
    queryKey: ['dataUserSettings'],
    queryFn: () => HandleFetch('/user/settings', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const value = [
    dataUserSettings,
    setRefetch,
    isLoading,
    userEmailChange,
    userPasswordChange,
    userDelete,
    userDataChange,
  ];

  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>;
};

export const useUserSettingsData = () => useContext(UserSettingsContext);
