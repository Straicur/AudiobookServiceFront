import React, { createContext, useContext } from 'react';
import { HandleFetch } from 'Util/HandleFetch';
import { useMutation } from '@tanstack/react-query';
import { useTokenStore } from 'Store/store';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { exact } from 'prop-types';

const UserAuthorizeContext = createContext(null);

export const UserAuthorizeProvider = ({ children, token, i18n }) => {
  const tokenStore = useTokenStore();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { mutate: login } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/authorize',
        'POST',
        {
          email: data.email,
          password: data.password,
        },
        null,
        i18n.language,
      );
    },
    onSuccess: (data) => {
      tokenStore.setToken(data);
      navigate('/login');
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => {
      return HandleFetch('/logout', 'PATCH', null, token, i18n.language);
    },
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: [
          'dataUserSettings',
          'dataUserAudiooboks',
          'dataAudiobookUserSearch',
          'dataAudiobookUserRating',
          'dataAudiobookUserProposed',
          'dataAudiobookPart',
          'dataMyAudiobooksUserData',
          'dataAudiobookUserInfo',
          'dataAudiobookUserDetail',
          'dataAudiobookUserComments',
          'dataNotifications',
          'dataNewNotifications',
          'dataNewNotifications',
        ],
        exact: exact,
        refetchType: 'none',
      });
      tokenStore.removeToken();
      navigate('/login');
    },
  });

  const { mutate: resetPassword } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/user/reset/password', 'POST', data.jsonData, null, i18n.language);
    },
    onSuccess: (data, variables) => {
      variables.setState((prev) => ({
        ...prev,
        send: !variables.state.send,
      }));

      setTimeout(function () {
        variables.handleClose();
      }, 3000);
    },
  });

  const { mutate: resetPasswordConfirm } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/user/reset/password/confirm',
        'PATCH',
        data.jsonData,
        null,
        i18n.language,
      );
    },
    onSuccess: () => {
      navigate('/login');
    },
  });

  const value = [logout, login, resetPassword, resetPasswordConfirm];

  return <UserAuthorizeContext.Provider value={value}>{children}</UserAuthorizeContext.Provider>;
};

export const useUserAuthorizeData = () => useContext(UserAuthorizeContext);
