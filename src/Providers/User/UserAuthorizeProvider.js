import React, { createContext, useContext } from 'react';
import { HandleFetch } from 'Util/HandleFetch';
import { useMutation } from '@tanstack/react-query';
import { useTokenStore } from 'Store/store';
import { useNavigate } from 'react-router-dom';

const UserAuthorizeContext = createContext(null);

export const UserAuthorizeProvider = ({ children, token, i18n }) => {
  const tokenStore = useTokenStore();
  const navigate = useNavigate();

  const { mutate: login } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
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
      console.log(data);
      tokenStore.setToken(data);
      navigate('/login');
    },
    throwOnError: true,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => {
      return HandleFetch('/logout', 'PATCH', null, token, i18n.language);
    },
    onSettled: () => {
      tokenStore.removeToken();
      navigate('/login');
    },
    throwOnError: true,
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
    throwOnError: true,
  });

  const value = [logout, login, resetPassword, resetPasswordConfirm];

  return <UserAuthorizeContext.Provider value={value}>{children}</UserAuthorizeContext.Provider>;
};

export const useUserAuthorizeData = () => useContext(UserAuthorizeContext);
