import React, { createContext, useContext } from 'react';
import { HandleFetch } from 'Util/HandleFetch';
import { useMutation } from '@tanstack/react-query';

const UserRegisterContext = createContext(null);

export const UserRegisterProvider = ({ children, i18n }) => {
  const { mutate: register } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/register', 'PUT', data.jsonData, null, i18n.language);
    },
    onSuccess: (data, variables) => {
      variables.setFormState((prev) => ({
        ...prev,
        modal: true,
      }));
    },
  });

  const value = [register];

  return <UserRegisterContext.Provider value={value}>{children}</UserRegisterContext.Provider>;
};

export const useUserRegisterData = () => useContext(UserRegisterContext);
