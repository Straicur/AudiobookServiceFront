import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const UserIpContext = createContext(null);

export const UserIpProvider = ({ children, token }) => {
  const fetchUsers = async () => {
    const res = await fetch('https://api.ipify.org?format=json');
    return res.json();
  };

  const { data: dataUserIp = null } = useQuery({
    queryKey: ['dataUserIp'],
    queryFn: () => fetchUsers(),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    enabled: token === undefined || token === null || token === '',
  });

  const value = [dataUserIp];

  return <UserIpContext.Provider value={value}>{children}</UserIpContext.Provider>;
};

export const useUserIp = () => useContext(UserIpContext);
